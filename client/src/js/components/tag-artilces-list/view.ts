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
            <h1 class="text-2xl font-normal leading-normal mt-0 mb-2">
              No writings found.
            </h1>
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
            <h1 class="text-2xl font-normal leading-normal mt-0 mb-2">
              Writings found:
            </h1>
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
                  class="text-[8px] font-semibold py-1 px-1 uppercase rounded text-white bg-slate-400  hover:bg-slate-500 uppercase last:mr-0 mr-1">
                  #${tag}
              </a>`).join('')}              
            </span>        
            <span class="invisible sm:visible text-[8px] font-semibold py-1 px-1 uppercase rounded text-white bg-blue-400 uppercase last:mr-0 mr-1 ml-1">
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
