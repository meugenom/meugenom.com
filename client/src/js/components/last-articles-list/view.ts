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
            <div class="pt-6 pb-4 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
              <p class="text-[11px] font-bold uppercase tracking-widest opacity-50">Latest Posts</p>
            </div>
            <ul>

              ${list.map((article: any) => `              
            
              <li class="font-medium hover:text-blue-400 py-2">
                <a key="${article.slug}" href="#/article/${article.slug}">
                  ${article.title.substring(1, article.title.length - 1)}
                </a>                                      
                <span class="inline-flex flex-wrap gap-1 items-center">
                  ${article.tags.split(" ").map((tag: any) => 
                  `
                  <a href="${`#/tag/${tag}`}"                
                  class="text-[11px] font-mono border border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full hover:border-blue-400 hover:text-blue-500">
                  #${tag}
              </a>`).join('')}
              <span class="invisible sm:visible text-[11px] font-mono border border-slate-200 dark:border-slate-700 text-slate-400 px-2 py-0.5 rounded-full">
                ${article.date}
              </span>  
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
