'use strict'
import Model from './model'
import View from './view'
import Config from '../../config';

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
    this.title = this.getTitle(Config.siteName, 'white');
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

    // Search input: trigger on Space key, min 3 chars, only safe chars
    const searchInput = document.getElementById('nav-search') as HTMLInputElement;
    if (searchInput) {
      searchInput.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === ' ' || e.code === 'Space' || e.key === 'Enter') {
          e.preventDefault();
          const rawTerm = searchInput.value.trim();
          // Validate: min 3 chars, only letters/digits/spaces/hyphens — no garbage
          if (rawTerm.length < 3) return;
          if (!/^[a-zA-Z0-9\s\-]{3,50}$/.test(rawTerm)) return;
          searchInput.value = '';
          const encoded = encodeURIComponent(rawTerm);
          window.history.pushState({}, 'search', window.location.origin + '/search/' + encoded);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      });
    }

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
    this.title = this.getTitle(Config.siteName, theme === 'dark' ? 'text-light-text' : 'text-dark-text');   

    // Icons dynamic: Moon or Sun based on theme
    const themeIcon = document.querySelector('#theme-toggle i');
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.className = 'bi bi-brightness-high-fill';
      } else {
        themeIcon.className = 'bi bi-moon-fill';
      }
    }        
  }
}

export default Navbar;