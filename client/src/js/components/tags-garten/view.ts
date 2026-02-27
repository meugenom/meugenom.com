'use strict'

import ITags from "../interfaces/ITags";

/**
 * View for component TagsGarten
 * @param posts
 * @returns html view for tags garten
 */

interface ILetter {
  letter: string;
  tags: ITags[];
}
class View {

  appendTags (tags: ITags[]) {

    let letters: ILetter[] = [];

    // need to check if tags is object null or undefined
    if (tags === null || tags === undefined) {
      return `
      <div class="mx-5 font-sans text-base antialiased leading-7 z-0">
          <article>
            <div class="pt-6 pb-4 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
              <p class="text-[11px] font-bold uppercase tracking-widest opacity-50">Tags Garten</p>
            </div>
            <ul>
              <li class="text-blue-400 hover:text-bold">
                <a href="#/tag/">
                  No tags available
                </a>              
              </li>
            </ul>
          </article>
        </div>
      `;
    }

    // from object to array
    Object.entries(tags).forEach(([key, value]) => {      
      (value as unknown as any[]).map((tag: ITags) => {   
        
        // letters
        const firstLetter = tag.name.charAt(0).toUpperCase();
        //console.log(firstLetter)
        const index = letters.findIndex(item => item.letter === firstLetter);
        if (index === -1) {          
          letters.push(
            { 
              letter: firstLetter, 
              tags: [tag] }
            );
        } else {
          letters[index].tags.push(tag);
        }
      })
    })

    //delete duble tags for each letter
    letters.forEach(letter => {
      letter.tags = letter.tags.filter((tag: { name: string; }, index: number, self: ITags[]) =>
        index === self.findIndex((t) => (
          t.name === tag.name
        ))
      )
    })

    // need to sort letters by letter property and tags by name property 
    letters.sort((a, b) => a.letter.localeCompare(b.letter))
    letters.forEach(letter => letter.tags.sort((a:any, b:any) => a.name.localeCompare(b.name)))


    const view = /* html */`      
      <div class="mx-5 font-sans text-base antialiased leading-7 z-0">
          <article>
            <div class="pt-6 pb-4 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
              <p class="text-[11px] font-bold uppercase tracking-widest opacity-50">Tags Garten</p>
            </div>
            <ul>

              ${letters.map((letter: any) => 
                /* html */
                `              
                <li class="text-slate-600 hover:text-blue-600">
                  <span class="text-[11px] font-mono font-semibold text-blue-400 mr-2">
                  ${letter.letter}
                  </span>                    
                    ${letter.tags.map((tag: any) => 
                    `
                      <a key="${tag.name}" 
                        href="${`#/tag/${tag.name}`}"
                        class="text-[11px] font-mono border border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full hover:border-blue-400 hover:text-blue-500 last:mr-0 mr-1">                        
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