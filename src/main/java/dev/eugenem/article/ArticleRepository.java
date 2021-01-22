package dev.eugenem.article;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.eugenem.article.model.Article;

interface ArticleRepository extends JpaRepository<Article, Long> {

}
