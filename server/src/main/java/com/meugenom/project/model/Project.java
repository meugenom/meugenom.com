package com.meugenom.project.model;

import java.io.Serializable;
import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

/*
type Project {
  name: String,
  description: String,
  date: String,
  pushedAt: String,
  createdAt: String,
  hasIssuesEnabled: Bool,
  homepageUrl: String,
  resourcePath: String,
  openGraphImageUrl: String,
  stargazers: Int,
  forks: Int,
  primaryLanguage: String,
  languages: [Language],
  repositoryTopics: [Topic]
}
*/



@RedisHash("Project")
public class Project implements Serializable {

	@Id
	private long id;

	private String name;
	private String description;
	private LocalDate date;
	private LocalDate pushedAt;
	private LocalDate createdAt;
	private Boolean hasIssuesEnabled;
	private String homepageUrl;
	private String resourcePath;
	private String openGraphImageUrl;
	private Integer stargazers;
	private Integer forks;
	private String primaryLanguage;
	private Language[] languages;
	private Topic[] repositoryTopics;

	public Project() {
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public LocalDate getPushedAt() {
		return pushedAt;
	}

	public void setPushedAt(LocalDate pushedAt) {
		this.pushedAt = pushedAt;
	}

	public LocalDate getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDate createdAt) {
		this.createdAt = createdAt;
	}

	public Boolean getHasIssuesEnabled() {
		return hasIssuesEnabled;
	}

	public void setHasIssuesEnabled(Boolean hasIssuesEnabled) {
		this.hasIssuesEnabled = hasIssuesEnabled;
	}

	public String getHomepageUrl() {
		return homepageUrl;
	}

	public void setHomepageUrl(String homepageUrl) {
		this.homepageUrl = homepageUrl;
	}

	public String getResourcePath() {
		return resourcePath;
	}

	public void setResourcePath(String resourcePath) {
		this.resourcePath = resourcePath;
	}

	public String getOpenGraphImageUrl() {
		return openGraphImageUrl;
	}

	public void setOpenGraphImageUrl(String openGraphImageUrl) {
		this.openGraphImageUrl = openGraphImageUrl;
	}

	public Integer getStargazers() {
		return stargazers;
	}

	public void setStargazers(Integer stargazers) {
		this.stargazers = stargazers;
	}

	public Integer getForks() {
		return forks;
	}

	public void setForks(Integer forks) {
		this.forks = forks;
	}

	public String getPrimaryLanguage() {
		return primaryLanguage;
	}

	public void setPrimaryLanguage(String primaryLanguage) {
		this.primaryLanguage = primaryLanguage;
	}

	public Language[] getLanguages() {
		return languages;
	}

	public void setLanguages(Language[] languages) {
		this.languages = languages;
	}

	public Topic[] getRepositoryTopics() {
		return repositoryTopics;
	}

	public void setRepositoryTopics(Topic[] repositoryTopics) {
		this.repositoryTopics = repositoryTopics;
	}

	@Override
	public String toString() {
		return "Project[id=" + id + ", name=" + name + ", description=" + description
			+ ", date=" + date + ", pushedAt=" + pushedAt + ", createdAt=" + createdAt
			+ ", hasIssuesEnabled=" + hasIssuesEnabled + ", homepageUrl=" + homepageUrl
			+ ", resourcePath=" + resourcePath + ", openGraphImageUrl=" + openGraphImageUrl
			+ ", stargazers=" + stargazers + ", forks=" + forks + ", primaryLanguage=" + primaryLanguage + "]";
	}
}

