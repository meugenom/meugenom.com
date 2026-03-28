'use strict'
import { Grammar } from "./Grammar"
import { Caption } from "./Caption"
import * as Token from "./Token";
import { TokenType } from "./Types";
import { ASTNode } from "./interfaces/astNode";


export class Tokenizer {

	public tokens = [] as ( Token.bagdeToken
		| Token.captionToken
		| Token.codeBlockToken
		| Token.codeInlineToken
		| Token.colorTextToken
		| Token.headToken
		| Token.imageToken
		| Token.linkToken
		| Token.listToken
		| Token.paragraphEndToken
		| Token.paragraphStartToken
		| Token.quoteToken
		| Token.strongTextToken
		| Token.textToken
		| Token.underLineToken
		| Token.unknownTextToken
		| Token.codeInCodeToken
		| Token.unmarkableToken
		| Token.tableToken
		| Token.formulaBlockToken
		| Token.formulaInlineToken
		| Token.paragraphTextToken
	)[];

	private ast : ASTNode = {
		type: "Root",
		token: null,
		raw:  "",			
		children: []
	};
	


	private text: string;
	private tokensMap: Map<string, any>;

	constructor(text: string) {

		this.text = text;

		this.tokens = [];		
		this.tokensMap = new Map();
		
		// first going through text and finding all block level tokens and removing them from text and adding to ast
		this.putRootChildren();

		// second recursively find inline tokens in the remaining text and replace them with token placeholders and add to ast		
		this.ast.children.forEach(node => this.putInlineChildren(node)); // start from root's children
	}

	getAST() {
		return this.ast;
	}

