'use strict';

import Utils        from '../services/Utils.js';
import PostService from '../services/Service.js';

//import parser for markable text
import {View} from '../parser/View.js';

let Post = {
    render : async ()=> {

        return /*html*/`
        <main id="main-content">                                  
            <article>              
            </article>            
        </main>
        `    
    },

    after_render : async ()=> {

        let request = await Utils.parseRequestURL();
        
        //GraphQL query options
        let query =  "query Query($slug: String!) {\n  article(slug: $slug) {\n    body\n  }\n}\n";                    
        let variables =  { "slug": request.id};
        
        let post = await PostService.graphql('json', query, variables);                
        post = await post.article.body;

        await (new View()).render(post);        
        await Post.setLanguage();       

    },

    setLanguage : ()=> {
        
        //by default we can see english version
        let language = '@en';                        

        //add event listeners to languages buttons
        const english = document.getElementById('englishSelector');
        const german = document.getElementById('germanSelector');
        const russian = document.getElementById('russianSelector');
        
        english.addEventListener("click", function(){            
            language = '@en';
            //console.log('Language changed on English')
            changeLanguage();
        });

        german.addEventListener("click", function(){                        
            language = '@de';
            //console.log('Language changed on German')
            changeLanguage();
        });

        russian.addEventListener("click", function(){            
            language = '@ru';
            //console.log('Language changed on Russian')
            changeLanguage();
        });        
        
        function changeLanguage(){
            
            /** by default multi*/
        
            let article = document.querySelector('article');
            let articles = article.childNodes;
            
            articles.forEach(node => {
                if(node.dataset != undefined){
                    if(node.dataset.language == language || node.dataset.language == '@all') {                    
                        node.style.display = ''
                    }else{
                        if(node.tagName != 'HEADER'){
                            node.style.display = 'none';
                        }                        
                    }
                }

            })
                   
            
        }

        //first loading
        language = '@en';
        changeLanguage();
    }
}

export default Post;