'use strict'
import PostService from '../services/Service.js'
import Query from '../services/Query.js'

let posts = {}

const ArticlesList = {
  render: async () => {
    const host = Query.articlesList.host
    const token = ''
    const query = Query.articlesList.query

    posts = await PostService.graphql('json', host, token, query)
    const articles = await posts.articlesList

    const view = `
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
    return view
  },
  afterRender: () => {}
}

export default ArticlesList
