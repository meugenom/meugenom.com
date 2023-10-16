'use strict'
import * as Token from "../Token";
import {DomUtilites} from './DomUtilites'


export class CaptionHTML {

	private DomUtilites : any;
	private token: Token.captionToken;

	constructor(token: Token.captionToken) {
		this.token = token;
		this.DomUtilites = new DomUtilites();
	}

	render():void{

		let tagsBlock  = "";
		this.token.children[0].tags.toString().split(" ").map( (tag: string) => {			
			if(tag.length >0){
				tagsBlock = tagsBlock + 
				'<a href="#/tag/' + tag + '" class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-slate-400  hover:bg-slate-500 uppercase last:mr-0 mr-1">'+
					tag + 
				"</a>" 
			}
		});

		let categoriesBlock  = "";
			if(this.token.children[0].categories.length > 0){
			categoriesBlock  = 
			'<a class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-indigo-400  hover:bg-indigo-500 uppercase last:mr-0 mr-1">'+
				this.token.children[0].categories +
			"</a>" 
			}

		const CaptionBlock =
			`
			<div class = "flex flex-col md:flex-row">
				<div class = "flex-none">
					<img src= ${this.token.children[0].thumbnail} 
					 class="float-left object-contain h-64 w-100 mx-2"/>
                </div>
				<div class="flex-auto justify-start">
					<h3 class="text-3xl font-normal leading-normal mt-0 mb-2 text-gray-600">
						${this.token.children[0].title.slice(2, this.token.children[0].title.length-1)}</h3>
					<time class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-blue-400 uppercase last:mr-0 mr-1">
                    	${this.token.children[0].date}
                    </time> 
                    <div class="tag-container py-1">
						${tagsBlock}
					</div>
					<div class="categories-container py-1">
						${categoriesBlock}
					</div>
				</div>

			</div>
			<hr/>
			<br/>
			<br/>`;

		const captionNode = this.DomUtilites.createElement('div')
		captionNode.innerHTML = CaptionBlock;

		const container = document.getElementById("article");
		container?.appendChild(captionNode);
	}
}