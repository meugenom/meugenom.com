/**
 * This is the entry point of the application. 
 */

/* eslint-disable no-new */
'use strict'
import "../styles/main.css";

import Router from './router/router'
import IRoutes from './components/interfaces/IRoutes'

import Home from './components/home'
import ArticlesList from './components/articles-list'
import ProjectsList from './components/projects-list'
import Article from './components/article'
import TagArticlesList from './components/tag-artilces-list'
import TagsGarten from './components/tags-garten'
import About from './components/about'
import Illustration from './components/illustration'


// Define routes

let routes : IRoutes = {
  '/': new Home(),
  '/articles': new ArticlesList(),
  '/projects': new ProjectsList(),
  '/article/:id': new Article(),
  '/tag/:id': new TagArticlesList(),
  '/tags': new TagsGarten(),
  '/about': new About(),
  '/illustration': new Illustration(),
  }

// Listen on hash change:
window.addEventListener('popstate', function () {
  new Router(routes)  
})

// Listen on page load:
window.addEventListener('load', function () {  
  new Router(routes)
})
