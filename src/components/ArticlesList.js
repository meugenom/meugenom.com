'use strict';

import PostService from '../services/Service.js';

let posts = {};

let ArticlesList = {    
    
    render : async () => {             
                        
            posts =  await PostService.graphql( 'json',"{ articlesList { slug title}}");  
            let articles = await posts.articlesList;                 
            
            let view = `
            <main id="main-content">
                <div class="container">
                    <article>                
                        <h2>
                            List of Articles
                        </h2>
                        <ul>                        
                        ${articles.map(article => 
                            `<li><a href="#/post/${article.slug}">${article.title}</a></li>`                                
                            ).join('\n ')
                        }
                        </ul>                        
                    </article>
                </div>      
            </main>                
        `                        

        return view;        

    },

    after_render : ()=> {      
    }

}

export default ArticlesList;
