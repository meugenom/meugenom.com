'use strict'
import PostService from '../services/Service.js'
import Config from '../config/Configs'
import Query from '../services/Query'

const ProjectsList = {
  render: async () => {
    const query = Query.projectsListQuery.query
    const host = Query.projectsListQuery.host
    const token = Config.token
    const data = await PostService.graphql('json', host, token, query)
    const projects = await data.user.repositories.edges
    const view = /* html */`
            <main id="main-content">
                <div class="container">
                    <article>                        
                            <h2>Open Source Projects</h2>
                                <section class="projects">
                                    <div class="each">                                        
                                            <ul>                        
                                            ${projects.map(project =>
                                                  `${project.node.description != null
                                                  ? ` <li>${project.node.description}
                                                  (updated ${new Date(project.node.updatedAt).getDate()}.
                                                    ${Config.month[new Date(project.node.updatedAt).getMonth()]}.${new Date(project.node.updatedAt).getFullYear()})
                                                    | <a href="https://github.com${project.node.resourcePath}">view source</a>                                                   
                                                  ${project.node.homepageUrl === null || project.node.homepageUrl === ''
                                                  ? ''
                                                  : ` | <a href="${project.node.homepageUrl}">website</a>`}</li>`
                                                  : ''}`
                                                ).join('\n ')
                                            }
                                            </ul>                                                                                                        
                                    </div>
                                </section>
                    </article>
                </div>      
            </main>                
        `
    return view
  },
  afterRender: async () => {

  }
}

export default ProjectsList
