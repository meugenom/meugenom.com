'use strict'

/**
 * View for component About
 * @returns html to view about block
 */

class View {
  appendAbout() {
    const view = /* html */`
      <div class="mx-10 font-sans text-base antialiased leading-7 z-0">
        <div class="flex">
          <div class="w-70 md:w-70 p-8 font-mono">
            <h1 class="text-3xl font-normal leading-normal mt-0 mb-2">
              About me
            </h1>
            <p>
              Hey I'm Eugen. 
            </p>
            <p>
              I'm a software developer from a small town in Germany. 
            </p>
            <p>
              Welcome to my website.
              I make 
              <a class="text-purple-600 font-medium hover:text-purple-300" href="https://meugenom.com/projects">open source projects</a>                            
              and 
              <a class="text-purple-600 font-medium hover:text-purple-300" href="https://meugenom.com/articles">write</a>
              about code, architecture, and building things and life.
              I've learned with the world and want to share my motivation for this site. 
            </p>  
            <p>
              My website has no ads, sponsors, no affilated links, no tracking or analytics, 
              no paywell or sponsored posts.
              I want to make a place where I can share my thoughts and ideas. 
              I hope to motivate others to make own projects and share them with the world.
            </p>
            <p>
              You can contact me by email at hallo at meugenom.com to say hello or ask questions.               
            </p>
            <p>
              I will be happy meeting new people.
            </p>

            <!-- What I'm doing now-->
            <h1 class="text-2xl font-normal leading-normal mt-8 mb-2">
              What I'm doing now
            </h1>
            <ul>
              <p class="italic">
                  Updated Oktober, 2023
              </p>
              <li class="list-disc ml-8">                                 
                <a class="text-purple-600 font-medium hover:text-purple-300" href="https://github.com/meugenom/cloudydesk">Cloudy Desktop Project</a>
              </li>
            </ul>
            
            <!-- Random Facts-->
            <h1 class="text-2xl font-normal leading-normal mt-8 mb-2">
              Random Facts
            </h1>
            <ul>
              <li class="list-disc ml-8">
                My best category music is 80s and 90s                
              </li>
              <li class="list-disc ml-8">
                I have a degree in economics and worked as a economist for 5 years. 
              </li>
              <li class="list-disc ml-8">
                My expirience is not limited in economics or IT. 
                I have worked with personnel and know how to motivate people to get the job done and get good results.
              </li>
            </ul>
            
            <!-- Favorites-->
            <h1 class="text-2xl font-normal leading-normal mt-8 mb-2">
              Favorites
            </h1>
            <ul>
              <li class="list-disc ml-8">
                <span class="font-bold">Colour:</span>
                  - <span class="text-purple-600">purple</span>,
                  <span class="text-indigo-600">indigo</span>, 
                  <span class="text-sky-600">sky</span>, 
                  <span class="text-blue-600">blue</span>, 
                  <span class="text-slate-600">slate</span>, 
                  
              </li>
              <li class="list-disc ml-8">
                <span class="font-bold">Flavour:</span>
                - chocolate, strawberry, pistachio
              </li>
              <li class="list-disc ml-8">
                <span class="font-bold">Season:</span>
                - spring
              </li>
              <li class="list-disc ml-8">
                <span class="font-bold">Animal:</span>
                - tiger, cats
              </li>


            <!-- Tools-->
            <h1 class="text-2xl font-normal leading-normal mt-8">
              Tools
            </h1>  
            <h1 class="text-lg font-normal leading-normal mt-2">
              Software:
            </h1>
            <ul>
              <li class="list-disc ml-8">
                The web site is hosted on
                <a class="text-purple-600 font-medium hover:text-purple-300" href="https://contabo.com/">Contabo.com</a> and built with 
                <a class="text-purple-600 font-medium hover:text-purple-300" href="https://www.typescriptlang.org/docs/">Typescript</a>,
                and 
                <a class="text-purple-600 font-medium hover:text-purple-300" href="https://spring.io">Spring-Boot && Java</a>,
                and my own 
                <a class="text-purple-600 font-medium hover:text-purple-300" href="https://github.com/meugenom/spa-mvc-router">SPA MVC Router</a>
              </li>
              <li class="list-disc ml-8">
                <span class="font-bold">Coding:</span>
                <a class="text-purple-600 font-medium hover:text-purple-300" href="https://code.visualstudio.com/">Visual Studio Code</a>
              </li>
              <li class="list-disc ml-8">
                <span class="font-bold">Terminal:</span>
                <a class="text-purple-600 font-medium hover:text-purple-300" href="https://iterm2.com/">iTerm2</a>
              </li>
              <li class="list-disc ml-8">
                <span class="font-bold">Notes:</span>
                <a class="text-purple-600 font-medium hover:text-purple-300" href="https://obsidian.md/">Obsidian</a>
              </li>
            </ul>
            <h1 class="text-lg font-normal leading-normal mt-2">
              Hardware              
            </h1>
            <ul>
              <li class="list-disc ml-8">
                <span class="font-bold">Coding PC:</span>
                MacBook Pro 14" M4 Pro                                
              </li>
            </ul>            
            <h1 class="text-xl font-normal leading-normal mt-8 mb-2">
              Miscellaneous
            </h1>
              <li class="list-disc ml-8">
              <a class="text-purple-600 font-medium hover:text-purple-300" href="">Resume(soon)</a>
              </li>                 
          </div>
          
          <div class="w-30 md:w-30 p-8 hidden sm:flex" style="height: 20%;">            
            <div class="py-4 px-4 max-w-sm mx-auto bg-white shadow-lg">
              <img class="lazy block mx-auto w-128 sm:mx-0 sm:shrink-0" data-src="/images/foto_me.jpg" alt="Me" />              
            </div>
          </div>

        </div>
      </div>
      `;
    return view;
  }
}

export default View;
