'use strict'
import SocialLinksView from '../social-links/view';
/**
 * View for component BottomBar
 * @returns html to view bottom block
 */

class View {
  appendFooter () {
    const view = /* html */`
        <footer
            class="
                    bg-gradient-to-r from-slate-400 to-slate-200 border-gray-600 
                    shadow-lg 
                    shadow-slate-500/10 							
                    dark:bg-gray-800 							
                    fixed inset-x-0 
                    bottom-0 
                    z-10">
            <div class="flex justify-center">
                <div class="text-sm text-gray-100 dark:text-gray-400 align-middle text-center pt-5">
                    © 2023 &nbsp;
                </div>
                <div class="flex justify-center mt-0">
                    <div class="social-buttons">`
                    +                    
                    // Social links as nested component
                    new SocialLinksView().appendSocialLinks()        
                    +
                    `
                    </div>
                </div>
            </div>
        </footer>
        `
    return view
  }
}

export default View