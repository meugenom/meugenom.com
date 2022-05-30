package com.meugenom.article;

/**
 * @author meugenom
 * reading files from directory "/content/articles"
 * parsing and saving data from files in the articleRepository
 */

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import org.springframework.beans.factory.annotation.Autowired;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Set;
import java.util.Timer;
import java.util.TimerTask;

import com.meugenom.article.model.Article;
import com.meugenom.article.parser.ParseToArticle;
import com.meugenom.article.repository.ArticleRepository;
import com.meugenom.readfile.ReadFile;
import com.meugenom.readfile.ReadFilenamesFromDirectory;

@Component
public class RunApp implements CommandLineRunner {

	private static final Logger logger = LoggerFactory.getLogger(RunApp.class);
	private String articlesPath = "../content/articles";

	@Autowired
	private ArticleRepository articleRepository;

	private long id = 0;
	private boolean isExist = false;
	private boolean isChanged = false;

	
			public void reloadArticles() {

			logger.info("Start loading articles from local files");

			// get files list from folder 'content/posts/'
			ReadFilenamesFromDirectory dirList = new ReadFilenamesFromDirectory();
			Set<String> fileList = dirList.listFilesUsingJavaIO(articlesPath);

			logger.info("Read files: {}", fileList);

			id = 0;

			for (String fileName : fileList) {

				String filePath = articlesPath + "/" + fileName;

				ReadFile readFile = new ReadFile();
				String textFromFile;
				
				try {

					isChanged = false;
					isExist = false;
					
					textFromFile = readFile.read(filePath);
					ParseToArticle parseToArticle = new ParseToArticle();

					Article draft = parseToArticle.parse(textFromFile);
					draft.setFileName(fileName);
					draft.setId(id);

					
					//Create checksum for this file
					File file = new File(filePath);
 
					//Use MD5 algorithm
					MessageDigest md5Digest = MessageDigest.getInstance("MD5");
 
					//Get the checksum
					String checksum = getFileChecksum(md5Digest, file);
 
					//see checksum
					logger.info("File checksum : {}",checksum);
					draft.setChecksum(checksum);

					articleRepository.findAll().forEach(article -> {
					
						if (article.getId() == id) {
							if(article.getChecksum() != checksum){
								isChanged = true;
								isExist = true;
							}else{
								isExist = true;
							}
						}
					});

					//https://www.baeldung.com/spring-data-redis-tutorial

					//doesn't exist
					if (!isExist) {
						logger.info("Add new article with ID = {}", id);
						articleRepository.save(draft);
					
					//exists and has new version
					} else if(isExist && isChanged){
						logger.info("Changed article with ID = {}", id);
						articleRepository.deleteById(id);
						articleRepository.save(draft);
					//exists and don't has version
					} else {
						logger.warn("Article with ID = {} exists, hasn't new version", id);
						//need change with new version
					}

					id++;

			
				} catch (IOException e) {
				
					// TODO Auto-generated catch block
					e.printStackTrace();
					
				} catch (NoSuchAlgorithmException n) {
				
				// TODO Auto-generated catch block
				
				n.printStackTrace();
			}
			
			}

			logger.info("Number of articles is : {}", articleRepository.count());

	}
	
	//start
	@Override
	public void run(String... args) throws Exception {

		//reloadArticles();

		//https://www.baeldung.com/java-timer-and-timertask
		TimerTask repeatedTask = new TimerTask() {
			@Override
			public void run() {
				
				reloadArticles();

				Date date = new Date(); // This object contains the current date value
				SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
				
				logger.info("Article's List Reloaded, time: {}",formatter.format(date));
			}};

		Timer timer = new Timer("Timer");
		
		long delay = 0L;
    	long period = 1000L * 60L * 20L; //* 24L; //every 20 min

		timer.schedule(repeatedTask, 0, 1800000); 

	}

	private static String getFileChecksum(MessageDigest digest, File file) throws IOException {
		//Get file input stream for reading the file content
		FileInputStream fis = new FileInputStream(file);
   
  		//Create byte array to read data in chunks
  		byte[] byteArray = new byte[1024];
  		int bytesCount = 0; 
    
  		//Read file data and update in message digest
  		while ((bytesCount = fis.read(byteArray)) != -1) {
    		digest.update(byteArray, 0, bytesCount);
  		};
   
  		//close the stream; We don't need it now.
  		fis.close();
   
  		//Get the hash's bytes
  		byte[] bytes = digest.digest();
   
  		//This bytes[] has bytes in decimal format;
  		//Convert it to hexadecimal format
  		StringBuilder sb = new StringBuilder();
  		for(int i=0; i< bytes.length ;i++){
    		sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
  		}
   
  		//return complete hash
   		return sb.toString();
}

}
