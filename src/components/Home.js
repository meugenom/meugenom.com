'use strict';

import PostService from '../services/Service.js';
import ProjectsList from './ProjectsList';


let Home = {

    render : async () => {                        
        const host = '/graphql';
        const token = '';                              
        const query = "{ lastArticlesList { slug title}}";
        let posts =  await PostService.graphql( 'json', host, token, query);  
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
                    </article>                    
                </div>      
                <div id="currentProjects"></div>
            </main>
                            
        `    
                
        //console.log('Created View - '+ Date.now());

        return view;        

    },

    after_render : async ()=> {

        const content = document.getElementById('currentProjects');
        content.innerHTML =  await ProjectsList.render();        
    }

}

export default Home;
