package com.meugenom.search;

import com.meugenom.article.model.Article;
import com.meugenom.article.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * SearchService — отдельный модуль для полнотекстового поиска по статьям в Redis.
 * Ищет по полям: title, tags, text (полный контент).
 */
@Service
public class SearchService {

    @Autowired
    private ArticleRepository articleRepository;

    /**
     * Ищет статьи по ключевому слову.
     * Поиск case-insensitive по полям: title, tags, text.
     *
     * @param term — строка поиска (не пустая, минимум 3 символа — валидация на фронте)
     * @return список совпадающих статей, отсортированных по дате DESC
     */
    public List<Article> searchArticles(String term) {

        if (term == null || term.trim().length() < 3) {
            return new ArrayList<>();
        }

        final String lowerTerm = term.toLowerCase().trim();

        List<Article> all = (List<Article>) articleRepository.findAll();
        List<Article> results = new ArrayList<>();

        for (Article article : all) {
            boolean matchesTitle = article.getTitle() != null
                    && article.getTitle().toLowerCase().contains(lowerTerm);
            boolean matchesTags = article.getTags() != null
                    && article.getTags().toLowerCase().contains(lowerTerm);
            boolean matchesText = article.getText() != null
                    && article.getText().toLowerCase().contains(lowerTerm);

            if (matchesTitle || matchesTags || matchesText) {
                results.add(article);
            }
        }

        results.sort((a1, a2) -> a2.getDate().compareTo(a1.getDate()));
        return results;
    }
}
