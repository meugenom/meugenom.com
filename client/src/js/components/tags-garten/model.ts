'use strict'
import Service from '../services/services'
import Query from '../services/query'
import ITags from '../interfaces/ITags';

/**
 * Model for component Home
 * @returns list of posts
 */

class Model {

    token = '';
    host = Query.tagsList.host;
    query = Query.tagsList.query;
    variables = {};
    dataType = "json";

    tags: ITags[];

    constructor () {
    }


  async getTags() {
    try {
      this.tags = await new Service().graphql(
      this.dataType,
      this.token,
      this.host,
      this.query,
      this.variables
      )
      return this.tags;
    } catch (error) {
      console.error('Error retrieving tags list:', error);
      throw error; 
    }
  }
}

export default Model