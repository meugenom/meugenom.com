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
    host = Query.lastArticlesList.host;
    query = Query.lastArticlesList.query;
    variables = {};
    dataType = "json";

    lastArticlesList: any;

    constructor () {
    }


  async getLastArticlesList() {
    try {
      this.lastArticlesList = await new Service().graphql(
      this.dataType,
      this.token,
      this.host,
      this.query,
      this.variables
      )
      return this.lastArticlesList;
    } catch (error) {
      console.error('Error retrieving articles list:', error);
      throw error; 
    }
  }
}

export default Model