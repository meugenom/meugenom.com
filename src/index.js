'use strict';
import Home         from './components/Home.js';
import About        from './components/About.js';
import Error500     from './components/Error500.js';
import Error404     from './components/Error404.js';
import Post         from './components/Post.js';

import Navbar       from './components/Navbar.js';
import Footer       from './components/Footer.js'; 
import Utils        from './services/Utils.js';
import ArticlesList from './components/ArticlesList.js';
import ProjectsList from './components/ProjectsList.js';

// Import PrismJS package
import Prism from 'prismjs';


/**
 * @constant 
 */

const routes = {
	'/'             : Home
	, '/about'      : About
	, '/post/:id'    : Post
	, '/articles'    : ArticlesList
	, '/projects'    : ProjectsList
	, '/error500'    : Error500
	, '/error404'    : Error404

};


/**
 * @param {
 * } type 
 */
const router =  async (type) => {	
	
	const header = null || document.getElementById('header');
	const content = null || document.getElementById('page');
	const footer = null || document.getElementById('footer');
    
	if(type != 'hashchange'){
		header.innerHTML = await Navbar.render();   
	}

	if(type != 'hashchange'){
		footer.innerHTML = await Footer.render();
	}
	
	let request = Utils.parseRequestURL();	  	    	
	let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '') 	
	//console.log(`parsedURL : ${parsedURL}`);	
	let page = routes[parsedURL] ? routes[parsedURL] : Error404;  


	content.innerHTML =  await page.render();
	await page.after_render();

	// Highlight all matching syntax
	await Prism.highlightAll();    

}


// Listen on hash change:
window.addEventListener('hashchange', function(e){
	router(e.type);
});


// Listen on page load:
window.addEventListener('load', router);