	putRootChildren() {
		
		//this.init();

		while (this.text.length > 0) {
			
			let match: RegExpMatchArray | null = null;

			// if text is empty, break			
			if (this.text.length === 0) break;

			// remove leading whitespace
			const whitespace = this.text.match(/^\s+/);
    		if (whitespace) {
        		this.text = this.text.slice(whitespace[0].length);
        		if (this.text.length === 0) break; 
    		}


			// find CAPTION
			if (this.text.match(Grammar.BLOCKS.CAPTION) != null) {
				const caption = new Caption(this.text);			
				let token = {} as Token.captionToken;
				token = caption.get();			
			
				// caption.get removed caption and return other text
				this.text = caption.text;				

				//add to the astNode		
				this.ast.children.push({
					type: TokenType.CAPTION,
					token: token,
    				raw: "",  
    				children: []
				})				
						
        		continue;
			
			}

    		// find unmarkable blocks
			match = this.text.match(Grammar.BLOCKS.UNMARKABLE_BLOCK);
			if (match) {				
									
				const unmarkableToken = {} as Token.unmarkableToken;
				unmarkableToken.type = TokenType.UNMARKABLE;
				unmarkableToken.value = match[1];				

				//add to the astNode		
				this.ast.children.push({
					type: TokenType.UNMARKABLE,
					token: unmarkableToken,
    				raw: match[0],
    				children: []
					});

				// remove unmarkable block from text
				this.text = this.text.slice(match[0].length);								
				continue;				
			}
				

			

			// find code in code blocks
			match = this.text.match(Grammar.BLOCKS.CODE_IN_CODE);
			if (match) {
				

					const languageMatchResult = match[0].match(Grammar.BLOCKS.INLINE_CODE);
					const bodyMatchResult = match[0].match(Grammar.BLOCKS.INLINE_CODE);

					if (languageMatchResult && bodyMatchResult) {

						const language = languageMatchResult[0];
						const body = bodyMatchResult[1] ?? ''; // Add nullish coalescing operator to assign a non-null value to 'body'

					
						const codeToken = {} as Token.codeInCodeToken;
						codeToken.type = TokenType.CODE_IN_CODE;
						codeToken.code = body; 
						codeToken.language = language as string;				 

						//add to the astNode		
						this.ast.children.push ({
							type: TokenType.CODE_IN_CODE,
							token: codeToken,
    						raw: body,
    						children: [],					
						})
						// remove code in code block from text
						this.text = this.text.slice(body.length);
						

					}
				
				continue;	
			}

			// find formula blocks
			match = this.text.match(Grammar.BLOCKS.FORMULA_BLOCK);
			if(match) {				

					const inner = match[0].slice(2, match[0].length - 2).trim();
					const token = {} as Token.formulaBlockToken;
					token.type = TokenType.FORMULA_BLOCK;
					token.formula = inner; 
			
					//add to the astNode		
					this.ast.children.push({
						type: TokenType.FORMULA_BLOCK,
						token: token,
    					raw: match[0],
    					children: []
					});
			
					
					// remove formula block from text
					this.text = this.text.slice(match[0].length);
				
				continue;
			}


			// find code blocks
			match = this.text.match(Grammar.BLOCKS.CODE_BLOCK);
				if (match) {					
						const languageMatchResult = match[0].match(Grammar.BLOCKS.CODE_BLOCK_LANG);
						const bodyMatchResult = match[0].match(Grammar.BLOCKS.CODE_BLOCK_BODY);

						if (bodyMatchResult) {
							const language = languageMatchResult ? languageMatchResult[0].trim() : '';
							const body = bodyMatchResult[0];
							const codeToken = {} as Token.codeBlockToken;
							codeToken.type = TokenType.CODE_BLOCK;
							codeToken.code = body as string;
							codeToken.language = language as string;

							//add to the astNode		
							let node : ASTNode = {
								type: TokenType.CODE_BLOCK,
								token: codeToken,
    							raw: body,  
    							children: []
							}
			
							this.ast.children.push(node);
							// remove code block from text
							this.text = this.text.slice(body.length);

						}
					
				continue;
			}


			// find headings
			match = this.text.match(Grammar.BLOCKS.HEADING);
			if (match) {

				const levelMatchResult = match[0].match(Grammar.BLOCKS.HEADING_LEVEL);

				if (levelMatchResult) {
					const level = levelMatchResult[0];
					//find body from heading where satrt is level + 1 and end is \n
					//private case
					if(!level || level.length > match[0].length){
						return;
					}
					const body = match[0].slice(level.length + 1, match[0].length);

					const types : any = [
						TokenType.HEADING_FIRST,
						TokenType.HEADING_SECOND,
						TokenType.HEADING_THIRD,
						TokenType.HEADING_FORTH,
						TokenType.HEADING_FIFTH
					]
					
					//private case
					if (!level || level.length > types.length) {
						return;
					}
					
					const itype: number = level.length - 1;

					const headToken = {} as Token.headToken;
					headToken.type = types[itype];
					headToken.value = body;

				    //add to the astNode		
					this.ast.children.push({
						type: headToken.type,
						token: headToken,
    					raw: headToken.value,  
    					children: []
					});

					// remove heading from text
					this.text = this.text.slice(match[0].length);

				}
				continue;
			}

			// find images			
			match = this.text.match(Grammar.BLOCKS.IMAGE);
			if (match) {
				
				const altMatchResult = match[0].match(Grammar.BLOCKS.IMAGE_NAME);
				const urlMatchResult = match[0].match(Grammar.BLOCKS.IMAGE_URL);

				if(altMatchResult && urlMatchResult && altMatchResult[0] && urlMatchResult[0]){
					const alt = altMatchResult[0].substring(2, altMatchResult[0].length - 1);
					const url = urlMatchResult[0].substring(1, urlMatchResult[0].length - 1);

					const imageToken = {} as Token.imageToken;
					imageToken.type = TokenType.IMAGE;
					imageToken.alt = alt;
					imageToken.url = url;

					//add to the astNode
					this.ast.children.push({
						type: TokenType.IMAGE,
						token: imageToken,
						raw: match[0],  
						children: []
					});
					
					// remove image from text
					this.text = this.text.slice(match[0].length);
				}
				
				continue;
			}


			// find lists
			match = this.text.match(Grammar.BLOCKS.LIST);
			if (match) {
				
				const body = match[1];
				const listToken = {} as Token.listToken;
				listToken.type = TokenType.LIST;				
				listToken.value = body;
				listToken.tokensMap = this.tokensMap;

				//add to the astNode
				this.ast.children.push({
					type: TokenType.LIST,
					token: listToken,
					raw: body,  
					children: []
				});
				
				// remove list from text
				this.text = this.text.slice(match[0].length);								
				continue;
			}

		
			// find quotes
			match = this.text.match(Grammar.BLOCKS.QUOTE);				
			if(match) {								
	
				const quoteToken = {} as Token.quoteToken;
				quoteToken.type = TokenType.QUOTE;

				const cleanContent = match[0]
        			.split("\n")
        			.map(line => line.replace(/^>\s?/, "")) // REmove leading '>' and optional space from each line
        			.join("\n")
        			.trim();

				quoteToken.quote = cleanContent;						


				//add to the astNode
				this.ast.children.push({
					type: TokenType.QUOTE,
					token: quoteToken,
					raw: match[0],  
					children: []
					});
						
					// remove quote from text
					this.text = this.text.slice(match[0].length);
						
				continue;
			}

			
			// find tables
			match = this.text.match(Grammar.BLOCKS.TABLE);
			if(match) {
				

					const tableToken = {} as Token.tableToken;
					tableToken.type = TokenType.TABLE;
					tableToken.row = match[0];
					tableToken.children = [] as Token.tableRowToken[];
					tableToken.tokensMap = this.tokensMap;

					//add children
					const rows = match[0].split("\n");
					rows.forEach((row: string) => {
						const rowToken = {} as Token.tableRowToken;
						rowToken.type = TokenType.TABLE_ROW;
						rowToken.value = row;
						tableToken.children.push(rowToken);
					});

					//add to the astNode
					this.ast.children.push({
						type: TokenType.TABLE,
						token: tableToken,
						raw: match[0],  
						children: []
					});
					
					// remove table from text
					this.text = this.text.slice(match[0].length);
				
				continue;
			}


			// ANY OTHER UNKNOWN BLOCK - FALL BACK TO TEXT
			const nextNewline = this.text.indexOf('\n');
            const end = nextNewline === -1 ? this.text.length : nextNewline + 1;
            const chunk = this.text.slice(0, end);

            const lastNode = this.ast.children[this.ast.children.length - 1];
            if (lastNode && lastNode.type === "Paragraph") {
                lastNode.raw += chunk;
                if (lastNode.token) lastNode.token.value += chunk;
            } else {

                //add to the astNode
					this.ast.children.push({
						type: TokenType.PARAGRAPH,						
						raw: chunk,  
						children: []
					});
            }

            this.text = this.text.slice(end);		

		} // end of while loop	

}


