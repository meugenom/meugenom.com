package de.eugenem.blog;

import java.util.List;

// import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author eugenem
 * @param <Article>
 * @param <ArticleRepository>
 */

@RestController
public class ArticleController {

	private final ArticleRepository repository;

	ArticleController(ArticleRepository repository) {
		this.repository = repository;
    }
    
    // Aggregate root
    /*
	@GetMapping(value = "/")
	public String index() {
		return "index";
    }
    */

	@GetMapping("/articles")
	List<Article> all() {
		return repository.findAll();
	}
    
    
	@PostMapping("/graphql")
	Article newArticle(@RequestBody Article newArticle) {
		return repository.save(newArticle);
    }
}
