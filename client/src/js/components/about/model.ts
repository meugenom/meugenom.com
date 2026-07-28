'use strict'
import Service from '../services/services';
import Query from '../services/query';

/**
 * Model for About component
 */
class Model {
  async getAboutArticle(): Promise<string> {
    try {
      const token = "";
      const host = Query.getAllSpecificationTextByArticleSlug.host;
      const query = Query.getAllSpecificationTextByArticleSlug.query;
      const variables = { slug: "about" };
      const dataType = "json";

      const response = await new Service().graphql(
        dataType,
        token,
        host,
        query,
        variables
      );

      return response?.getAllSpecificationTextByArticleSlug || "";
    } catch (error) {
      console.error('Error retrieving about article:', error);
      return "";
    }
  }
}

export default Model;