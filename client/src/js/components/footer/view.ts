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
            class=" container mx-auto border-t border-gray-300
                    relative                                                            
                    fixed inset-x-0 							                    
                    bottom-0
                    z-10                    
                    ">
            <div class="flex justify-center">
                <div class="text-sm align-middle text-center pt-5">
                    meugenom 2025 &nbsp;
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