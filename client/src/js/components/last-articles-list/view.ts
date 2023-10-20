'use strict'
import Model from './model'

/**
 * View for component LastArticlesList
 * @param posts
 * @returns html view for last articles list
 */

class View {

  appendLastArticlesList (lastArticlesList: any) {

    const list: any[] = [];

    console.log(lastArticlesList)

    // from object to array
    Object.entries(lastArticlesList).forEach(([key, value]) => {      
      (value as any[]).map((article: any) => {        
        console.log(article)
        list.push(article)

      })
    })

    const view = /* html */`      
      <div class="md:container mx-5 font-sans text-base antialiased leading-7 z-0">
          <article>
            <h4 class="text-2xl font-normal leading-normal mt-0 mb-2 text-gray-500">
              Latest Posts:
            </h4>
            <ul>

              ${list.map((article: any) => `              
            
              <li class="text-slate-600 font-medium hover:text-indigo-600">
                <a key="${article.slug}" href="#/article/${article.slug}">
                  ${article.title.substring(1, article.title.length - 1)}
                </a>                      
                &nbsp;
                &nbsp;
                <span class="tag-container">
                  ${article.tags.split(" ").map((tag: any) => 
                  `
                  <a href="${`#/tag/${tag}`}"                
                  class="text-xx font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-slate-400  hover:bg-slate-500 uppercase last:mr-0 mr-1">
                  ${tag}
              </a>`).join('')}
              
            </span>
            &nbsp;
            &nbsp;
            <span class="text-xx font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-blue-400 uppercase last:mr-0 mr-1">
              ${article.date}
            </span>
          </li>
            `).join('')}
          </ul>
        </article>
      </div>
    `
    return view
  }
}

export default View
