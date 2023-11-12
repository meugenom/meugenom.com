'use strict'
import Model from './model'
import View from './view'

/**
 * controller Loader
 * @param model
 * @param view
 * @return html 
 */

class Loader {
    model: Model;
    view: View;

    constructor () {
        this.model = new Model()
        this.view = new View()        
    }

    async render () {
        const loader : any = document.createElement('div');
        loader.classList.add('loader');
        let loader_container : any = document.createElement('div');
        loader_container.classList.add('loader_container');
        loader_container.style.left = '50%';
        loader_container.style.top = '30%';
        loader_container.style.position = 'absolute';
        loader_container.appendChild(loader);

        //await this.view.appendLoader()
        
        return loader_container;
    }

    afterRender () { 
    }
}

export default Loader