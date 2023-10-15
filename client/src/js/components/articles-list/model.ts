'use strict'
import Service from '../services/services'
import Query from '../services/query'
import Config from '../../config'

/**
 * Model for component Home
 * @returns list of posts
 */

interface IArticle {
  slug: string;
  title: string;
  date: string;
  tags: string;
  id: string;
}

class Model {

    token = '';
    host = Query.articlesList.host;
    query = Query.articlesList.query;
    variables = {};
    dataType = "json";

    articlesList: any;

    constructor () {
    }


  async getArticlesList() {
    try {
      this.articlesList = await new Service().graphql(
      this.dataType,
      this.token,
      this.host,
      this.query,
      this.variables
      )
      return this.articlesList;
    } catch (error) {
      console.error('Error retrieving articles list:', error);
      throw error; 
    }
  }
}

export default Model