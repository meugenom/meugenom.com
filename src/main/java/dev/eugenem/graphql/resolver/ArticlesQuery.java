package dev.eugenem.graphql.resolver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import dev.eugenem.article.model.Article;
import dev.eugenem.article.ArticleRepository;

import java.util.List;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;


@Component
public class ArticlesQuery implements GraphQLQueryResolver {

  @Autowired
  private ArticleRepository articlesRepository;

  public List<Article> lastArticlesList() {    
    return articlesRepository.findAll();
  }
}
