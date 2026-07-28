package com.meugenom.search;

import com.meugenom.article.model.Article;
import com.meugenom.article.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.regex.Pattern;

/**
 * SearchService — module for searching articles stored in Redis.
 * Performs fast case-insensitive search across title, tags, and body text.
 */
@Service
public class SearchService {

    private static final int MAX_RESULTS = 50;

    @Autowired
    private ArticleRepository articleRepository;

    /**
     * @param term Search query term (minimum 3 characters)
     * @return List of matching articles sorted by date descending
     */
    public List<Article> searchArticles(String term) {
        if (term == null || term.trim().length() < 3) {
            return new ArrayList<>();
        }

        String cleanTerm = term.trim();
        // Compile literal pattern with CASE_INSENSITIVE flag (avoids creating new String objects via toLowerCase)
        Pattern searchPattern = Pattern.compile(Pattern.quote(cleanTerm), Pattern.CASE_INSENSITIVE);

        List<Article> allArticles = (List<Article>) articleRepository.findAll();
        List<Article> results = new ArrayList<>();

        for (Article article : allArticles) {
            if (matches(article, searchPattern)) {
                results.add(article);
            }
        }

        // Safe sort by date descending (handles null dates gracefully)
        results.sort(Comparator.comparing(
            Article::getDate, 
            Comparator.nullsLast(Comparator.reverseOrder())
        ));

        // Limit results payload to prevent OOM / network bottlenecks
        if (results.size() > MAX_RESULTS) {
            return results.subList(0, MAX_RESULTS);
        }

        return results;
    }

    private boolean matches(Article article, Pattern pattern) {
        if (article == null) {
            return false;
        }

        // Short-circuit evaluation: stops early if match is found in title or tags
        if (article.getTitle() != null && pattern.matcher(article.getTitle()).find()) {
            return true;
        }
        if (article.getTags() != null && pattern.matcher(article.getTags()).find()) {
            return true;
        }
        if (article.getText() != null && pattern.matcher(article.getText()).find()) {
            return true;
        }

        return false;
    }
}