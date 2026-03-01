'use strict'

/**
 * View for component About
 * @returns html to view about block
 */

class View {
  async appendAbout() {
    const view = /* html */`
      <div class="flex text-md">
        <div class="w-full p-8 font-mono">
          <div class="py-2 px-2 w-full max-w-[160px] float-right ml-4 mb-4 bg-white shadow-lg">
            <img class="lazy" width="160" height="120" object-cover" data-src="/images/foto_me.jpg" alt="Eugen"/>              
          </div>  

          <div class="pt-6 pb-4 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
            <p class="text-[11px] font-bold uppercase tracking-widest opacity-50">Über das Projekt</p>
          </div>

          <div class="space-y-4 mt-6">
              <p>
                Hey, ich bin <strong>Eugen</strong>.
              </p>
              <p>
                Diese Website ist mehr als nur ein Blog — sie ist ein technisches Manifest für <strong>Handmade Software</strong>.                 
              </p>
              <p>
                Das gesamte Frontend wurde mit reinem <strong>TypeScript</strong> ohne externe UI-Librarys geschrieben. 
                Die Architektur basiert auf einem von mir entwickelten 
                <a class="text-blue-600 font-medium hover:font-bold" href="https://github.com/meugenom/spa-mvc-router">
                 SPA MVC Router
                </a>, der blitzschnelle Übergänge ermöglicht.
              </p>              
          </div>

          <h1 class="text-xl font-normal leading-normal mt-8 mb-2">
            Technische Philosophie
          </h1>
          <ul class="space-y-2">
            <li class="list-disc ml-8">
              <span class="font-bold">DIY-Architektur:</span> Keine Abhängigkeit von React/Vue. Volle Kontrolle über das DOM und den State.
            </li>
            <li class="list-disc ml-8">
              <span class="font-bold">Performance:</span> Datenspeicherung in Redis für Antwortzeiten im Millisekundenbereich.
            </li>
            <li class="list-disc ml-8">
              <span class="font-bold">Minimalismus:</span> Clean Code und TailwindCSS für ein modernes, schlankes Design ohne Overhead.
            </li>
          </ul>
        
          <h1 class="text-xl font-normal leading-normal mt-8"> 
            Der Tech-Stack 
          </h1>
            <ul class="space-y-2">
              <li class="list-disc ml-8">
                <span class="font-bold">Backend:</span> Java, Spring Boot & Spring Data, GraphQL
              </li>
              <li class="list-disc ml-8">
                <span class="font-bold">Datenbank:</span> Redis (Key-Value Storage)
              </li>
              <li class="list-disc ml-8">
                <span class="font-bold">Frontend:</span> TypeScript, Webpack, PostCSS
              </li>
              <li class="list-disc ml-8">
                <span class="font-bold">Deployment:</span> VPS, Nginx, Jenkins (CI/CD Pipeline)
              </li>
            </ul>
          
          
          <h1 class="text-lg font-normal leading-normal mt-8">Software:</h1>
          <ul>
            <li class="list-disc ml-8">
              <span class="font-bold">Editor:</span> VSCode (mit Vim-Binding)
            </li>
            <li class="list-disc ml-8">
              <span class="font-bold">Terminal:</span> iTerm2 & OhMyZsh
            </li>
            <li class="list-disc ml-8">
              <span class="font-bold">Knowledge:</span> Obsidian für technisches Second Brain
            </li>
          </ul>

          <h1 class="text-lg font-normal leading-normal mt-8 mb-2">Hardware:</h1>
          <ul>
            <li class="list-disc ml-8">
              MacBook Pro 14" (als Workstation)
            </li>
          </ul>            

          <h1 class="text-xl font-normal leading-normal mt-8 mb-2">
            Status
          </h1>
          <ul>
            <li class="list-disc ml-8 italic opacity-60">
              Ständig in Entwicklung...
            </li>                 
          </ul>
        </div>
      </div>
    `;
    return view;
  }
}

export default View;