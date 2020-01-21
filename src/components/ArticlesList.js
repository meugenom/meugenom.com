'use strict';

import PostService from '../services/Service.js';


let ArticlesList = {

    render : async () => { 
                 
            let posts = await PostService.getList();
                                      
            let view = `
            <main id="main-content">
                <div class="container">
                    <article>                
                        <h2>
                            List of Articles
                        </h2>                                                
                        <ul>
                            ${ posts.map(post => 
                                `<li><a href="#/post/${post.slug}">${post.title}</a></li>`
                                ).join('\n ')
                            }
                        </ul>                        
                    </article>
                </div>      
            </main>                
        `                        

        return view;        

    },

    after_render : async ()=> {                                       
    }

}

export default ArticlesList;
