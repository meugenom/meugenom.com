'use strict'

/**
 * View for component Article
 * @returns html view for article page
 */

class ArticleView {

    appendArticles () {
        return /* html */`
                <!-- Main Content -->
                <div id="article" class="px-5"></div>

                <!-- Comments -->
                <div id="giscus-comments" class="giscus"></div>
        `;
    }
}

export default ArticleView