'use strict';

import PostService from '../services/Service.js';


let ProjectsList = {

    render : async () => {                        
                      
        //let posts = await PostService.getList();
            
            let view = /*html*/`
            <main id="main-content">
                <div class="container">
                    <article>                        
                            <h1>Open Source Projects</h1>
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

export default ProjectsList;
