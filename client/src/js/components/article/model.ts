'use strict'
import Service from '../services/services'
import Query from '../services/query'
import IArticle from '../interfaces/IArticle'


/**
 * Model for component Article
 * @returns list of writes
 */

class Model {

    private specifications: 
        { 
            spec: string
        };

    constructor () {
    }

    async getArticle(slug: string) {
        
        try {
            const token = "";
            const host = Query.getAllSpecificationTextByArticleSlug.host;
            const query = Query.getAllSpecificationTextByArticleSlug.query;
            const variables = { slug: slug };
            const dataType = "json";
    
            const response = await new Service().graphql(
                dataType,
                token,
                host,
                query,
                variables
            );
    
            this.specifications = await { spec: response.getAllSpecificationTextByArticleSlug };                        
            return this.specifications;
        } catch (error) {
            console.error('Error retrieving article specification:', error);
            throw error; 
        }
    }

}

export default Model