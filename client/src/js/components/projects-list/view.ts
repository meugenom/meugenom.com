'use strict'

import Model from './model'
import Config from '../../config'
import ILanguage from '../interfaces/ILanguage';
import IProject from '../interfaces/IProject';

/**
 * View for component Project List
 * @param project
 * @returns html view for component Project List
 */



class View {

  renderLanguages(project: IProject) {

    //console.log('project', project)

    const languages = `
    ${project.node.languages.nodes.map((language: ILanguage) => {      
      if(language.name === 'JavaScript'
      || language.name === 'HTML' 
      || language.name === 'CSS' 
      || language.name === 'TypeScript'
      || language.name === 'Python'
      || language.name === 'SCSS'
      || language.name === 'Java'
      || language.name === 'Shell'
    ){
      return `
        <div class="relative" style="right: 0px;margin-bottom: -35px;">					
          ${Config.languageToSVG[language.name as keyof typeof Config.languageToSVG]}
          <br/>
        </div>
      `
    }}
    ).join('')}
    `;
    return languages;
}

  appendProjectsList (projects: IProject[]) {
    
    //console.log('projects', projects)
    
    const view = /* html */`            
                    <div class="md:container mx-5 font-sans text-base antialiased leading-7 z-0 mb-20">                    
                          <article>
                            <h4 class="text-2xl font-normal leading-normal mt-10 mb-2 text-gray-500 ml-12">
                              Projects:
                            </h4>
                                                                            
                            <ul class="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 w-full mt-10">                              
                            
                            ${projects.map((project: { node: any }) => /* html */`                                                        
                                  <li>                          
                                    <div class="shadow-lg hover:shadow-md bg-white rounded-lg overflow-hidden relative" style = "height: 450px; width: 302px;">
                                      <img
                                        class="object-cover w-full h-48 w-70max-w-70 min-w-70"
                                        src="${project.node.openGraphImageUrl}"
                                        alt="project_picture"/>
                                        
                                        <div class="absolute" style="top: 0px; right: 0px;">
                                          ${this.renderLanguages(project)}
                                        </div>

                                        ${project.node.stargazers.totalCount !="0" ? (                                       `
                                          <div>
                                            <div class="absolute" style="top: 0px; left:0;">
                                              <div class="relative">
                                                <svg width="48px" height="48px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="m7.68 26.92a81.36 81.36 0 0 1 9.32-3.35 46.42 46.42 0 0 1 5.66-1.06s2.28-5.09 3.59-7.66 2.16-4.28 3.6-4.43 4.31 4.43 5.71 6.84 2.6 4.41 2.6 4.41 9.72.9 13.22 1.06 4.78.25 5.15 1.19-8 7-9.68 8.31a21.53 21.53 0 0 0 -2.69 2.5s1.78 6.4 2.94 11.06 1.65 6.41 1.12 7.31-2.16.41-3.56-.37-7.56-4.78-9.88-6.1-3.18-1.21-3.34-1.18-8.81 4.62-11.56 6.15-4.26 1.57-4.88 1.4-.31-1.78-.09-3 3.69-13.6 3.69-13.78a44.64 44.64 0 0 0 -7-5.57c-2.6-1.65-3.54-2.05-3.76-2.23s-.66-1.29-.16-1.5z" fill="#1d1d1b"/><path d="m10.87 27.45c.21-.35 6.44-2.38 9.22-3s3.28-.56 3.43-.69 2.82-5.59 4.19-8.12 1.88-3.16 2.1-3.16a81.12 81.12 0 0 1 5.19 7.72c1.27 2.25 1.52 2.8 1.71 2.8s9.35.81 12.5 1 4.63.41 4.5.63-5.47 4.12-8 6.31-3.71 2.98-3.65 3.35 1.53 6.38 1.43 6.31a25.89 25.89 0 0 0 -3.49-1.6c-.12.12-.65.84-.4 1.09s4.12 2 4.12 2.19.32 1.69.32 1.69-5.25-3-5.47-3-.88.56-.72.78 6.31 3.56 6.47 3.78a5.48 5.48 0 0 1 .56 1.53c-.09 0-7.72-4.5-8-4.44s-.75.94-.66 1 8.91 5.19 9.07 5.44.87 2 .68 2-7.59-4.34-10.4-5.9-3.47-1.79-4-1.75a121.69 121.69 0 0 0 -11.47 5.75c-2.16 1.31-3 1.56-3.07 1.4s2.44-10.06 3-12.5.79-2.87.16-3.65a27.46 27.46 0 0 0 -5.47-4.22c-2.6-1.62-3.95-2.59-3.85-2.74z" fill="#fab900"/><path d="m27.06 21c-.33-.33 2.18-4.69 2.31-4.69s.81.16.87.41a32.48 32.48 0 0 1 -2 4.72 3.18 3.18 0 0 1 -1.18-.44z" fill="#1d1d1b"/></svg>						
                                              </div>	
                                            </div>
                                            <div class="absolute" style="top: 0px; left:0;">
                                              <div class="relative">
                                                <div class="my-4 mx-5 text-xs underline subpixel-antialiased text-black">
                                                  ${project.node.stargazers.totalCount}
                                                </div>						
                                              </div>
                                            </div>
                                          </div>`

                                        ):("")}


                                        <div class="relative p-4 h-60 max-h-60">
                                          <h3 class="text-base md:text-xl font-medium text-gray-800 underline decoration-pink-500">
                                            ${project.node.name}
                                          </h3>
                                          <p class="mt-4 text-base md:text-xs text-gray-600">
                                            (updated ${new Date(project.node.pushedAt).getDate()}.
                                                     ${new Model().getMonth(new Date(project.node.pushedAt).getMonth())}.
                                                      ${new Date(project.node.pushedAt).getFullYear()})
                                          </p>

                                          <p>
                                            <a
                                              class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-slate-400  hover:bg-slate-500 uppercase last:mr-0 mr-1"
                                              href="${"https://github.com" + project.node.resourcePath}">
                                              Source
                                            </a>
                                            &nbsp;
                                            ${project.node.homepageUrl === "" ||
                                            project.node.homepageUrl == null ? (
                                            ""
                                            ) : (
                                              `
                                            <a
                                              class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-blue-400  hover:bg-blue-500 uppercase last:mr-0 mr-1"
                                              href="${project.node.homepageUrl}">
                                              Show Web
                                            </a>`
                                            )}
                                          </p>
                                          <p className="mt-2 text-base md:text-sx text-gray-600">
                                            ${project.node.description}
                                          </p>                                        
                                        </div>
                                                                                                                      
                                    </div>
                                  </li>
                                    `              
                                    ).join('')}                                
                            </ul>
                          </article>                      
                        </div>                                              
                    `
    return view
  }
}

export default View