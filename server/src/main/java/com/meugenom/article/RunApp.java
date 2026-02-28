package com.meugenom.article;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
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

        public synchronized void reloadArticles() {
                logger.info("Start loading articles from: {}", articlesPath);

                ReadFilenamesFromDirectory dirList = new ReadFilenamesFromDirectory();
                Set<String> fileList = dirList.listFilesUsingJavaIO(articlesPath);

                if (fileList.isEmpty()) {
                        logger.warn("No files in directory {}", articlesPath);
                        return;
                }

                // Build current list from Redis keyed by fileName for stable comparison
                List<Article> existingArticles = (List<Article>) articleRepository.findAll();

                long id = 0;
                for (String fileName : fileList) {
                        String filePath = articlesPath + "/" + fileName;
                        try {
                                String textFromFile = new ReadFile().read(filePath);
                                ParseToArticle parseToArticle = new ParseToArticle();
                                Article draft = parseToArticle.parse(textFromFile);
                                draft.setFileName(fileName);

                                String checksum = getFileChecksum(filePath);
                                draft.setChecksum(checksum);

                                // Find existing article by fileName (stable key, not counter)
                                Article existing = existingArticles.stream()
                                        .filter(a -> fileName.equals(a.getFileName()))
                                        .findFirst()
                                        .orElse(null);

                                if (existing == null) {
                                        // New article — assign next available id
                                        draft.setId(id);
                                        logger.info("New article: {} (id={})", fileName, id);
                                        articleRepository.save(draft);
                                } else if (!existing.getChecksum().equals(checksum)) {
                                        // Changed — keep same id, update
                                        draft.setId(existing.getId());
                                        logger.info("Updated article: {} (id={})", fileName, existing.getId());
                                        articleRepository.deleteById(existing.getId());
                                        articleRepository.save(draft);
                                } else {
                                        logger.debug("Unchanged: {}", fileName);
                                }

                                id++;
                        } catch (IOException | NoSuchAlgorithmException e) {
                                logger.error("Error processing {}: {}", fileName, e.getMessage());
                        }
                }

                logger.info("Total articles in Redis: {}", articleRepository.count());
        }

        @Override
        public void run(String... args) {
                reloadArticles();
        }

        // Auto-reload every hour (3600000 ms), starts after 1 hour delay
        @Scheduled(fixedDelay = 3600000, initialDelay = 3600000)
        public void scheduledReload() {
                logger.info("Scheduled reload triggered");
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
