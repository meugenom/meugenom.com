'use strict'
/**
 * Returns an html element if line is code block
 * @param line as block of the text
 * @return dom element as code block
 */


import * as Token from "../Token";
import { DomUtilites } from "./DomUtilites";
import "../static/styles/quote.css";


export class QuoteHTML {

	private DomUtilites: any;
	private token: Token.quoteToken;
	private htmlOutput: HTMLElement;

	constructor(token: Token.quoteToken, htmlOutput: HTMLElement) {
		this.token = token;
		this.htmlOutput = htmlOutput;
		this.DomUtilites = new DomUtilites();
	}

	render(): void {

		if (this.token.quote) {			

			// if the text has strokes > 1
			const formattedQuote = this.token.quote.replace(/\n/g, '<br>');

			// Outer wrapper — drop shadows (same as code block)
			const OuterNode = this.DomUtilites.createElement("div");			
					
			// Body
			const BodyNode = this.DomUtilites.createElement("div");		
			BodyNode.innerHTML = `
				<p class="font-mono leading-3 text-slate-700 dark:text-slate-300 border-l-4 border-blue-400 pl-4">${formattedQuote}</p>				
			`;
						
			OuterNode.appendChild(BodyNode);

			const app = this.htmlOutput;
			const elemChildren = app?.children;
			if (elemChildren) {
				if (elemChildren.length > 0) {
					app?.lastChild?.appendChild(OuterNode);
				} else {
					app.appendChild(OuterNode);
				}
			}
		}
	}

}