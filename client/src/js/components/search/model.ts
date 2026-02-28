'use strict'
import Service from '../services/services'
import Query from '../services/query'

/**
 * Model for component Search
 * @returns search results from GraphQL searchArticles query
 */
class Model {

    results: { spec: string };

    constructor() {}

    async searchArticles(term: string) {
        try {
            const token = "";
            const host = Query.searchArticles.host;
            const query = Query.searchArticles.query;
            const variables = { term: term };
            const dataType = "json";

            const response = await new Service().graphql(
                dataType,
                token,
                host,
                query,
                variables
            );

            this.results = { spec: response.searchArticles };
            return this.results;
        } catch (error) {
            console.error('Error during search:', error);
            throw error;
        }
    }
}

export default Model
