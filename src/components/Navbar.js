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
              eugenemdev(under construction)</a>              
            </div>            
            <div class="links">                            
              <a href="#/articles">Articles</a>
              <a href="#/projects">Projects</a>
              <a href="#/about">About</a>
              <a aria-current="page" class="active" href="#/contact">Contact</a>                                          
            </div>
          </div>
        </nav>`;
    }
}