'use strict'
import PostService from '../services/Service.js'
import ProjectsList from './ProjectsList'
import Query from '../services/Query.js'

const Home = {
  render: async () => {
    const host = Query.lastArticlesList.host
    const token = ''
    const query = Query.lastArticlesList.query
    const posts = await PostService.graphql('json', host, token, query)
    const articles = await posts.lastArticlesList

    const view = /* html */`
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
            </main>`
    return view
  },

  afterRender: async () => {
    const content = document.getElementById('currentProjects')
    content.innerHTML = await ProjectsList.render()
  }
}

export default Home
