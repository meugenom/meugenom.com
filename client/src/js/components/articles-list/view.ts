'use strict'
import IArticle from '../interfaces/IArticle';

/**
 * View for component Articles List
 * @param posts
 * @returns html view for articles list page
 */

class View {

  async appendArticlesList (articlesList: IArticle[]) {

    const list: IArticle[] = [];

    // if articlesList is null or undefined
    if (articlesList === null || articlesList === undefined) {
      return /* html */`
      <div class="container mx-auto px-4 sm:px-8 font-sans text-base antialiased leading-7 z-0 ml-5">              
          <article>
            <div class="pt-6 pb-4 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
              <p class="text-[11px] font-bold uppercase tracking-widest opacity-50">Articles</p>
            </div>
            <ul>
              <li class=" text-blue-400 hover:text-blue-400">
                <a href="/Error502">
                  No articles available
                </a>                      
              </li>
            </ul>
          </article>
        </div>
      `
    }

    // from object to array
    Object.entries(articlesList).forEach(([key, value]) => {      
      (value as unknown as any[]).map((article: any) => {        
        //console.log(article)
        list.push(article)

      })
    })
    
    const view = /* html */`    
      <div class="container mx-auto px-4 sm:px-8 font-sans text-base antialiased leading-7 z-0 ml-5">              
          <article>
            <div class="pt-6 pb-4 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
              <p class="text-[11px] font-bold uppercase tracking-widest opacity-50">Articles</p>
            </div>
            <ul>
              ${list.map((article: any) => `              
            
              <li class="font-medium hover:text-blue-400">
                <a key="${article.slug}" 
                href="#/article/${article.slug}">
                  ${article.title.substring(1, article.title.length - 1)}
                </a>                      
                &nbsp;
                <span class="tag-container">
                  ${article.tags.split(" ").map((tag: any) => 
                  `
                  <a href="${`#/tag/${tag}`}"                
                  class="text-[8px] font-semibold py-1 px-1 uppercase rounded text-white bg-slate-400  hover:bg-slate-500 uppercase last:mr-0 mr-1">
                  ${tag}
              </a>`).join('')}
              
            </span>
            &nbsp;
            <span class="invisible lg:visible text-[8px] font-semibold py-1 px-1 uppercase rounded text-white bg-blue-400 uppercase last:mr-0 mr-1">
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
