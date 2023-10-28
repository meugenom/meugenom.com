'use strict'
import Service from '../services/services'
import Query from '../services/query'
import IArticle from '../interfaces/IArticle';

/**
 * Model for component Articles List
 * @returns list of posts
 */


class Model {

    token = '';
    host = Query.articlesList.host;
    query = Query.articlesList.query;
    variables = {};
    dataType = "json";

    articlesList: IArticle[];

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