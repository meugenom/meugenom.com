'use strict'

/**
 * View for component Navbar
 * @returns html to view navbar block
 */

class View {
    appendNav() {

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
                                
                                <span id="_title"></span>                                
                        </a>
                    </div>                    
                </div>
                
                <div class="container px-4 flex items-center justify-between">                
                    
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
                        <!--                        
                        <li class="nav-item hidden sm:flex">
                            <a 
                                id="nav-illustration" 
                                navigateLinkTo="/illustration"                             
                                class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-slate-500 opacity-75 cursor-pointer">
                                Illustration
                            </a>
                        </li>                        
                        -->
                        <li class="nav-item hidden sm:flex ml-2 -mt-3.5 lg:-mt-3.5 lg:ml-0">
                            <!--
                            <a 
                                href="https://github.com/meugenom"
                                class="px-3 py-2 items-center text-xs uppercase font-bold leading-snug text-slate-500 opacity-75">
                                Github
                            </a>
                            -->
                            <a  href="https://github.com/meugenom"
                                class="sl_container github_no_touch">
                                <div class="sl_circle">
                                    <svg  preserveAspectRatio="xMinYMin meet" viewBox="0 0 200 200">
						                <circle cx="100" cy="100" r="50"/>
						            </svg>
                                    <div class="sl_social">
                                        <i class="bi bi-github"></i>
                                    </div>
                                </div>						        						        						        
					        </a>
                        </li>                        
                        <li class="nav-item sm:flex ml-2 -mt-3.5 lg:-mt-3.5 lg:ml-0">
                            <a  id="theme-toggle" class="sl_container eye_no_touch">
                                <div class="sl_circle">
                                    <svg  preserveAspectRatio="xMinYMin meet" viewBox="0 0 200 200">
						                <circle cx="100" cy="100" r="50"/>
						            </svg>
                                    <div class="sl_social">
                                        <i class="bi bi-eye-fill"></i>
                                    </div>
                                </div>						        						        						        
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