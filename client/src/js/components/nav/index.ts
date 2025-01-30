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
  }
}

export default Navbar;