'use strict'

import TagsGartenModel from "../tags-garten/model";
import TagsGartenView from "../tags-garten/view";
/**
 * View for component Home
 * @param posts
 * @returns html view for home page
 */

class ArticleView {

    async appendArticles () {
        const tags = await new TagsGartenModel().getTags();        
        const view = /* html */`            
            
                <! -- Main Content (takes full width on small screens) -->
                    <div id="article" class="px-5"/></div>  

                    <!-- Comments -->
                    <div id="utterance-comments"></div>                    
        `

        return view
    }
}

export default ArticleView