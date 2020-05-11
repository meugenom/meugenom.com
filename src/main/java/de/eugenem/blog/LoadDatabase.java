package de.eugenem.blog;

import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
class LoadDatabase {
  
  @Bean
  CommandLineRunner initDatabase(ArticleRepository articleRepository) {
    return args -> {
      
      System.out.println("Preloading " + articleRepository.save(new Article(
        "New Article",  
        "text", 
        "text",  
        "post", 
        " ", 
        "newArticle", 
        "11.05.2020"
      )));
    };
  }
  
}