'use strict'

/**
 * View for component TagsGarten
 * @param posts
 * @returns html view for tags garten
 */

class View {

  appendTagsGarten (tags: any) {

    tags = [
        {
            "name": "writer",
            "slug": "how-to-write-text"
        },
        {
            "name": "macos",
            "slug": "mac-os-shortcuts"
        }
    ]

    const view = /* html */`      
      <div class="md:container mx-5 font-sans text-base antialiased leading-7 z-0">
          <article>
            <h4 class="text-2xl font-normal leading-normal mt-0 mb-2 text-gray-500">
              Tags Garten:
            </h4>
            <ul class="list-decimal">

              ${tags.map((tag: any) => 
                /* html */
                `              
                <li class="text-slate-600 font-medium hover:text-blue-600">
                    <a key="${tag.name}" href="#/article/${tag.slug}">
                        ${tag.name}
                    </a>                                  
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
