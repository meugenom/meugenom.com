package com.meugenom.graphql.resolver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.meugenom.project.model.Project;
import com.meugenom.project.repository.ProjectRepository;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import com.meugenom.project.ProjectService;


import graphql.kickstart.tools.GraphQLQueryResolver;


/**
 * @author meugenom graphqlquery file implements graphqlqueryresolver and
 *         let's get queries from repositories
 */

@Component
public class ProjectsQuery implements GraphQLQueryResolver {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectService projectService;


    public List<Project> githubProjects() throws Exception {
		List<Project> list = new ArrayList<>(projectRepository.findAllByOrderByDateDesc());
		list.sort(Comparator.comparing(Project::getDate).reversed());
        if(list.isEmpty()){
            System.out.println("Redis Cache is empty");
            return projectService.getProjects();
        }
		return list;
    }
}