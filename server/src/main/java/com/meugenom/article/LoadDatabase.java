package com.meugenom.article;

/**
 * @author meugenom
 * reading files from directory "/content/articles"
 * parsing and saving data from files in the articleRepository
 */

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import java.util.Set;
import org.springframework.stereotype.Component;
import com.meugenom.article.model.Article;
import com.meugenom.article.parser.ParseToArticle;
import com.meugenom.article.repository.ArticleRepository;
import com.meugenom.article.repository.SpecificationRepository;
import com.meugenom.readfile.ReadFile;
import com.meugenom.readfile.ReadFilenamesFromDirectory;

@Component
public class LoadDatabase implements CommandLineRunner {

  private static final Logger logger = LoggerFactory.getLogger(LoadDatabase.class);
  private String articlesPath = "../content/articles";

  @Autowired
  private ArticleRepository articleRepository;

  @Autowired
  private SpecificationRepository specificationRepository;

  @Override
  public void run(String... args) throws Exception {

    logger.info("Start loading articles from local files");

    // get files list from folder 'content/posts/'
    ReadFilenamesFromDirectory dirList = new ReadFilenamesFromDirectory();
    Set<String> fileList = dirList.listFilesUsingJavaIO(articlesPath);
    System.out.print(fileList);

    for (String fileName : fileList) {

      String filePath = articlesPath + "/" + fileName;

      ReadFile readFile = new ReadFile();
      String textFromFile = readFile.read(filePath);
      ParseToArticle parseToArticle = new ParseToArticle();
      Article draft = parseToArticle.parse(textFromFile);
      draft.setFileName(fileName);
      articleRepository.save(draft);

    }

    logger.info("All specifications for Article with id : 1");
    specificationRepository.findAll().forEach(spec ->{
      if(spec.getArticle().getId() == 1){
        logger.info("specification by id={} : {}",spec.getArticle().getId(), spec.getSpecification());
      }            
     });

    articleRepository.findAll().forEach(article -> {
      logger.info(" Id of Article : {}", article.getId());
    });

    logger.info("Number of specifications : {}", specificationRepository.count());
    logger.info("Number of articles is : {}", articleRepository.count());

  }
}
