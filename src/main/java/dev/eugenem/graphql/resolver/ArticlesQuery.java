package dev.eugenem.graphql.resolver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import dev.eugenem.article.model.Article;
import dev.eugenem.article.ArticleRepository;


import java.util.List;
import java.util.Optional;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;

@Component
public class ArticlesQuery implements GraphQLQueryResolver {

  @Autowired
  private ArticleRepository articleRepository;

  public List<Article> lastArticlesList() {
    return  articleRepository.findAll();

  }

  public Optional<Article> getArticleById(Long id){
    return articleRepository.findById(id);
  }
  
  public String getName(String name){
    return "Hello "+ name;
  }
  
  
}
