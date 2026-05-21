package com.meugenom.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.meugenom.project.model.Language;
import com.meugenom.project.model.Project;
import com.meugenom.project.model.Topic;
import com.meugenom.project.repository.ProjectRepository;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.ArrayList;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${github.api.url}")
    private String githubApiUrl;

    @Value("${github.api.token}")
    private String githubApiToken;

    @Value("${github.user.name}")
    private String githubUserName;

    private static final ObjectMapper objectMapper = new ObjectMapper();

    //by refreshes via Hot Swap
    public void refreshCache() {
    System.out.println("LOG: Start planned refreshing data about projects");
    try {
        // 1. Old Data
        List<Project> freshProjects = fetchGitHubProjects();
        
        if (freshProjects != null && !freshProjects.isEmpty()) {
            // 2. If Data is success so delete it from redis cache
            deleteAllProjects(); 
            projectRepository.saveAll(freshProjects);
            System.out.println("LOG: Cache reloaded. Wrote: " + freshProjects.size());
        } else {
            System.out.println("WARN: GitHub got empty list. Reloading is not provided.");
        }
    } catch (Exception e) {
        // If Github's Service has problems
        System.err.println("CRITICAL: No Github's answer. Error: " + e.getMessage());
    }
    }

    public List<Project> getProjects() {
        // Get data from Redis
        List<Project> cachedProjects = projectRepository.findAllByOrderByDateDesc();
        
        if (cachedProjects != null && !cachedProjects.isEmpty()) {
            System.out.println("LOG: GOT DATA FROM REDIS ");
            return cachedProjects;
        }

        // 2. IF Redis Cache is empty 
        System.out.println("LOG: Redis Cache is Empty. Start fetchGitHubProjects()");
        try {
            List<Project> freshProjects = fetchGitHubProjects();
            
            if (!freshProjects.isEmpty()) {
                // 3. Save Data in Redis Cache
                projectRepository.saveAll(freshProjects);
                System.out.println("LOG: DATA saved in Redis");
            }
            
            return freshProjects;
        } catch (Exception e) {
            System.err.println("Error during fallback GitHub fetch: " + e.getMessage());
            return new ArrayList<>(); // If an Error need return empty list
        }
    }
    
    
    public List<Project> fetchGitHubProjects() throws Exception {
        
        System.out.println("START CALL To GIHUB");

        String graphqlQuery = buildGraphQLQuery();
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + githubApiToken);
        
        HttpEntity<String> request = new HttpEntity<>(graphqlQuery, headers);
        
        try {
            String response = restTemplate.postForObject(githubApiUrl, request, String.class);        
            return parseGitHubResponse(response);
        } catch (Exception e) {
            throw new Exception("Failed to fetch GitHub projects: " + e.getMessage(), e);
        }
    }

    private String buildGraphQLQuery() throws Exception {
        String query = "{\n" +
            "  search(\n" +
            "    query: \"user:" + githubUserName + " topic:portfolio\",\n" +
            "    type: REPOSITORY,\n" +
            "    last: 20\n" +
            "  ) {\n" +
            "    edges {\n" +
            "      node {\n" +
            "        ... on Repository {\n" +
            "          id\n" +
            "          name\n" +
            "          description\n" +
            "          updatedAt\n" +
            "          pushedAt\n" +
            "          createdAt\n" +
            "          hasIssuesEnabled\n" +
            "          homepageUrl\n" +
            "          resourcePath\n" +
            "          openGraphImageUrl\n" +
            "          stargazers {\n" +
            "            totalCount\n" +
            "          }\n" +
            "          forks {\n" +
            "            totalCount\n" +
            "          }\n" +
            "          primaryLanguage {\n" +
            "            name\n" +
            "          }\n" +
            "          languages(first: 6) {\n" +
            "            nodes {\n" +
            "              name\n" +
            "            }\n" +
            "          }\n" +
            "          repositoryTopics(first: 7) {\n" +
            "            edges {\n" +
            "              node {\n" +
            "                topic {\n" +
            "                  name\n" +
            "                }\n" +
            "              }\n" +
            "            }\n" +
            "          }\n" +
            "        }\n" +
            "      }\n" +
            "    }\n" +
            "  }\n" +
            "}";

        String jsonPayload = "{\"query\": " + objectMapper.writeValueAsString(query) + "}";
        return jsonPayload;
    }

    private List<Project> parseGitHubResponse(String response) throws Exception {
        
        List<Project> projects = new ArrayList<>();
        
        JsonNode root = objectMapper.readTree(response);

        //System.out.println(root);
        
        // Check for errors
        if (root.has("errors")) {
            JsonNode errors = root.get("errors");
            throw new Exception("GitHub API error: " + errors.toString());
        }
        
        JsonNode edges = root
            .path("data")
            .path("search")
            .path("edges");
        
        if (edges.isArray()) {
            for (JsonNode edge : edges) {
                JsonNode node = edge.get("node");
                Project project = parseProjectNode(node);
                if (project != null) {
                    projects.add(project);
                }
            }
        }
        //System.out.println(projects);
        return projects;
    }

    private Project parseProjectNode(JsonNode node) {
        try {
            Project project = new Project();
            
            // Set basic fields
            project.setId(generateIdFromString(node.path("id").asText()));
            project.setName(node.path("name").asText());
            project.setDescription(node.path("description").asText());
            project.setHomepageUrl(node.path("homepageUrl").asText());
            project.setResourcePath(node.path("resourcePath").asText());
            project.setOpenGraphImageUrl(node.path("openGraphImageUrl").asText());
            project.setHasIssuesEnabled(node.path("hasIssuesEnabled").asBoolean());
            
            // Parse dates
            project.setDate(parseZonedDateTime(node.path("updatedAt").asText()));
            project.setPushedAt(parseZonedDateTime(node.path("pushedAt").asText()));
            project.setCreatedAt(parseZonedDateTime(node.path("createdAt").asText()));
            
            // Parse star count
            project.setStargazers(node.path("stargazers").path("totalCount").asInt());
            
            // Parse fork count
            project.setForks(node.path("forks").path("totalCount").asInt());
            
            // Parse primary language
            JsonNode primaryLanguage = node.path("primaryLanguage");
            if (!primaryLanguage.isNull()) {
                project.setPrimaryLanguage(primaryLanguage.path("name").asText());
            }
            
            // Parse languages array
            JsonNode languagesNode = node.path("languages").path("nodes");
            if (languagesNode.isArray()) {
                Language[] languages = new Language[languagesNode.size()];
                int index = 0;
                for (JsonNode langNode : languagesNode) {
                    languages[index++] = new Language(langNode.path("name").asText());
                }
                project.setLanguages(languages);
            }
            
            // Parse repository topics
            JsonNode topicsEdges = node.path("repositoryTopics").path("edges");
            if (topicsEdges.isArray()) {
                Topic[] topics = new Topic[topicsEdges.size()];
                int index = 0;
                for (JsonNode edgeNode : topicsEdges) {
                    String topicName = edgeNode.path("node").path("topic").path("name").asText();
                    topics[index++] = new Topic(topicName);
                }
                project.setRepositoryTopics(topics);
            }
            
            return project;
        } catch (Exception e) {
            System.err.println("Error parsing project node: " + e.getMessage());
            return null;
        }
    }

    private LocalDate parseZonedDateTime(String dateString) {
        try {
            if (dateString == null || dateString.isEmpty()) {
                return null;
            }
            ZonedDateTime zdt = ZonedDateTime.parse(dateString, DateTimeFormatter.ISO_ZONED_DATE_TIME);
            return zdt.toLocalDate();
        } catch (Exception e) {
            System.err.println("Error parsing date: " + dateString);
            return null;
        }
    }

    private long generateIdFromString(String githubId) {
        // GitHub ID in GraphQL format is a Base64-encoded string
        // Convert to a simple hash for our use
        return Math.abs(githubId.hashCode());
    }

    public void deleteAllProjects() {
        System.out.println("LOG: FLUSCH ALL DATA ABOUT PROJECTS");
        try {
            projectRepository.deleteAll();
            System.out.println("LOG: ALL DATA ABOUT PROJECTS DELETED");
        } catch (Exception e) {
            System.err.println("Error clearing projects cache: " + e.getMessage());
        }
    }
}