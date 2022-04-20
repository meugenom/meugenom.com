package com.meugenom.article.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.meugenom.article.model.Specification;

@Repository
public interface SpecificationRepository extends JpaRepository<Specification, Long>{

    List<Specification> findByArticleId(Long articleId);

    Optional<Specification> findByIdAndArticleId(Long id, Long articleId);

} 