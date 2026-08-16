---
date: 2026-07-28
title: 'About This Platform'
template: link
thumbnail: './thumbnails/face-splash.png'
slug: about
tags: about info guide
cluster: about
order: 0
---

## Welcome to Your New Blog!

Congratulations! You have launched your new blog platform. This engine automatically reads your Markdown files and converts them into fast, clean HTML pages.

This page is a quick guide to help you configure your site and start publishing content.

## 1. Project Configuration

To customize this platform, update two main configuration files:

### 1.1 Frontend Settings

Open `client/src/js/config.ts` and replace the default values with your information

```javascript
  // Basic site information
  siteName: "My Personal Blog",
  siteUrl: "http://localhost:8080",
  author: "Your Name",
  title: "My Blog Title",
  description: "A short description of your blog for search engines.",

  // Social media links
  socialLinks: {
    github: "[https://github.com/your-username](https://github.com/your-username)",
    linkedin: "[https://www.linkedin.com/in/your-username](https://www.linkedin.com/in/your-username)",
    coffee: "[https://buymeacoffee.com/your-username](https://buymeacoffee.com/your-username)",
  },

  // Giscus comment system settings (GitHub Discussions)
  giscus: {
    repo: "your-username/comments-repo",
    repoId: "R_kgDOXXXXXX",
    category: "Announcements",
    categoryId: "DIC_kwDOXXXXXX",
  }
```

### 1.2 Backend Settings

Create or open the `.env` file inside the `server/` directory. The backend uses this file to connect to GitHub and load your repositories onto the **Projects** page:

```env
    # GitHub GraphQL API Endpoint
    GITHUB_API_URL=[https://api.github.com/graphql](https://api.github.com/graphql)

    # Your Personal Access Token from GitHub
    # Create one here: [https://github.com/settings/tokens](https://github.com/settings/tokens)
    GITHUB_API_TOKEN=your_github_personal_access_token

    # Your GitHub Username
    GITHUB_API_NAME=your_github_username
```

## 2. Managing Articles

All articles are stored as `.md` files in this directory:

```text
    /content/articles/
```

Whenever you add or update a file, the backend automatically updates the Redis cache and makes your changes live immediately.

### 2.1 Useful Resources

- Test Markdown syntax in real time on the [Markdown TypeScript Compiler Demo](https://meugenom.github.io/markdown-ts-compiler/).
- Check out supported code highlighting and math formulas at [How to Write Text](http://localhost:8080/article/how-to-write-text).

## 3. How to Change This Page

To replace this guide with your own bio or project details, edit this file:

`/content/articles/about.md`

**Enjoy your new blog!**
