package de.eugenem.blog;

import lombok.Data;
import net.minidev.json.JSONObject;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
class Article {

  private @Id @GeneratedValue Long id;
  private String title;
  private String categories;
  private String tags;
  private String template;
  private String thumbnail;
  private String slug;
  private String date;
  private JSONObject article;

  Article() {}

  Article(String title, String categories, String tags, String template, String thumbnail, String slug, String date) {
    this.title = title;
    this.categories = categories;
    this.tags = tags;
    this.template = template;
    this.thumbnail = thumbnail;
    this.slug = slug;
    this.date = date; 

    JSONObject article = new JSONObject();
    article.put("title", this.title);
    article.put("categories", this.categories);
    article.put("tags", this.tags);
    article.put("template", this.template);
    article.put("thumbnail", this.thumbnail);
    article.put("slug", this.slug);
    article.put("date", this.date);
    this.article = article;
  }

  public JSONObject getArticle() {
    return this.article;
  }

}
