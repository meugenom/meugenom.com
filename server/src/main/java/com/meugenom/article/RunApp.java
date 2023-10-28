package com.meugenom.article;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.beans.factory.annotation.Value;


import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Set;

import com.meugenom.article.model.Article;
import com.meugenom.article.parser.ParseToArticle;
import com.meugenom.article.repository.ArticleRepository;
import com.meugenom.readfile.ReadFile;
import com.meugenom.readfile.ReadFilenamesFromDirectory;

@Component
public class RunApp implements CommandLineRunner {

	private static final Logger logger = LoggerFactory.getLogger(RunApp.class);
	
	@Value("${articles.path}")
    private String articlesPath;
	

	@Autowired
	private ArticleRepository articleRepository;

	private long id = 0;
	private boolean isExist = false;
	private boolean isChanged = false;

	public void reloadArticles() {
		logger.info("Start loading articles from local files");

		ReadFilenamesFromDirectory dirList = new ReadFilenamesFromDirectory();
		Set<String> fileList = dirList.listFilesUsingJavaIO(articlesPath);

		logger.info("File list: {}", fileList);

		logger.info("Read files: {}", fileList);

		id = 0;

		if (fileList.isEmpty()) {
			logger.warn("No files in directory {}", articlesPath);
		} else {
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
					
					String checksum = getFileChecksum(filePath);
					logger.info("File checksum : {}", checksum);
					draft.setChecksum(checksum);

					articleRepository.findAll().forEach(article -> {
						if (article.getId() == id) {
							if (!article.getChecksum().equals(checksum)) {
								isChanged = true;
								isExist = true;
							} else {
								isExist = true;
							}
						}
					});

					if (!isExist) {
						logger.info("Add new article with ID = {}", id);
						articleRepository.save(draft);
					} else if (isExist && isChanged) {
						logger.info("Changed article with ID = {}", id);
						articleRepository.deleteById(id);
						articleRepository.save(draft);
					} else {
						logger.warn("Article with ID = {} exists, hasn't new version", id);
					}

					id++;
				} catch (IOException | NoSuchAlgorithmException e) {
					logger.error("An error occurred: {}", e.getMessage());
				}
			}
		}

		logger.info("Number of articles is : {}", articleRepository.count());
	}

	@Override
	public void run(String... args) throws Exception {
		reloadArticles();
	}

	private static String getFileChecksum(String filePath) throws IOException, NoSuchAlgorithmException {
		File file = new File(filePath);
		MessageDigest digest = MessageDigest.getInstance("MD5");
		FileInputStream fis = new FileInputStream(file);
		byte[] byteArray = new byte[1024];
		int bytesCount;
		while ((bytesCount = fis.read(byteArray)) != -1) {
			digest.update(byteArray, 0, bytesCount);
		}
		fis.close();
		byte[] bytes = digest.digest();
		StringBuilder sb = new StringBuilder();
		for (byte aByte : bytes) {
			sb.append(Integer.toString((aByte & 0xff) + 0x100, 16).substring(1));
		}
		return sb.toString();
	}
}
