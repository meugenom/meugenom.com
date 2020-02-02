'use strict';

import PostService from '../services/Service.js';


let Home = {

    render : async () => {                        
                              
        let posts =  await PostService.graphql( 'json',"{ lastArticlesList { slug title}}");  
        let articles = await posts.lastArticlesList;                         

        let view = /*html*/`
            <main id="main-content">
                <div class="container">
                    <article>
                        <h1> I'm Eugen </h1>
                            <p>
                                I'm a web developer writing about Javascript, 
                                Python, Java and all things which are interesting and maybe incredible.                                 
                            </p>
                            <div class="social-buttons">
                                Social Buttons ... (under construction)
                            </div>
                            <h2>
                                Latest Articles
                            </h2>                                                
                            <ul>
                                ${articles.map(article => 
                                    `<li><a href="#/post/${article.slug}">${article.title}</a></li>`
                                    ).join('\n ')
                                }
                            </ul>
                            <h2>Open Source Projects</h2>
                                <section class="projects">
                                    <div class="each">
                                        <h2>
                                            ...under construction
                                        </h2>                                        
                                    </div>
                                </section>
                    </article>
                </div>      
            </main>                
        `    
                
        //console.log('Created View - '+ Date.now());

        return view;        

    },

    after_render : async ()=> {
        
    }

}

export default Home;
