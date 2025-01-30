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
            <h1 class="text-3xl font-normal leading-normal mt-0 mb-2">
              Tags Garten:
            </h1>
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
            <h4 class="text-2xl font-normal leading-normal mt-0 mb-2">
              Tags Garten:
            </h4>
            <ul>

              ${letters.map((letter: any) => 
                /* html */
                `              
                <li class="text-slate-600 font-medium hover:text-blue-600">
                  <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-blue-400 uppercase last:mr-0 mr-1">
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