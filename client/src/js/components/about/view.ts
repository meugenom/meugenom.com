'use strict'
import Config from '../../config';

/**
 * View for component About
 * @returns html to view about block
 */

class View {
  async appendAbout() {
    document.title = `${Config.siteName} | About`;
    const view = /* html */`
      <div class="container mx-auto px-4 sm:px-8 font-sans text-base antialiased leading-7 z-0">
        <!-- Container for rendered Markdown -->
        <article id="about-article" class="px-5 markdown-content-wraper">
        </article>
      </div>
    `;
    return view;
  }
}

export default View;