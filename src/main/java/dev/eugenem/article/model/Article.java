package dev.eugenem.article.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Article {

    //private int id;
    private @Id @GeneratedValue Long id;
    private String title;
    private String categories;
    private String tags;
    private String template;
    private String thumbnail;
    private String slug;
    private String date;
    private String fileName;
    private String body;

    public Article(){}

    public Article(String date, String title, String template, String thumbnail, String slug, String categories,
            String tags, String fileName, String body) {
        this.date = date;
        this.title = title;
        this.template = template;
        this.thumbnail = thumbnail;
        this.slug = slug;
        this.categories = categories;
        this.tags = tags;
        this.fileName = fileName;
        this.body = body;
    }    


    public String getTitle(){
        return this.title;
    }

    public String setTitle(String title){
        this.title = title;
        return title;
    }

    public String getCategories(){
        return this.categories;
    }

    public String setCategories(String categories){
        this.categories = categories;
        return categories;
    }

    public String getTags(){
        return this.tags;
    }

    public String setTags(String tags){
        this.tags = tags;
        return tags;
    }

    public String getTemplate(){
        return this.template;
    }

    public String setTemplate(String template){
        this.template = template;
        return template;
    }

    public String getThumbnail (){
        return this.thumbnail;
    }

    public String setThumbnail(String thumbnail){
        this.thumbnail = thumbnail;
        return thumbnail;
    }

    public String getSlug(){
        return this.slug;
    }

    public String setSlug(String slug){
        this.slug = slug;
        return slug;
    }

    public String getDate(){
        return this.date;
    }

    public String setDate(String date){
        this.date= date;
        return date;
    }

    public String getFileName(){
        return this.fileName;
    }

    public String setFileName(String fileName){
        this.fileName = fileName;
        return fileName;
    }

    public String getBody(){
        return this.body;
    }

    public String setBody(String body){
        this.body = body;
        return body;
    }
    

}   

