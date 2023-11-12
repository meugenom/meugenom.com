'use strict'

/**
 * View for component Navbar
 * @returns html to view navbar block
 */

class View {
  appendNav () {
  
    const view = /* html */
        `            
        <div>
            <nav class="relative flex flex-wrap items-center justify-between px-2 py-3 mb-2 ml-10">
                
                <div class="container px-4 mx-auto flex flex-wrap items-center justify-between mb-2 ml-2 hidden sm:flex">
                    <div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    
                        <a href="https://meugenom.com" class="flex items-center">
                            <img src="../../images/brain_gray.svg" alt="face-splash" class="mr-3 h-6 sm:h-9">
                                <!--
                                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">                                
                                    <span class="text-slate-600">meugenom.com</span>
                                </span>
                                -->
                                <title data-text="Meugenom">Meugenom</title>
                                
                        </a>
                    </div>
                </div>
                
                <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">                
                    <ul id="navbarLinks" class="flex lg:flex-row list-none lg:ml">
                    
                        <li class="nav-item">
                            <a 
                                id="nav-home" 
                                navigateLinkTo="/"
                                class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-slate-500 opacity-75 cursor-pointer">
                                Home
                            </a>
                        </li>
                        <li class="nav-item">
                        
                            <a id="nav-about" 
                                navigateLinkTo="/about"                             
                                class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-slate-500 opacity-75 cursor-pointer">
                                About
                            </a>

                        </li>
                        <li class="nav-item">
                            <a 
                                id="nav-articles"                             
                                navigateLinkTo="/articles"                            
                                class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-slate-500 opacity-75 cursor-pointer">
                                Blog
                            </a>
                        </li>
                        <li class="nav-item">
                            <a 
                                id="nav-projects" 
                                navigateLinkTo="/projects"                            
                                class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-slate-500 opacity-75 cursor-pointer">
                                Projects
                            </a>
                        </li>
                        <li class="nav-item hidden sm:flex">
                            <a 
                                id="nav-illustration" 
                                navigateLinkTo="/illustration"                             
                                class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-slate-500 opacity-75 cursor-pointer">
                                Illustration
                            </a>
                        </li>                        
                        <li class="nav-item hidden sm:flex">
                            <a 
                                href="https://github.com/meugenom"
                                class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-slate-500 opacity-75">
                                Github
                            </a>
                        </li>                
                    </ul>
                </div>        
            </nav>
        </div>
        `
        
    return view
  }
}

export default View