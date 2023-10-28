'use strict'

import './utterance.css'

/**
 * View for component Home
 * @param posts
 * @returns html view for home page
 */

class ArticleView {


    async appendArticles () {
        
        const view = /* html */`                        
            <div>
                <div id="article" class="container mx-auto px-4 sm:px-8 mb-20" />                
            </div>
            <div id="utterance-comments"></div>            
        `
        return view
    }
}

export default ArticleView