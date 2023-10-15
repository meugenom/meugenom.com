'use strict'
//import Service from '../services/services'

/**
 * Model for component Home
 * @returns list of posts
 */

class Model {

    articles: any;

  constructor () {
    this.articles = {}
  }

  async setArticles () {
    //this.articles = await new Service().getArticles()
    //return this.articles
    return;
  }
}

export default Model