'use strict';

import LanguageConf from './Config.js';

let Language = {

	replaceLanguage : (node, language) => {
        
		let string = node.innerHTML;        
		string = string.replace(language, '');
                
		node.innerHTML = string;
		if(language !=''){
			node.dataset.language = language;                
		}else{
			node.dataset.language = '@all';             
		}
        
		return node;
	},  

	detectLanguage : (node) => {
        
		//by default is english    
		let language = '';  

		let string = node.outerHTML;
        
		let en = string.lastIndexOf(LanguageConf.english);     
		let de = string.lastIndexOf(LanguageConf.german);
		let ru = string.lastIndexOf(LanguageConf.russian);        
		let all = string.lastIndexOf(LanguageConf.multi);        

		if(en >= 0) language = LanguageConf.english;
		if(de >= 0) language = LanguageConf.german;
		if(ru >= 0) language = LanguageConf.russian;
		if(all >= 0) language = LanguageConf.multi;
        
		return language;
	}, 

	parseLang : (node) => { 
               
		let language = Language.detectLanguage(node);
		node = Language.replaceLanguage(node, language);                
		return node;
	}

}

export default Language;