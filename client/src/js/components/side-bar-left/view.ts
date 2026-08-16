'use strict'

export interface TocHeading {
  level: number;
  text: string;
  id: string;
}

/**
 * View for component SideBarLeft
 * @param posts
 * @returns html view for home page
 */

class View {

  renderToc(headings: TocHeading[]): string {
    let items = '';
    headings.forEach(h => {
      const indent = (h.level - 1) * 12;

      //let itemClass = 'toc-link block cursor-pointer font-mono leading-snug transition-colors duration-150 hover:text-blue-500';
      let itemClass = 'toc-link block cursor-pointer font-sans leading-snug transition-colors duration-150 hover:text-blue-500';
      if (h.level === 1) {
        itemClass += ' text-[15px] font-semibold py-1';
      } else if (h.level === 2) {
        itemClass += ' text-[14px] font-medium py-0.5 opacity-90';
      } else {
        itemClass += ' text-[13px] font-normal py-0.5 opacity-70';
      }

      items += `
        <li style="padding-left: ${indent}px">
          <a 
             href="#${h.id}"
             data-tocid="${h.id}"
             class="${itemClass}"
             title="${h.text}">
            ${h.level >= 2 ? '<span class="mr-1 opacity-40">›</span>' : ''}${h.text}
          </a>
        </li>`;
    });

    return /* html */`
      <div class="hidden lg:flex lg:flex-col w-full sidebar sticky top-0 h-screen overflow-hidden">
        <div class="pt-6 pb-4 px-4 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
          <p class="text-[11px] font-mono font-bold uppercase tracking-widest opacity-50 text-right">On this page</p>
        </div>
        <nav class="flex-1 overflow-y-auto overflow-x-hidden px-4 py-3 scrollbar-thin">
          <ul class="space-y-0">
            ${items}
          </ul>
        </nav>
      </div>
    `;
  }

}

export default View