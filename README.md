# Full-Stack Content Platform & Web Framework

![Version](https://img.shields.io/badge/version-0.7.0-blue.svg?style=for-the-badge)
[![Website Status](https://img.shields.io/badge/My_Site-Live-brightgreen?style=for-the-badge&logo=google-chrome)](https://meugenom.com)
![TypeScript](https://img.shields.io/badge/typescript-%23007acc.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge&logo=opensourceinitiative&logoColor=white)

<p align="center">
  <img alt="Panda Logo" src="./assets/panda-meugenom.png"/>
</p>

A custom-built, lightweight, zero-framework-overhead **Headless CMS & Single-Page Application (SPA) Framework**
operating on its own custom architecture and self-developed libraries,
designed for personal blogs, technical portfolios, and digital gardens.

---

## Table of Contents

- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Configuration](#project-configuration)
- [Getting Started (Docker)](#getting-started-docker)
- [Useful Commands](#useful-commands)
- [Testing](#testing)
- [License](#license)

---

## How It Works

The platform operates as a Headless CMS with an ultra-fast GraphQL data pipeline:

1. **Content Management:** You write articles in standard `.md` (Markdown) with Front Matter metadata inside the `/content/articles/` directory.
2. **Backend Processing:** The Spring Boot backend parses your Markdown files, calculates file hashes, and caches content directly in Redis for instant retrieval.
3. **GraphQL API:** Content, tags, search queries, and GitHub repository projects are exposed via a clean GraphQL endpoint.
4. **Client-Side Rendering:** A lightweight Vanilla TypeScript SPA uses a custom MVC Router to load content dynamically and compile Markdown to HTML on-the-fly (`markdown-tailwind-css-compiler`), complete with syntax highlighting and KaTeX formulas.

---

## Tech Stack

### Frontend Client

- **Language:** TypeScript
- **Router:** Custom [SPA MVC Router](https://github.com/meugenom/spa-mvc-router)
- **Markdown Engine:** [Markdown TypeScript Compiler](https://github.com/meugenom/markdown-ts-compiler)
- **Styling:** Tailwind CSS v4 & KaTeX
- **Build Tool:** Webpack 5

### Backend Service

- **Language/Framework:** Java 21 LTS, Spring Boot
- **API Layer:** GraphQL
- **Cache:** Redis 7 (Alpine)

### Infrastructure & Operations

- **Containerization:** Docker & Docker Compose
- **Web Server / Proxy:** Nginx (Static assets & Reverse Proxy)

---

## Features

- ⚡ **No UI Framework Overhead:** Built using pure TypeScript without React/Vue bloat.
- 🚀 **Instant Navigation:** Single-Page Application architecture with zero full page reloads.
- 🎨 **Dark / Light Theme:** Native theme switcher with system preference detection.
- 🔍 **Full-Text Search:** Instant GraphQL article search functionality.
- 💬 **Giscus Integration:** GitHub Discussions-powered commenting system.
- 📊 **Auto-Synced Projects:** Automatically imports and displays your GitHub repos via GitHub GraphQL API.

---

## Project Configuration

To adapt the framework to your own platform, configure these key files:

### 1. Frontend Settings

Define your site title, social media profiles, and comment settings by `client/src/js/config.ts`:

```typescript
const Config = {
  siteName: "My Blog Platform",
  siteUrl: "http://localhost:8080",
  author: "Your Name",
  title: "My Content Platform",
  description: "Personal Web System and Blog",

  socialLinks: {
    github: "[https://github.com/your-username](https://github.com/your-username)",
    linkedin: "[https://www.linkedin.com/in/your-username](https://www.linkedin.com/in/your-username)",
    coffee: "[https://buymeacoffee.com/your-username](https://buymeacoffee.com/your-username)",
  },

  giscus: {
    repo: "your-username/comments-repo",
    repoId: "R_kgDOXXXXXX",
    category: "Announcements",
    categoryId: "DIC_kwDOXXXXXX",
  },

  localHost: "http://localhost:8080/graphql/",
};

export default Config;
```

### 2. Backend Environment Variables

Create or edit `server/.env` to link your GitHub account for project sync:

```env
GITHUB_API_URL=[https://api.github.com/graphql](https://api.github.com/graphql)
GITHUB_API_TOKEN=your_github_personal_access_token
GITHUB_API_NAME=your_github_username
```

### 3. Adding Content

Simply drop your `hello-world.md` file with Front Matter into the content directory `/content/articles/`:

```markdown
---
date: 2026-07-28
title: 'Hello World'
template: post
thumbnail: './thumbnails/face-splash.png'
slug: hello-world
tags: general intro
cluster: hello-world
order: 0
---

## Welcome to my new blog!

Hello World! 

```

---

## Getting Started (Docker)

### Prerequisites

- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

### Launching the Application

1. Prepare all settings to customize the blog [See](#project-configuration), the Project makes without personal settings by default.

2. Clone the repository:

```bash
   git clone [https://github.com/meugenom/meugenom.com.git](https://github.com/meugenom/meugenom.com.git)
   cd meugenom.com
```

3. Build and launch all services (Frontend, Backend, Redis, Nginx):

```bash
   docker-compose up -d --build
```

4. Open your browser at `http://localhost:8080`.

---

## Useful Commands

- **View container logs:**  
  `docker-compose logs -f`
- **View backend logs specifically:**  
  `docker-compose logs -f backend`
- **Stop all services:**  
  `docker-compose down`
- **Rebuild containers:**  
  `docker-compose up -d --build`

---

## Testing

Run frontend client unit tests:

```bash
  cd client
  yarn install
  yarn test
```

To generate a code coverage report:

```bash
  yarn test --coverage
```

---

## License && Author

- Author [meugenom](https://github.com/meugenom).
- Distributed under the [MIT License](LICENSE).
