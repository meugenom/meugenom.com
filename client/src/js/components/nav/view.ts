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
            <nav class="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gradient-to-r from-slate-400 border-slate-600 shadow-md shadow-slate-500/10 mb-3">
                <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    <a href="https://meugenom.com" class="flex items-center">
                        <img src="../../images/brain_gray.svg" alt="face-splash" class="mr-3 h-6 sm:h-9">
                            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">                                
                                <span class="text-slate-600">meugenom.com</span>
                            </span>
                    </a>
                    <button id="navbarButton" type="button" data-collapse-toggle="mobile-menu-3" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-3" aria-expanded="false">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                        </svg>
                        <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
                <div class="lg:flex flex-grow items-center hidden" id="example-navbar-danger">
                    <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
                    <li class="nav-item">
                        <a id="nav-home" href="/" class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-slate-500 opacity-50 hover:opacity-100 hover:underline">
                            Home
                        </a>
                    </li>
                    <li class="nav-item">
                        <a id="nav-articles" href="/articles" class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-slate-500 opacity-50 hover:opacity-100 hover:underline">
                            Blog
                        </a>
                    </li>
                    <li class="nav-item">
                        <a id="nav-projects" href="/projects" class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-slate-500 opacity-50 hover:opacity-100 hover:underline">
                            Projects
                        </a>
                    </li>
                    <li class="nav-item">
                        <a id="nav-illustrations" href="/illustrations" class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-slate-500 opacity-50 hover:opacity-100 hover:underline">
                            Illustrations
                        </a>
                    </li>
                    <li class="nav-item">
                        <a id="nav-about" href="/about" class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-slate-500 opacity-50 hover:opacity-100 hover:underline">
                            About
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="https://github.com/meugenom" class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-slate-500 opacity-50 hover:opacity-100 hover:underline">
                            Github
                        </a>
                    </li>                
                </ul>
            </div>
        </div>
    </nav>
    </div>
        `
    return view
  }
}

export default View