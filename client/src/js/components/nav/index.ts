'use strict'
import Model from './model'
import View from './view'

/**
 * controller Navbar
 * @param model
 * @param view
 * @return html to view navbar
 */

class Navbar {
  model: Model;
  view: View;
  navbar: string;
  history: any;
  title: string;

  constructor() {
    this.model = new Model();
    this.view = new View();
    this.navbar = '';
    this.history = [];
    this.title = this.getTitle('Meugenom', 'white');
  }

  async render() {
    this.navbar = await this.view.appendNav();
    return this.navbar;
  }

  async afterRender() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    console.log('currentTheme:', currentTheme);
    
    this.applyTheme(currentTheme);

    document.getElementById('_title').innerHTML = this.title;

    themeToggleBtn.addEventListener('click', () => {
      this.toggleTheme();
    });

    // Add transition classes to the root element
    document.documentElement.classList.add('transition-colors', 'duration-1500');
  }

  getTitle(text: string, colorClass: string) {
    return `<title data-text="${text}" class="${colorClass}">${text}</title>`;
  }

  toggleTheme() {
    const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    this.applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.getElementById('_title').innerHTML = this.title;
  }

  applyTheme(theme: string) {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    this.title = this.getTitle('Meugenom', theme === 'dark' ? 'text-light-text' : 'text-dark-text');    

    // Sync utterances comments iframe theme
    const utterancesTheme = theme === 'dark' ? 'photon-dark' : 'github-light';
    const utterancesFrame = document.querySelector<HTMLIFrameElement>('.utterances-frame');
    if (utterancesFrame) {
      utterancesFrame.contentWindow?.postMessage(
        { type: 'set-theme', theme: utterancesTheme },
        'https://utteranc.es'
      );
    }
    
    // need timer to wait for the pre elements to be created
    setTimeout(() => {
      // Fix: Check if pre elements exist before trying to style them
      const preElements = document.getElementsByTagName("pre");      
      if (preElements.length > 0) {
      // Apply style to all pre elements
        for (let i = 0; i < preElements.length; i++) {          
          preElements[i].style.backgroundColor = theme === 'dark' ? '#18181b' : '#93c5fd';
          preElements[i].style.color = theme === 'dark' ? '#d1d5db' : '#1f2937';
        }
      }  
    // Fix: Check if code elements exist before trying to style them  
    const codeElements = document.getElementsByTagName("code");
    if (codeElements.length > 0) {
      // Apply style to all code elements
      for (let i = 0; i < codeElements.length; i++) {
        codeElements[i].style.backgroundColor = theme === 'dark' ? '#18181b' : '#f5f5f5';
        codeElements[i].style.color = theme === 'dark' ? '#d1d5db' : '#1f2937';
        }
      }
      // Fix: Check if a elements exist before trying to style them
      const quoteElements = document.getElementsByTagName("blockquote");
      console.log('quoteElements:', quoteElements);
      if (quoteElements.length > 0) {
        // Apply style to all a elements
        for (let i = 0; i < quoteElements.length; i++) {
          // get the div element inside the blockquote
          const divElement = quoteElements[i].getElementsByTagName("div");
          divElement[0].style.backgroundColor = theme === 'dark' ? '#18181b' : '#f5f5f5';
          divElement[0].style.color = theme === 'dark' ? '#d1d5db' : '#1f2937';
        }
      }   

    }, 500);    
  }
}

export default Navbar;