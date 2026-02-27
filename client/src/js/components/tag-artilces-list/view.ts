'use strict'

/**
 * View for component Home
 * @param posts
 * @returns html view for articlesList by the tag page
 */

class View {

  appendTagArticlesList (articlesList: {spec: string}) {

    const list: string[] = [];

    // check if articlesList is empty
    if (!articlesList) {
      return /* html */`
        <div class="mx-10 font
        -sans text-base antialiased leading-7 z-0">
          <article>
            <div class="pt-6 pb-4 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
              <p class="text-[11px] font-bold uppercase tracking-widest opacity-50">No writings found</p>
            </div>
          </article>
        </div>
      `
    }

    // from object to array
    Object.entries(articlesList).forEach(([key, value]) => {      
      (value as unknown as any[]).map((article: any) => {        
        console.log(article)
        list.push(article)

      })
    })

    const view = /* html */`
      <div class="mx-10 font-sans text-base antialiased leading-7 z-0">      
          <article>
            <div class="pt-6 pb-4 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
              <p class="text-[11px] font-bold uppercase tracking-widest opacity-50">Found</p>
            </div>
            <ul class="list-decimal">

              ${list.map((article: any) => `              
            
              <li class="font-medium hover:text-blue-600" key="${article.slug}">
                <a href="#/article/${article.slug}">
                  ${article.title.substring(1, article.title.length - 1)}
                </a>                                      
                <span class="tag-container">
                  ${article.tags.split(" ").map((tag: any) => 
                  `
                  <a href="${`#/tag/${tag}`}"                
                  class="text-[11px] font-mono border border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full hover:border-blue-400 hover:text-blue-500 last:mr-0 mr-1">
                  #${tag}
              </a>`).join('')}              
            </span>        
            <span class="invisible sm:visible text-[11px] font-mono border border-slate-200 dark:border-slate-700 text-slate-400 px-2 py-0.5 rounded-full ml-1">
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
