package dev.eugenem.graphql.resolver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import dev.eugenem.article.model.Article;
import dev.eugenem.article.model.Specification;
import dev.eugenem.article.repository.ArticleRepository;
import dev.eugenem.article.repository.SpecificationRepository;
import java.util.ArrayList;
import java.util.List;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;

/**
 * @author eugenemdev graphqlquery file implements graphqlqueryresolver and
 *         let's get queries from repositories
 */

@Component
public class ArticlesQuery implements GraphQLQueryResolver {

  @Autowired
  private ArticleRepository articleRepository;

  @Autowired
  private SpecificationRepository specificationRepository;

  /**
   * graphql request { articlesList { title } }
   * 
   * @return list of all articles in the "/content/articles"
   */

  public List<Article> articlesList() {
    return articleRepository.findAll();
  }

  // return 5 last articles 
  // TODO
  public List<Article> lastArticlesList() {
    return articleRepository.findAll();
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
    articles = articleRepository.findAll();
    Article result = articles.stream().filter(a -> {
      if (id == a.getId()) {
        return true;
      }
      return false;
    }).findAny().orElse(null);

    return result;

  }



  /**
   * graphql request: { getSpecificationByArticleId(id: 1) { specification } }
   * 
   * @param id of the Article
   * @return json
   * 
   *         { "data" : { "getSpecificationByArticleId" : { "specification" :
   *         "...some text" }, ... } }
   */

  public List<Specification> getSpecificationByArticleId(Long id) {

    List<Specification> specifications = new ArrayList<Specification>();
    specificationRepository.findAll().forEach(spec -> {
      if (spec.getArticle().getId() == id) {
        specifications.add(spec);
      }
    });
    return specifications;
  }

    /**
   * graphql request: { getAllSpecificationTextByArticleId(id: 1)
   *                    }
   * 
   * @param id of the Article
   * @return json
   * 
   *         { "data" : { "getAllSpecificationTextByArticleId" : { "text" 
   *                        }
   *                    } 
   *          }
   */
  public String getAllSpecificationTextByArticleId(Long id) {

    List<Specification> specifications = new ArrayList<Specification>();

    specifications = specificationRepository.findAll();

    List<String> bodies = new ArrayList<String>();

    specifications.forEach(spec -> {
      if (spec.getArticle().getId() == id) {
        bodies.add(spec.getSpecification());
      }
    });

    String text = String.join("\n", bodies);

    return text;

  }

  public String getAllSpecificationTextByArticleSlug(String slug) {

	
	System.out.println("Slug is: " + slug);

	List<Article> articles = new ArrayList<Article>();
    articles = articleRepository.findAll();
    
	
	Article result = articles.stream().filter(a -> {		
		
      if (new String(a.getSlug()).equals(slug) == true) {
        return true;
      }
	  return false;
    }).findAny().orElse(null);
	
	
    List<Specification> specifications = new ArrayList<Specification>();
    specifications = specificationRepository.findAll();
    List<String> bodies = new ArrayList<String>();

	
    specifications.forEach(spec -> {
      if (spec.getArticle().getId() == result.getId()) {
        bodies.add(spec.getSpecification());
      }
    });

    String text = String.join("\n", bodies);
    return text;


  }



}
