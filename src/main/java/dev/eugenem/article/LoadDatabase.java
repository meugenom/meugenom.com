package dev.eugenem.article;

/**
 * @author eugenem
 * reading files from directory /content/posts
 * parsing and saving data from files in the articleRepository
 */

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

// import lombok.extern.slf4j.Slf4j;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;

import java.util.Set;
import org.springframework.stereotype.Component;

import dev.eugenem.readfile.ReadFilenamesFromDirectory;
import dev.eugenem.readfile.ReadFile;
import dev.eugenem.article.model.Article;
import dev.eugenem.article.parser.ParseToArticle;


@Component
public class LoadDatabase implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(LoadDatabase.class);
    private String articlesPath = "content/articles"; 

    @Autowired
    private ArticleRepository articleRepository;

    @Override
    public void run(String... args) throws Exception {

// variation to initiate starting init Database to load data from files      
/**       
@Configuration
@Slf4j
class LoadDatabase {
  
  @Bean
  CommandLineRunner initDatabase(ArticleRepository articleRepository) {
    return args -> {      
 */     
       
    logger.info("Start loading articles from local files");
    
    // get files list from folder 'content/posts/'  
		ReadFilenamesFromDirectory dirList = new ReadFilenamesFromDirectory();
		Set<String> fileList = dirList.listFilesUsingJavaIO(articlesPath);		
		System.out.print(fileList);
    
    // 
    for (String fileName : fileList) {
      
    String filePath = articlesPath + "/" + fileName;
    
    ReadFile readFile = new ReadFile();
    String textFromFile = readFile.read(filePath);
    ParseToArticle parseToArticle = new ParseToArticle();
    Article article = parseToArticle.parse(textFromFile);
    article.setFileName(fileName);
    // System.out.println(article.getAllBody());
    
    //save file to repository
    articleRepository.save( new Article(
      article.getDate(),
      article.getTitle(),
      article.getTemplate(),
      article.getThumbnail(),
      article.getSlug(),
      article.getCategories(),
      article.getTags(),
      article.getFileName(),
      article.getAllBody()
    ));
    }
  
    logger.info("Number of articles is : {}", articleRepository.count());
    
    /*
    logger.info("All unsorted articles:");
        List<Article> articles = articleRepository.findAll();
        logger.info("{}", articles);
    */    
    }

}

