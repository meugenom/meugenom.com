package com.meugenom.article.model;

import java.io.Serializable;
import java.time.LocalDate;

import org.springframework.data.redis.core.RedisHash;

@RedisHash("Article")
public class Article implements Serializable {

	private long id;

	private String title;

	private String categories;

	private String tags;

	private String template;

	private String thumbnail;

	private String slug;

	private LocalDate date;

	private String fileName;

	private String checksum;

	private String text;

	public Article() {

	}

	public Article(LocalDate date, String title, String template, String thumbnail, String slug, String categories,
			String tags, String fileName, String checksum, String text) {
		this.date = date;
		this.title = title;
		this.template = template;
		this.thumbnail = thumbnail;
		this.slug = slug;
		this.categories = categories;
		this.tags = tags;
		this.fileName = fileName;
		this.text = text;
		this.checksum = checksum;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
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

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;

	}

	public String getChecksum() {
		return checksum;
	}

	public void setChecksum(String checksum) {
		this.checksum = checksum;

	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;

	}

	@Override
	public String toString() {
		return " Article[id = " + id + ", title = " + title + ", date = " + date + ", template = " + template
				+ ", thumbnail = " + thumbnail + ", slug = " + slug + ", categories = " + categories + ", fileName = "
				+ fileName + " text = " + text + "]";
	}

}
