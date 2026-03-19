package com.meugenom.article.model;

import java.io.Serializable;
import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash("Article")
public class Article implements Serializable {

	@Id
	private long id;

	private String title;

	private String tags;

	private String template;

	private String thumbnail;

	private String slug;

	private String cluster;

	private String order;

	private LocalDate date;

	private String fileName;

	private String checksum;

	private String text;

	public Article() {

	}

	public Article(LocalDate date, String title, String template, String thumbnail, String slug, String cluster, String order,
			String tags, String fileName, String checksum, String text) {
		this.date = date;
		this.title = title;
		this.template = template;
		this.thumbnail = thumbnail;
		this.slug = slug;		
		this.tags = tags;
		this.cluster = cluster;
		this.order = order;
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

	public String getCluster() {
		return cluster;
	}

	public void setCluster(String cluster) {
		this.cluster = cluster;
	}

	public String getOrder() {
		return order;
	}

	public void setOrder(String order) {
		this.order = order;
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
				+ ", thumbnail = " + thumbnail + ", slug = " + slug + ", cluster = " + cluster + ", order = " + order + ", fileName = "
				+ fileName + " text = " + text + "]";
	}

}
