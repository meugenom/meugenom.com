package dev.eugenem.article;

import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Set;
import dev.eugenem.readfile.ReadFilenamesFromDirectory;
import dev.eugenem.readfile.ReadFile;


import dev.eugenem.article.model.Article;
import dev.eugenem.article.parser.ParseToArticle;

@Configuration
@Slf4j
class LoadDatabase {
  
  @Bean
  CommandLineRunner initDatabase(ArticleRepository articleRepository) {
    return args -> {      
      
      
		// read file from 'content/post/instruction-to-write-text.md'
		 
		String filePath = "content/posts/instruction-to-write-text.md";
		ReadFile readFile = new ReadFile();
    String textFromFile = readFile.read(filePath);
    //System.out.println(textFromFile);
    ParseToArticle parseToArticle = new ParseToArticle();
    Article article = parseToArticle.parse(textFromFile);
    article.setFileName("content/posts/instruction-to-write-text.md");
    System.out.println(article.getBody());
    
    
    // get files list from folder 'content/posts/'
		String dir;
		dir = "content/posts";
		ReadFilenamesFromDirectory dirList = new ReadFilenamesFromDirectory();
		Set<String> fileList = dirList.listFilesUsingJavaIO(dir);		
		System.out.print(fileList);
    
      
    /*
    System.out.println("Preloading " + articleRepository.save( article.getDate(),
      article.getTitle(),
      article.getTemplate(),
      article.getThumbnail(),
      article.getSlug(),
      article.getCategories(),
      article.getTags(),
      article.getFileName(),
      article.getBody()
    ));
    */
    };
  }

  
  
}