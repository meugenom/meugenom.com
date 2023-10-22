'use strict'

/**
 * View for component TagsGarten
 * @param posts
 * @returns html view for tags garten
 */

class View {

  appendTags (tags: any) {

    let letters: any[] = [];

    // from object to array
    Object.entries(tags).forEach(([key, value]) => {      
      (value as any[]).map((tag: any) => {   
        
        // letters
        const firstLetter = tag.name.charAt(0).toUpperCase();
        //console.log(firstLetter)
        const index = letters.findIndex(item => item.letter === firstLetter);
        if (index === -1) {
          letters.push({ letter: firstLetter, tags: [tag] });
        } else {
          letters[index].tags.push(tag);
        }
      })
    })

    // need to sort letters by letter property and tags by name property 
    letters.sort((a, b) => a.letter.localeCompare(b.letter))
    letters.forEach(letter => letter.tags.sort((a:any, b:any) => a.name.localeCompare(b.name)))

    //console.log(letters)

    const view = /* html */`      
      <div class="mx-5 font-sans text-base antialiased leading-7 z-0">
          <article>
            <h4 class="text-2xl font-normal leading-normal mt-0 mb-2 text-gray-500">
              Tags Garten:
            </h4>
            <ul>

              ${letters.map((letter: any) => 
                /* html */
                `              
                <li class="text-slate-600 font-medium hover:text-indigo-600">
                  <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-indigo-400 uppercase last:mr-0 mr-1">
                  ${letter.letter}
                  </span>                    
                    ${letter.tags.map((tag: any) => 
                    `
                      <a key="${tag.name}" 
                        href="${`#/tag/${tag.name}`}"
                        class="text-xx font-medium inline-block py-1 px-2 uppercase rounded text-white bg-slate-400  hover:bg-slate-500 uppercase last:mr-0 mr-1">                        
                        ${tag.name}
                      </a>                                              
                    `).join('')}
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