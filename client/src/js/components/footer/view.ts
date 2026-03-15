'use strict'
import SocialLinksView from '../social-links/view';
/**
 * View for component BottomBar
 * @returns html to view bottom block
 */

class View {
  appendFooter () {
    const view = /* html */`
        <footer class="w-full border-t border-gray-300 relative fixed inset-x-0 bottom-0 z-10">
            <div class="container mx-auto">
            <div class="flex flex-row items-center justify-center py-4 gap-4">
                <div class="text-sm opacity-50">
                    meugenom 2026
                </div>
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