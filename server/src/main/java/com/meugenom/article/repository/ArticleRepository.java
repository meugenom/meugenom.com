package com.meugenom.article.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.meugenom.article.model.Article;

@Repository
public interface ArticleRepository extends CrudRepository<Article, Long> {}