	putInlineChildren(node: ASTNode) {
  		// 1. Test current node for inline tokens and replace them with token placeholders and add to ast
  		//console.log(`Checking node: ${node.type}`);
  
  		// Logic to find inline tokens in node.raw and replace them with token placeholders and add to ast
  		if (node.type === TokenType.QUOTE || node.type === TokenType.LIST || node.type === TokenType.TABLE || node.type === TokenType.PARAGRAPH) {
    					
			console.log(`Checking node: ${node.type}`);

			
			while (node.raw.length > 0) {
			
			let match: RegExpMatchArray | null = null;

			// if text is empty, break			
			if (node.raw.length === 0) break;

			// remove leading whitespace
			const whitespace = node.raw.match(/^\s+/);
    		if (whitespace) {
        		node.raw = node.raw.slice(whitespace[0].length);
        		if (node.raw.length === 0) break; 
    		}



			// hier logic to find inline tokens in node.raw and replace them with token placeholders and add to ast

			// find strong text
			match = node.raw.match(Grammar.BLOCKS.STRONG_TEXT);
			if (match) {			
									
					const strongToken = {} as Token.strongTextToken;
					strongToken.type = TokenType.STRONG;
					strongToken.value = match[1];


					//add to the astNode		
					node.children.push({
						type: TokenType.STRONG,
						token: strongToken,
    					raw: match[0],  
    					children: []
					});
			
					// remove strong text from node.raw
					node.raw = node.raw.slice(match[0].length);					
				
				continue;
			}


			
			// find links
			match = node.raw.match(Grammar.BLOCKS.LINK);
			if (match) {
    			const fullMatch = match[0];
    			const linkName = match[1];
    			const linkUrl = match[2];

    			console.log(`Found link: ${fullMatch}`);

    			// create link token
    			const linkToken: Token.linkToken = {
        			type: TokenType.LINK,
        			name: linkName,
        			url: linkUrl
    			};

    			// add to AST
    			node.children.push({
        			type: TokenType.LINK,
        			token: linkToken,
        			raw: fullMatch,
        			children: []
    			});
    
				// remove found link from node.raw
				node.raw = node.raw.slice(fullMatch.length); // remove only the first occurrence
				continue;
			}

			
			
			//INLINE CODE BLOCKS
			match = node.raw.match(Grammar.BLOCKS.INLINE_CODE_BLOCK);
			if(match) {
				const inlineCodeToken = {} as Token.codeInlineToken;
				inlineCodeToken.type = TokenType.CODE_INLINE;
				inlineCodeToken.value = match[1];

				//add to the astNode
				node.children.push({
					type: TokenType.CODE_INLINE,
					token: inlineCodeToken,
					raw: match[0],  
					children: []
				});

				// remove inline code from node.raw
				node.raw = node.raw.slice(match[0].length); // remove only the first occurrence
				continue;
			}


			// FORMULA INLINE
			match = node.raw.match(Grammar.BLOCKS.FORMULA_INLINE);
			if(match) {
				const inner = match[0].slice(1, match[0].length - 1).trim();
				const token = {} as Token.formulaInlineToken;
				token.type = TokenType.FORMULA_INLINE;
				token.formula = inner;

				//add to the astNode		
				node.children.push({
					type: TokenType.FORMULA_INLINE,
					token: token,
					raw: match[0],
					children: []
				});
			
				// remove formula inline from node.raw
				node.raw = node.raw.slice(match[0].length); // remove only the first occurrence
				continue;			
			}

			
			
			
			// UNDERLINES INLINE
			match = node.raw.match(Grammar.BLOCKS.UNDER_LINE);
			if(match) {				

				const body = match[0].substring(1, match[0].length - 1);
				const token = {} as Token.underLineToken;
				token.type = TokenType.UNDER_LINE;
				token.value = body;
				
				//add to the astNode
				node.children.push({
					type: TokenType.UNDER_LINE,
					token: token,
					raw: match[0],  
					children: []
				});

				// remove underline from node.raw
				node.raw = node.raw.slice(match[0].length);
				continue;
			}


		
			// BADGES INLINE
			match = node.raw.match(Grammar.BLOCKS.BADGE);
			if (match) {

				const body = match[0].split("|")[0];
				const colorName: any = match[0].split("|")[1];

				const badgeToken = {} as Token.bagdeToken;
				badgeToken.type = TokenType.BADGE;
				badgeToken.value = body;
				badgeToken.color = colorName;

				//add to the astNode
				node.children.push({
					type: TokenType.BADGE,
					token: badgeToken,
					raw: match[0],  
					children: []
				});

				// remove badge from node.raw
				node.raw = node.raw.slice(match[0].length);
				continue;
			}

			
			
			// COLOR WORD INLINE
			match = node.raw.match(Grammar.BLOCKS.COLOR);
			if (match) {
				const body = match[0].split(".")[0];
				const colorName : any = match[0].split(".")[1];
				const colorToken = {} as Token.colorTextToken;
				colorToken.type = TokenType.COLOR;
				colorToken.value = body;
				colorToken.color = colorName;

				//add to the astNode
				node.children.push({
					type: TokenType.COLOR,
					token: colorToken,
					raw: match[0],  
					children: []
				});
				
				// remove color text from node.raw
				node.raw = node.raw.slice(match[0].length);
				continue;
			}



			// FALLBACK - ANY OTHER UNKNOWN INLINE - FALL BACK TO TEXT
			// NEXT WORD TO SPECIAL CHARACTER OR END OF STRING
			const specialChars = /[*[$`]/; 
			const nextSpecial = node.raw.search(specialChars);

			let end: number;

			if (nextSpecial === 0) {    					
    			end = 1;
			} else if (nextSpecial === -1) {    			
    			end = node.raw.length;
			} else {
    			end = nextSpecial;
			}

			const chunk = node.raw.slice(0, end);

			// 2. Logic to add chunk to ast as text node or append to last text node if it exists
			const lastNode = node.children[node.children.length - 1];
			if (lastNode && lastNode.type === TokenType.TEXT) {
    			lastNode.raw += chunk;
    		if (lastNode.token) 
				lastNode.token.value += chunk;
			} else {
    		
				node.children.push({
        			type: TokenType.TEXT, // 
        			raw: chunk,
        			token: { type: TokenType.TEXT, value: chunk }, 
        			children: []
    			});
			}

			// 3. Remove chunk from node.raw
			node.raw = node.raw.slice(end);
			


			} // end while loop
  		}

  		// 2. If there are children — run the same function on them (recursion)
  		if (node.children && node.children.length > 0) {
    		node.children.forEach(child => this.putInlineChildren(child));
  		}

	} // end of putInlineChildren recursive function

} // end of Tokenizer class