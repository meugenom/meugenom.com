package dev.eugenem.article;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.eugenem.article.model.Article;

@Repository
interface ArticleRepository extends JpaRepository<Article, Long> {
}
