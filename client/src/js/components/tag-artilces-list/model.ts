'use strict'
import Service from '../services/services'
import Query from '../services/query'


/**
 * Model for component Tag Articles List
 * @returns list of tags
 */


class Model {

    specifications: {
        spec: string
    };

    constructor () {
    }

    async getArticlesList(tag: string) {
        
        try {
            const token = "";
            const host = Query.articlesListByTag.host;
            const query = Query.articlesListByTag.query;
            const variables = { tag: tag };
            const dataType = "json";
    
            const response = await new Service().graphql(
                dataType,
                token,
                host,
                query,
                variables
            );
    
            this.specifications = await { spec: response.articlesListByTag };

            return this.specifications;
        } catch (error) {
            console.error('Error retrieving article specification:', error);
            throw error; 
        }
    }

}

export default Model