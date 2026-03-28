'use strict'

/**
 * Returns an html element <h>
 * @param line as block of the text
 * @return dom element for headType <h?/> for example <h?> ...<h?>
 */

import * as Token from "../Token";
import { TokenType } from "../Types";

export class HeaderHTML {

	private token: Token.headToken;
	private htmlOutput: HTMLElement;
	private dept: number;

	constructor(token: Token.headToken, htmlOutput: HTMLElement) {
		this.token = token;
		this.htmlOutput = htmlOutput;
		this.dept = 0;
	}

	renderAsElement(): HTMLElement {

		// Need to know what the dept is to determine the heading level (h1, h2, etc.)
		switch (this.token.type) {
			case TokenType.HEADING_FIRST:
				this.dept = 1;
				break;
			case TokenType.HEADING_SECOND:
				this.dept = 2;
				break;
			case TokenType.HEADING_THIRD:
				this.dept = 3;
				break;
			case TokenType.HEADING_FORTH:
				this.dept = 4;
				break;
			case TokenType.HEADING_FIFTH:
				this.dept = 5;
				break;
			default:
				this.dept = 6; // Default to h6 if type is unrecognized
		}

		const HeaderNode = document.createElement('h' + this.dept)

		// h1→h6: one step smaller than browser defaults for compact article layout
		const sizeMap: string[] = ['text-2xl', 'text-xl', 'text-lg', 'text-base', 'text-sm', 'text-xs'];
		const sizeClass = sizeMap[(this.dept - 1)] ?? 'text-base';
		HeaderNode.className = `${sizeClass} font-sans font-bold mt-0 mb-3 pr-10 pt-6`;

		

		const headingText: string = this.token.value || this.token.value || '';
		
		// Generate anchor id: lowercase, spaces → dashes, strip non-alphanumeric
		const headingId = headingText.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
		HeaderNode.setAttribute('id', headingId);
		HeaderNode.innerHTML = headingText;

		const app = this.htmlOutput;
		const elemChildren = app?.children

		if (elemChildren) {
			if (elemChildren.length > 0) {
				app?.lastElementChild?.appendChild(HeaderNode);
			} else {
				app.appendChild(HeaderNode);
			}
		}

		return HeaderNode;
	}
}