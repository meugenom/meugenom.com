package com.meugenom.graphql.resolver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.meugenom.article.model.Article;
import com.meugenom.article.repository.ArticleRepository;
import java.util.ArrayList;
import java.util.List;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;

/**
 * @author meugenom graphqlquery file implements graphqlqueryresolver and
 *         let's get queries from repositories
 */

@Component
public class ArticlesQuery implements GraphQLQueryResolver {

	@Autowired
	private ArticleRepository articleRepository;

	/**
	 * graphql request { articlesList { title } }
	 * 
	 * @return list of all articles in the "/content/articles"
	 */

	public List<Article> articlesList() {
		return (List<Article>) articleRepository.findAll();
	}

	// return 5 last articles
	public List<Article> lastArticlesList() {
		return (List<Article>) articleRepository.findAll();
	}

	/**
	 * graphqlrequest:
	 * 
	 * { getArticleById(id: 1){ id title slug } }
	 * 
	 * @param id
	 * @return all fields of article by articles id
	 */
	public Article getArticleById(Long id) {
		List<Article> articles = new ArrayList<Article>();
		articles = (List<Article>) articleRepository.findAll();
		Article result = articles.stream().filter(a -> {
			if (id == a.getId()) {
				return true;
			}
			return false;
		}).findAny().orElse(null);

		return result;

	}

	public String getAllSpecificationTextByArticleSlug(String slug) {

	
		System.out.println("Slug is: " + slug);
	
		List<Article> articles = new ArrayList<Article>();
		articles = (List<Article>) articleRepository.findAll();
		
		
		Article result = articles.stream().filter(a -> {		
			
		  if (new String(a.getSlug()).equals(slug) == true) {
			return true;
		  }
		  return false;
		}).findAny().orElse(null);
	
		return result.getText();
	
	
	  }
	

}
