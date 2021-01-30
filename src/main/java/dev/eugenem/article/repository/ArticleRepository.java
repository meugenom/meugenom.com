package dev.eugenem.article.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import dev.eugenem.article.model.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    
}
