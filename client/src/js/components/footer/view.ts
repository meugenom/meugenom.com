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
            class=" relative                    
                    from-slate-50 
                    to-slate-150 
                    border-slate-150 
                    shadow-lg 
                    shadow-slate-100/10				
                    dark:bg-gray-800 
                    fixed inset-x-0 							                    
                    bottom-0
                    z-10                    
                    ">
            <div class="flex justify-center">
                <div class="text-sm text-slate-600 align-middle text-center pt-5">
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