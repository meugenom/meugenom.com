/**
 * Author: meugenom.com
 * Date: 19.03.2023
 * Refactored: 19.03.2023 
 */

import { Grammar } from "./Grammar"
import { captionToken, unmarkableToken } from "./Token";
import { TokenType } from "./Types";

export class Caption {

	public text: string;
	private token: captionToken;

	constructor(text: string) {
		this.text = text;
		this.token = {
			type: TokenType.CAPTION,
			date: "",
			title: "",
			template: "",
			thumbnail: "",
			slug: "",
			tags: "",
			cluster: "",
			order: ""
		}
	}

	public get(): any  {

		const match = this.text.match(Grammar.BLOCKS.CAPTION_PARAMETER);		

		if (match) {			

		this.token = {
			type: TokenType.CAPTION,
			date: match[1],
			title: match[2],
			template: match[3],
			thumbnail: match[4],
			slug: match[5],
			tags: match[6],
			cluster: match[7],
			order: match[8]
		};

		// Checking if all fields are present and correctly formatted
		
		if (!this.token.date.match(Grammar.BLOCKS.CAPTION_DATE)) this.token.date = "Invalid date format"; // Invalid date format, set to empty string
		if (!this.token.thumbnail.match(Grammar.BLOCKS.CAPTION_THUMBNAIL)) this.token.thumbnail = "Invalid thumbnail format"; // Invalid thumbnail format, set to empty string
		if (!this.token.slug.match(Grammar.BLOCKS.CAPTION_SLUG)) this.token.slug = "Invalid slug format"; // Invalid slug format, set to empty string
		if (!this.token.cluster.match(Grammar.BLOCKS.CAPTION_CLUSTER)) this.token.cluster = "Invalid cluster format"; // Invalid cluster format, set to empty string

		// Case format is correct but user can see error messages about incorrect fields
		this.text = this.text.replace(Grammar.BLOCKS.CAPTION_PARAMETER, ""); // Remove the caption block from the text
			
		
		console.log("Caption token:", this.token);		
		return this.token;

		} else {
			
		// Case is broken, return UNMARKABLE_BLOCK with error message about missing fields	
		this.text = this.text.replace(Grammar.BLOCKS.CAPTION, ""); // Remove the caption block from the text

			return {
				type: TokenType.UNMARKABLE,				
			} as unmarkableToken;
		
		}
	}

}