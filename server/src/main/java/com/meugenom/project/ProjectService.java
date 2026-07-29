package com.meugenom.project;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.meugenom.project.model.Language;
import com.meugenom.project.model.Project;
import com.meugenom.project.model.Topic;
import com.meugenom.project.repository.ProjectRepository;
import java.io.InputStream;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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

  @Value("${projects.images.path}")
  private String projectsImagesPath;

  private static final ObjectMapper objectMapper = new ObjectMapper();

  //by refreshes via Hot Swap
  public void refreshCache() {
    System.out.println("LOG: Start planned refreshing data about projects");
    try {
      List<Project> freshProjects = fetchGitHubProjects();

      if (freshProjects != null && !freshProjects.isEmpty()) {
        deleteAllProjects();
        projectRepository.saveAll(freshProjects);
        System.out.println(
          "LOG: Cache reloaded. Wrote: " + freshProjects.size()
        );
      } else {
        System.out.println(
          "WARN: GitHub got empty list. Reloading is not provided."
        );
      }
    } catch (Exception e) {
      System.err.println(
        "CRITICAL: No Github's answer. Error: " + e.getMessage()
      );
    }
  }

  public List<Project> getProjects() {
    List<Project> cachedProjects = projectRepository.findAllByOrderByDateDesc();

    if (cachedProjects != null && !cachedProjects.isEmpty()) {
      System.out.println("LOG: GOT DATA FROM REDIS ");
      return cachedProjects;
    }

    System.out.println(
      "LOG: Redis Cache is Empty. Start fetchGitHubProjects()"
    );
    try {
      List<Project> freshProjects = fetchGitHubProjects();

      if (!freshProjects.isEmpty()) {
        projectRepository.saveAll(freshProjects);
        System.out.println("LOG: DATA saved in Redis");
      }

      return freshProjects;
    } catch (Exception e) {
      System.err.println(
        "Error during fallback GitHub fetch: " + e.getMessage()
      );
      return new ArrayList<>();
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
      String response = restTemplate.postForObject(
        githubApiUrl,
        request,
        String.class
      );
      return parseGitHubResponse(response);
    } catch (Exception e) {
      throw new Exception(
        "Failed to fetch GitHub projects: " + e.getMessage(),
        e
      );
    }
  }

  private String buildGraphQLQuery() throws Exception {
    String query =
      "{\n" +
      "  search(\n" +
      "    query: \"user:" +
      githubUserName +
      " topic:portfolio\",\n" +
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

    String jsonPayload =
      "{\"query\": " + objectMapper.writeValueAsString(query) + "}";
    return jsonPayload;
  }

  private List<Project> parseGitHubResponse(String response) throws Exception {
    List<Project> projects = new ArrayList<>();
    JsonNode root = objectMapper.readTree(response);

    if (root.has("errors")) {
      JsonNode errors = root.get("errors");
      throw new Exception("GitHub API error: " + errors.toString());
    }

    JsonNode edges = root.path("data").path("search").path("edges");

    if (edges.isArray()) {
      for (JsonNode edge : edges) {
        JsonNode node = edge.get("node");
        Project project = parseProjectNode(node);
        if (project != null) {
          projects.add(project);
        }
      }
    }
    return projects;
  }

  private Project parseProjectNode(JsonNode node) {
    try {
      Project project = new Project();

      project.setId(generateIdFromString(node.path("id").asText()));
      project.setName(node.path("name").asText());
      project.setDescription(node.path("description").asText());
      project.setHomepageUrl(node.path("homepageUrl").asText());
      project.setResourcePath(node.path("resourcePath").asText());

      // --- Downloading Project Image local ---
      String rawImageUrl = node.path("openGraphImageUrl").asText();
      String localImageUrl = downloadAndSaveImage(
        project.getName(),
        rawImageUrl
      );
      project.setOpenGraphImageUrl(localImageUrl);

      project.setHasIssuesEnabled(node.path("hasIssuesEnabled").asBoolean());

      project.setDate(parseZonedDateTime(node.path("updatedAt").asText()));
      project.setPushedAt(parseZonedDateTime(node.path("pushedAt").asText()));
      project.setCreatedAt(parseZonedDateTime(node.path("createdAt").asText()));

      project.setStargazers(node.path("stargazers").path("totalCount").asInt());
      project.setForks(node.path("forks").path("totalCount").asInt());

      JsonNode primaryLanguage = node.path("primaryLanguage");
      if (!primaryLanguage.isNull()) {
        project.setPrimaryLanguage(primaryLanguage.path("name").asText());
      }

      JsonNode languagesNode = node.path("languages").path("nodes");
      if (languagesNode.isArray()) {
        Language[] languages = new Language[languagesNode.size()];
        int index = 0;
        for (JsonNode langNode : languagesNode) {
          languages[index++] = new Language(langNode.path("name").asText());
        }
        project.setLanguages(languages);
      }

      JsonNode topicsEdges = node.path("repositoryTopics").path("edges");
      if (topicsEdges.isArray()) {
        Topic[] topics = new Topic[topicsEdges.size()];
        int index = 0;
        for (JsonNode edgeNode : topicsEdges) {
          String topicName = edgeNode
            .path("node")
            .path("topic")
            .path("name")
            .asText();
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

  /**
   * Downloading Images and saving into content/images/
   */

  private String downloadAndSaveImage(String repoName, String imageUrl) {
    if (imageUrl == null || imageUrl.isBlank()) {
      return imageUrl;
    }

    try {
      // 1. Create dir 
      Path targetDir = Paths.get(projectsImagesPath);        
      if (!Files.exists(targetDir)) {
        Files.createDirectories(targetDir);
      }

      // 2. Make file name
      String safeFileName =
        repoName.toLowerCase().replaceAll("[^a-z0-9_-]", "_") + ".png";
      Path targetPath = targetDir.resolve(safeFileName);

      // 3. Open connection
      java.net.URL url = java.net.URI.create(imageUrl).toURL();
      java.net.HttpURLConnection connection = (java.net.HttpURLConnection) url.openConnection();
      connection.setRequestProperty(
        "User-Agent",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
      );
      connection.setConnectTimeout(5000);
      connection.setReadTimeout(5000);

      int responseCode = connection.getResponseCode();
      if (responseCode != java.net.HttpURLConnection.HTTP_OK) {
        System.err.println(
          "WARN: GitHub CDN returned HTTP " + responseCode + " for " + repoName
        );
        return imageUrl;
      }

      // 4. Download file
      try (InputStream in = connection.getInputStream()) {
        Files.copy(in, targetPath, StandardCopyOption.REPLACE_EXISTING);
      }

      try {
        java.util.Set<java.nio.file.attribute.PosixFilePermission> perms = 
            java.nio.file.attribute.PosixFilePermissions.fromString("rwxrwxrwx"); // (read, write, execute)
        
        // right for file
        java.nio.file.Files.setPosixFilePermissions(targetPath, perms);
        
        // get right from parentDir and set to childDir
        java.nio.file.Files.setPosixFilePermissions(targetDir, perms);
      } catch (UnsupportedOperationException e) {
        // Ignore if Windows
      }

      System.out.println(
        "LOG: Successfully saved image for " + repoName + " -> " + targetPath
      );
      return "/images/projects/" + safeFileName;
    } catch (Exception e) {
      System.err.println(
        "CRITICAL ERROR downloading image for " +
        repoName +
        ": " +
        e.getClass().getName() +
        " - " +
        e.getMessage()
      );
      e.printStackTrace();
      return imageUrl;
    }
  }

  private LocalDate parseZonedDateTime(String dateString) {
    try {
      if (dateString == null || dateString.isEmpty()) {
        return null;
      }
      ZonedDateTime zdt = ZonedDateTime.parse(
        dateString,
        DateTimeFormatter.ISO_ZONED_DATE_TIME
      );
      return zdt.toLocalDate();
    } catch (Exception e) {
      System.err.println("Error parsing date: " + dateString);
      return null;
    }
  }

  private long generateIdFromString(String githubId) {
    if (githubId == null || githubId.isBlank()) {
      return 0L;
    }
    long mostSigBits = UUID
      .nameUUIDFromBytes(githubId.getBytes(StandardCharsets.UTF_8))
      .getMostSignificantBits();
    return mostSigBits & Long.MAX_VALUE;
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
