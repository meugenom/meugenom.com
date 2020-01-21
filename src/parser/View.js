'use strict';
import Config from './Config.js';
import {Line} from './Line.js';
import Language from './Language.js';


export class View extends Line{
	constructor(){
		super();                
		this.Config = Config;       
	}   

	render(post){        

		let lines = this.splitString(post, Config.separator.newLine);        
		let article = document.querySelector('article');

		
		lines.forEach(line => {
            
			if(line.length != 0){
				let node = this.parse(line);                                

				if (node!= undefined){                    
					node  = Language.parseLang(node);                                                                                                             
					article.appendChild(node);
				}
                
			}                                                            
		})
        
	}
}

/*
export class View extends Line{
	constructor(){
		super();                
		this.Config = Config;       
	}   

	render(post){        

		let lines = this.splitString(post, Config.separator.newLine);        
		let article = document.querySelector('article');


		lines.forEach(line => {
            
			if(line.length != 0){
				let node = this.parse(line);                                

				if (node!= undefined){                    
					node  = Language.parseLang(node);                                                                                                             
					article.appendChild(node);
				}
                
			}                                                            
		})
        
	}
}
*/