'use strict'

/**
 * View for component About
 * @returns html to view about block
 */

class View {
  async appendAbout() {
    const view = /* html */`
      <!-- Main Content (takes full width on small screens) -->        
      <div class="flex">
        <div class="w-full p-8 font-mono">
          <div class="py-2 px-2 w-full max-w-[300px] float-right ml-4 mb-4 bg-white shadow-lg hidden lg:block">
            <img class="lazy w-full h-auto object-cover" data-src="/images/foto_me.jpg" alt="Me"/>              
          </div>  
          <h1 class="text-3xl font-normal leading-normal mt-0 mb-2">About</h1>
              <p>
                Hey I'm Eugen.
              </p>
              <p>
                This website was written by me with pure Typescript. For styling, I used the 
                <a class="text-sky-blue font-medium hover:font-bold" href="https://tailwindcss.com">
                 TailwindCSS framework
                </a>
                . The structure of the website is built with an
                <a class="text-blue-600 font-medium hover:font-bold" href="https://github.com/meugenom/spa-mvc-router">
                 SPA MVC Router
                </a>, which I also developed myself.
              </p>
              <p>
                 Welcome to my website. I work on
                <a class="text-blue-600 font-medium hover:font-bold" href="https://meugenom.com/projects">
                 open source projects
                </a>    
                and 
                <a class="text-blue-600 font-medium hover:font-bold" href="https://meugenom.com/articles">
                write
                </a>
                about coding, architecture, building things, and life.
                I’ve learned a lot from the world, and I want to share my knowledge and motivation through this site.
              </p>  
              <p>
                My website has no ads, sponsors, no affilated links, no paywell or sponsored posts.
                I want to create a space where I can freely share my thoughts and ideas. My goal is to inspire others to build their own projects and share them with the world.              
              </p>
              <p>
                You can contact me by email 📧:  hallo at meugenom.com to say hello or ask questions.               
              </p>
              <p>
                I’d be happy to connect with new people!
              </p>

              <!-- What I’m doing now-->              
              <!-- Random Facts-->
              <h1 class="text-2xl font-normal leading-normal mt-8 mb-2">
                Random Facts
              </h1>
              <ul>
                <li class="list-disc ml-8">
                  My favorite music era is the ’80s and ’90s                
                </li>
                <li class="list-disc ml-8">
                  I have a degree in economics and worked as an economist for five years. 
                </li>
                <li class="list-disc ml-8">
                  My experience isn’t limited to economics or IT—I’ve also worked in personnel management and know how to motivate people to achieve great results.
                </li>
              </ul>
            
              <!-- Favorites-->
              <h1 class="text-2xl font-normal leading-normal mt-8 mb-2"> Favorites </h1>
                <ul>
                  <li class="list-disc ml-8">
                    <span class="font-bold">Color:</span>
                      - <span class="text-purple-600 font-bold">purple</span>,
                      <span class="text-indigo-600 font-bold">indigo</span>, 
                      <span class="text-sky-600 font-bold">sky</span>, 
                      <span class="text-blue-600 font-bold">blue</span>, 
                      <span class="text-slate-600 font-bold">slate</span>                   
                  </li>
                  <li class="list-disc ml-8">
                    <span class="font-bold">Flavour:</span>
                    - 🍫, 🍓, 🍒, pistachio
                  </li>
                  <li class="list-disc ml-8">
                    <span class="font-bold">Season:</span>
                    - spring
                  </li>
                  <li class="list-disc ml-8">
                    <span class="font-bold">Animal:</span>
                    - 🐅, 🐈
                  </li>
                </ul>

              <!-- Tools-->
              <h1 class="text-2xl font-normal leading-normal mt-8">Tools</h1>  
              <h1 class="text-lg font-normal leading-normal mt-2">Software:</h1>
              <ul>
                <li class="list-disc ml-8">
                  The web site 🌐 is hosted on
                  <a class="text-blue-600 font-medium hover:font-bold" href="https://contabo.com/">Contabo.com</a> and built with 
                  <a class="text-blue-600 font-medium hover:font-bold" href="https://www.typescriptlang.org/docs/">Typescript</a>,
                  and 
                  <a class="text-blue-600 font-medium hover:font-bold" href="https://spring.io">Spring-Boot && Java</a>,
                  and my own 
                  <a class="text-blue-600 font-medium hover:font-bold" href="https://github.com/meugenom/spa-mvc-router">SPA MVC Router</a>
                </li>
                <li class="list-disc ml-8">
                  <span class="font-bold">Coding 🛠:</span>
                  <a class="text-blue-600 font-medium hover:font-bold" href="https://code.visualstudio.com/">Visual Studio Code</a>
                </li>
                <li class="list-disc ml-8">
                  <span class="font-bold">Terminal ⌨️:</span>
                  <a class="text-blue-600 font-medium hover:font-bold" href="https://iterm2.com/">iTerm2</a>
                </li>
                <li class="list-disc ml-8">
                  <span class="font-bold">Notes 💾:</span>
                  <a class="text-blue-600 font-medium hover:font-bold" href="https://obsidian.md/">Obsidian</a>
                </li>
              </ul>
              <h1 class="text-lg font-normal leading-normal mt-2">Hardware</h1>
              <ul>
                <li class="list-disc ml-8">
                  <span class="font-bold">Coding PC 💻:</span>
                  MacBook Pro 14", 48GB RAM
                </li>
              </ul>            
              <h1 class="text-xl font-normal leading-normal mt-8 mb-2">Miscellaneous</h1>
              <ul>
                <li class="list-disc ml-8">
                  <a class="text-slate-600 font-medium hover:font-bold" href="">Resume(soon)</a>
                </li>                 
              </ul>
            </div>
          </div>
      `;
    return view;
  }
}

export default View;