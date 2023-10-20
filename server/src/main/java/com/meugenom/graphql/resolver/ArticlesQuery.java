package com.meugenom.graphql.resolver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.meugenom.article.model.Article;
import com.meugenom.tag.model.Tag;
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
	
	// return list of articles by tag
	public List<Article> articlesListByTag(String tag) {
		//get all articles
		List<Article> list = (List<Article>) articleRepository.findAll();

		//find articles where tag is in tags
		List<Article> result = new ArrayList<Article>();
		for (Article article : list) {
			if (article.getTags().contains(tag)) {
				result.add(article);			
			}
		}
		return result;
		
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

	// return all tags
	public List<Tag> tagsList() {
		List<Article> articles = new ArrayList<Article>();
		articles = (List<Article>) articleRepository.findAll();
		
		List<Tag> result = new ArrayList<Tag>();

		for (Article article : articles) {
			
			String[] tags = article.getTags().split(" ");
			
			for (String tag : tags) {				
				if(tag != null && tag != ""){
					Tag section = new Tag(tag, article.getSlug());				
					System.out.println("Tag is: " + tag);
					result.add(section);				
				}				
			}
		}
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
