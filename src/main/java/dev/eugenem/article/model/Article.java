package dev.eugenem.article.model;

import lombok.Data;

import javax.persistence.ElementCollection;
import javax.persistence.Embedded;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;



@Data
@Entity
public class Article {

    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String categories;
    private String tags;
    private String template;
    private String thumbnail;
    private String slug;
    private String date;
    private String fileName;

    
    @Column
    @ElementCollection(targetClass=Specification.class)  
    @Embedded  
    private Set<Specification> body = new HashSet<Specification>();
    

    public Article(){}

    public Article(String date, String title, String template, String thumbnail, String slug, String categories,
            String tags, String fileName, Set<Specification> body) {    
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

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }
    

    public String getTitle(){
        return title;
    }

    public void setTitle(String title){
        this.title = title;
    }

    public String getCategories(){
        return categories;
    }

    public void setCategories(String categories){
        this.categories = categories;        
    }

    public String getTags(){
        return tags;
    }

    public void setTags(String tags){
        this.tags = tags;        
    }

    public String getTemplate(){
        return template;
    }

    public void setTemplate(String template){
        this.template = template;        
    }

    public String getThumbnail (){
        return thumbnail;
    }

    public void setThumbnail(String thumbnail){
        this.thumbnail = thumbnail;        
    }

    public String getSlug(){
        return slug;
    }

    public void setSlug(String slug){
        this.slug = slug;
        
    }

    public String getDate(){
        return date;
    }

    public void setDate(String date){
        this.date= date;
    }

    public String getFileName(){
        return fileName;
    }

    public void setFileName(String fileName){
        this.fileName = fileName;
        
    }

    public Set<Specification> getBody(){
        return body;
    }

    public void setBody(Set<Specification> body){
        this.body = body;        
    }
    

}   

