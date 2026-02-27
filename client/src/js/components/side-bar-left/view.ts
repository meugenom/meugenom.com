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

      let itemClass = 'toc-link block cursor-pointer font-mono leading-snug transition-colors duration-150 hover:text-blue-500';
      if (h.level === 1) {
        itemClass += ' text-[15px] font-semibold py-1';
      } else if (h.level === 2) {
        itemClass += ' text-[14px] font-medium py-0.5 opacity-90';
      } else {
        itemClass += ' text-[13px] font-normal py-0.5 opacity-70';
      }

      items += `
        <li style="padding-left: ${indent}px">
          <a data-tocid="${h.id}"
             class="${itemClass}"
             title="${h.text}">
            ${h.level >= 2 ? '<span class="mr-1 opacity-40">›</span>' : ''}${h.text}
          </a>
        </li>`;
    });

    return /* html */`
      <div class="hidden lg:flex lg:flex-col w-full sm:w-1/6 min-w-[220px] max-w-[260px] sidebar sticky top-0 h-screen overflow-hidden">
        <div class="pt-6 pb-4 px-4 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
          <p class="text-[11px] font-bold uppercase tracking-widest opacity-50">On this page</p>
        </div>
        <nav class="flex-1 overflow-y-auto overflow-x-hidden px-4 py-3 scrollbar-thin">
          <ul class="space-y-0">
            ${items}
          </ul>
        </nav>
      </div>
    `;
  }

  async appendSideBarLeft () {
    
    const view = await /* html */`    
          <!-- Left Sidebar (hidden on small screens) -->
          <div class="hidden lg:block w-full sm:w-1/6 min-w-[300px] max-w-[300px] sidebar">
            <div class="mx-5 font-sans text-base antialiased leading-7 z-0">
            
            <aside class="w-64 p-6 flex flex-col items-center">
              
              <img src="../../images/ai-generated.png" alt="Profile Picture" class="w-24 h-24 rounded-full mb-4 border-2 border-gray-300"/>
              
              <h2 class="text-xl">About Me</h2>

              <p class="text-center mt-2">
                Hey there! I'm Eugen, an open-source creator and software engineer. 
                This is my little corner of the web 🚀. 
              </p>
              <p class="text-center mt-2">
                Glad to have you here!
              </p>
              <hr class="w-full border-t-1 border-gray-200 my-4">
              <p>
                Contact me 📧:                
              </p>              
              <p>
                <span class="text-blue-500 hover:font-bold">hallo</span> at <span class="text-blue-500 hover:font-bold">meugenom.com</span>
              </p>

              <hr class="w-full border-t-1 border-gray-200 my-4">

              <p class="text-center mt-4">Like what I do? You can show your support by treating me to a
                <a href="https://www.buymeacoffee.com/meugenom" target="_blank" class="text-blue-500 hover:font-bold">cup of coffee ☕💙</a>
              </p>
            </aside>  
            
            </div>
          </div>
    ` 
    return view
  }

}

export default View


/**
 * <aside class="w-64 bg-white shadow-lg p-6 flex flex-col items-center">
      
      <img src="https://via.placeholder.com/100" alt="Profile Picture" class="w-24 h-24 rounded-full mb-4 border-4 border-gray-300">
      <h2 class="text-xl font-semibold">About Me</h2>
      <p class="text-gray-600 text-center mt-2">AI sees me this way. My name is Eugen. I'm an open-source creator and software engineer.
        Welcome to my little space on the web 🌍✨</p>

      <p class="text-gray-600 text-center mt-4">If you enjoy my work, feel free to support me with a cup of coffee ☕💙</p>

  
      <div class="mt-4 space-y-2">
        <h3 class="text-lg font-medium text-gray-700">Let's Connect:</h3>
        <a href="#" class="flex items-center p-2 bg-gray-200 hover:bg-gray-300 rounded-lg">
          <img src="https://www.svgrepo.com/show/533296/mail.svg" class="w-5 h-5 mr-2" alt="Mail"> Send me an Email
        </a>
        <a href="#" class="flex items-center p-2 bg-gray-200 hover:bg-gray-300 rounded-lg">
          <img src="https://www.svgrepo.com/show/157817/github.svg" class="w-5 h-5 mr-2" alt="GitHub"> Check out my GitHub
        </a>
        <a href="#" class="flex items-center p-2 bg-gray-200 hover:bg-gray-300 rounded-lg">
          <img src="https://www.svgrepo.com/show/183608/linkedin.svg" class="w-5 h-5 mr-2" alt="LinkedIn"> Connect on LinkedIn
        </a>
      </div>
      
      <div class="flex-1 p-6">
        <h2 class="text-3xl font-bold">Welcome to my space! 🚀</h2>
        <p class="mt-4 text-gray-700">Feel free to explore and see what I've been up to. Hope you enjoy your visit!</p>
        </div>
    </aside>
 */