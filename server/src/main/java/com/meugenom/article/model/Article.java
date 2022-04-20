package com.meugenom.article.model;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "article")
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "categories")
    private String categories;

    @Column(name = "tags")
    private String tags;

    @Column(name = "template")
    private String template;

    @Column(name = "thumbnail")
    private String thumbnail;

    @Column(name = "slug")
    private String slug;

    @Column(name = "date")
    private String date;

    @Column(name = "fileName")
    private String fileName;

    @OneToMany(mappedBy = "article", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<Specification> specifications;

    public Article() {
    }

    public Article(String date, String title, String template, String thumbnail, String slug, String categories,
                   String tags, String fileName, List<Specification> specifications) {
        this.date = date;
        this.title = title;
        this.template = template;
        this.thumbnail = thumbnail;
        this.slug = slug;
        this.categories = categories;
        this.tags = tags;
        this.fileName = fileName;
        this.specifications = specifications;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategories() {
        return categories;
    }

    public void setCategories(String categories) {
        this.categories = categories;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public String getTemplate() {
        return template;
    }

    public void setTemplate(String template) {
        this.template = template;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;

    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;

    }

    public List<Specification> getSpecifications() {
        return specifications;
    }

    public void setSpecifications(List<Specification> specifications) {
        this.specifications = specifications;
    }

    @Override
    public String toString() {
        return " Article[id = " + id + ", title = " + title + ", date = " + date + ", template = " + template
                + ", thumbnail = " + thumbnail + ", slug = " + slug + ", categories = " + categories + ", fileName = "
                + fileName + " specification = " + specifications + "]";
    }

}
