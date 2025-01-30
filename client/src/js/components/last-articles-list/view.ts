'use strict'
import IArticle from '../interfaces/IArticle';
import Model from './model'

/**
 * View for component LastArticlesList
 * @param posts
 * @returns html view for last articles list
 */

class View {

  appendLastArticlesList (lastArticlesList: IArticle[]) {

    const list: IArticle [] = [];

    //console.log(lastArticlesList)

    // need to check if lastArticlesList is object null or undefined
    if (lastArticlesList === null || lastArticlesList === undefined) {
      return /* html */`
      <div class="container mx-auto px-4 sm:px-8 font-sans text-base antialiased leading-7 z-0 ml-5">              
          <article>
            <h1 class="text-3xl font-normal leading-normal mb-2">
              Articles:
            </h1>
            <ul>
              <li class="font-medium text-blue-400 hover:font-bold">
                <a href="/Error502">
                  No articles available
                </a>                      
              </li>
            </ul>
          </article>
        </div>
      `
      ;
    }

    // from object to array
    Object.entries(lastArticlesList).forEach(([key, value]) => {      
      (value as unknown as any[]).map((article: any) => {        
        //console.log(article)
        list.push(article)

      })
    })

    const view = /* html */`      
      <div class="mx-5 font-sans text-base antialiased leading-7 z-0">
          <article>
            <h4 class="text-2xl font-normal leading-normal mt-0 mb-2">
              Latest Posts:
            </h4>
            <ul>

              ${list.map((article: any) => `              
            
              <li class="font-medium hover:text-blue-400">
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
                  #${tag}
              </a>`).join('')}
              
            </span>
            &nbsp;
            &nbsp;
            <span class="invisible sm:visible sm text-xx font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-blue-400 uppercase last:mr-0 mr-1">
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
