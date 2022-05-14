'use strict'
/**
 * Returns an html element if line is code block
 * @param line as block of the text
 * @return dom element as code block
 */


import * as Token from "../Token";
import { DomUtilites } from "./DomUtilites";
import "../static/styles/prism.css"

// import prismjs
import * as Prism from 'prismjs';



export class CodeBlockHTML {
  
	private DomUtilites : any;
	private token: Token.codeBlockToken;
	
	constructor(token: Token.codeBlockToken) {
		this.token = token;
		this.DomUtilites = new DomUtilites();
	}

  render () : void {

	const codeBlock : any = `
			<code class="language-${this.token.language}">
		 		${this.token.code}
			</code>`
		
		const CodeBlockNode = this.DomUtilites.createElement("pre");
		CodeBlockNode.className = `language-${this.token.language}"` ;

		Prism.highlightAll(codeBlock);

		CodeBlockNode.innerHTML = codeBlock;

		let container:ChildNode;
		
		if(document.getElementById("article")?.children.length > 0){
			container = document.getElementById("article")?.lastChild;
		}else{
			container = document.getElementById("article");
		}
		
		container?.appendChild(CodeBlockNode);

		
  }

}
