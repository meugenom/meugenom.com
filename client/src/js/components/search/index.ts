'use strict'
import Model from './model'
import View from './view'
import Utils from '../services/utils'

/**
 * Controller for Search component
 * Reads the search term from URL (/:id), calls GraphQL searchArticles,
 * and renders the results.
 */
class Search {
    model: Model;
    view: View;

    constructor() {
        this.model = new Model();
        this.view = new View();
    }

    async render() {
        const request = new Utils().parseRequestURL();
        const rawTerm = request.id ? decodeURIComponent(request.id) : '';
        const term = rawTerm.trim();

        if (term.length < 3) {
            return /* html */`
            <div class="container mx-auto px-4 sm:px-8 font-sans text-base antialiased leading-7 z-0 ml-5">
                <article>
                    <div class="pt-6 pb-4 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
                        <p class="text-[11px] font-bold uppercase tracking-widest opacity-50">Search</p>
                    </div>
                    <p class="mt-4 opacity-60 text-sm">Enter at least 3 characters to search.</p>
                </article>
            </div>
            `;
        }

        const results = await this.model.searchArticles(term);
        return this.view.appendSearchResults(results, term);
    }

    async afterRender() {}
}

export default Search
