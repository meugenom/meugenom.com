'use strict';

import PostService from '../services/Service.js';
import Config from '../config/Configs';

let ProjectsList = {

    render : async () => {                        
        let query = 
        `{
            user(login: "eugenemdev") {
              email
              location
              websiteUrl
              repositories(last: 10) {
                edges {
                  node {
                    id
                    name
                    description
                    updatedAt
                    hasIssuesEnabled
                    homepageUrl
                    resourcePath
                    issues(last: 10) {
                      nodes {
                        id
                        number
                        lastEditedAt
                        bodyText
                      }
                    }
                  }
                }
              }
            }
          }
        `;

        let host = 'https://api.github.com/graphql';         
        let token = Config.token;
        let data =  await PostService.graphql( 'json', host, token, query);  
        let projects = await data.user.repositories.edges ;                                 
            let view = /*html*/`
            <main id="main-content">
                <div class="container">
                    <article>                        
                            <h2>Open Source Projects</h2>
                                <section class="projects">
                                    <div class="each">                                        
                                            <ul>                        
                                            ${projects.map(project => 
                                                  `${ project.node.description != null ?
                                                  ` <li>${project.node.description} | <a href="https://github.com${project.node.resourcePath}">github</a> 
                                                  ${ project.node.homepageUrl === null || project.node.homepageUrl === ''? 
                                                  '' : 
                                                  ` | <a href="${project.node.homepageUrl}">website</a>`}</li>`
                                                  :
                                                  ''}`                                
                                                ).join('\n ')
                                            }
                                            </ul>                                                                                                        
                                    </div>
                                </section>
                    </article>
                </div>      
            </main>                
        `                
        return view;        

    },

    after_render : async ()=> {
        
    }

}

export default ProjectsList;
