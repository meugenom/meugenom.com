'use strict';

export default class Navbar {
    static render(){      
      return /*html*/`
        <nav class="nav">
          <div class="nav-container">
            <div class="brand">
            <a href="/"><img 
              src="./images/brain.svg" 
              alt="brain-idea"
              class="favicon"/>
              eugenem.dev</a>              
            </div>            
            <div class="links">                            
              <a href="#/articles">Articles</a>
              <a href="#/projects">Projects</a>
              <a href="#/about">About</a>                                                      
            </div>
          </div>
        </nav>`;
    }
}