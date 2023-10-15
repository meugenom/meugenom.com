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
    host = Query.tagsList.host;
    query = Query.tagsList.query;
    variables = {};
    dataType = "json";

    tagsList: any;

    constructor () {
    }


  async getTagsList() {
    try {
      this.tagsList = await new Service().graphql(
      this.dataType,
      this.token,
      this.host,
      this.query,
      this.variables
      )
      return this.tagsList;
    } catch (error) {
      console.error('Error retrieving tags list:', error);
      throw error; 
    }
  }
}

export default Model