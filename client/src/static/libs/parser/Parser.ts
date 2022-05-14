import { BlockquoteHTMLAttributes } from "react";
import * as Token from "./Token";
import { TokenType } from "./Types";

type AST = {
	type: string,
	children?: any[]
}

export class Parser {

	public tokens =  [] as (Token.bagdeToken | Token.captionToken | Token.codeBlockToken |
		Token.codeInlineToken | Token.colorTextToken | Token.headToken | Token.imageToken |
		Token.linkToken | Token.listToken | Token.paragraphEndToken | Token.paragraphStartToken |
		Token.quoteToken | Token.strongTextToken | Token.textToken | Token.underLineToken |
		Token.unknownTextToken | Token.codeInCodeToken)[];
	
	public ast: AST;

	constructor(tokens : any) {
		
		this.tokens = tokens;
		this.ast = {
			type: "Document",
			children: []
		};
		this.init();
	}

	init = () => {

		let token_number: number = 0;
		let isParagraph: boolean = false;

		while (token_number < this.tokens.length) {

			let token : any = this.tokens[token_number];

			// Caption
			if (token.type === TokenType.CAPTION) {
				let captionElement =  {} as Token.captionToken;
				captionElement.type = TokenType.CAPTION; 
				captionElement.row = token.row;
				captionElement.children = [
					{
						type: "Caption",
						date: token.date,
						title: token.title,
						template: token.template,
						thumbnail: token.thumbnail,
						slug: token.slug,
						categories: token.categories,
						tags: token.tags
					}
				];
				
				this.ast.children.push(captionElement);
			}

			// # dept=1
			if (token.type === TokenType.HEADING_FIRST) {
				let headElement =  {} as Token.headToken;
				headElement.type = TokenType.HEADING;
				headElement.dept = 1;
				headElement.row = "#" + token.value;
				headElement.children = [
						{
							type: TokenType.TEXT,
							value: token.value,
						}]
				
				this.ast.children.push(headElement);
			}

			// ## dept = 2
			if (token.type === TokenType.HEADING_SECOND) {
				let headElement =  {} as Token.headToken;
				headElement.type = TokenType.HEADING;
				headElement.dept = 2;
				headElement.row = "##" + token.value;
				headElement.children = [
						{
							type: TokenType.TEXT,
							value: token.value,
						}]
				
				this.ast.children.push(headElement);
			}

			// ### dept = 3
			if (token.type === TokenType.HEADING_THIRD) {
				
				let headElement =  {} as Token.headToken;
				headElement.type = TokenType.HEADING;
				headElement.dept = 3;
				headElement.row = "###" + token.value;
				headElement.children = [
						{
							type: TokenType.TEXT,
							value: token.value,
						}]
				
				this.ast.children.push(headElement);
			}

			// #### dept = 4
			if (token.type === TokenType.HEADING_FORTH) {
				let headElement =  {} as Token.headToken;
				headElement.type = TokenType.HEADING;
				headElement.dept = 4;
				headElement.row = "####" + token.value;
				headElement.children = [
						{
							type: TokenType.TEXT,
							value: token.value,
						}]
				
				this.ast.children.push(headElement);
			}

			// ##### dept = 5
			if (token.type === TokenType.HEADING_FIFTH) {
				let headElement =  {} as Token.headToken;
				headElement.type = TokenType.HEADING;
				headElement.dept = 5;
				headElement.row = "#####" + token.value;
				headElement.children = [
						{
							type: TokenType.TEXT,
							value: token.value,
						}]
				
				this.ast.children.push(headElement);
			}

			

			//CodeInCode
			if (token.type == TokenType.CODE_IN_CODE) {

				let codeInCodeElement =  {} as Token.codeInCodeToken;
				codeInCodeElement.type = TokenType.CODE_IN_CODE;
				codeInCodeElement.row = "```"+token.language + "\n" + token.code + "\n```";
				codeInCodeElement.code = token.code;
				codeInCodeElement.language = token.language
				
				this.ast.children.push(codeInCodeElement);
			}

			//CodeBlock
			if (token.type == TokenType.CODE_BLOCK) {

				let codeBlockElement =  {} as Token.codeBlockToken;
				codeBlockElement.type = TokenType.CODE_BLOCK;
				codeBlockElement.row = "```"+token.language + "\n" + token.code + "\n```";
				codeBlockElement.code = token.code;
				codeBlockElement.language = token.language
				
				this.ast.children.push(codeBlockElement);
				}
			

			//Quote
			if (token.type == TokenType.QUOTE) {

				let quoteElement =  {} as Token.quoteToken;
				quoteElement.type = TokenType.QUOTE;
				quoteElement.row = ">" + token.quote + "\n> <cite> - " + token.author + "</cite>";
				quoteElement.quote = token.quote;
				quoteElement.author = token.author;
				
				this.ast.children.push(quoteElement);
			}

			//List
			if (token.type == TokenType.LIST) {
				let listElement =  {} as Token.listToken;
				listElement.type = TokenType.LIST;
				listElement.attribute = token.attribute;
				listElement.row = token.attribute + " "+token.value;
				listElement.value = token.value; 
				
				this.ast.children.push(listElement)
			}


			//Start all that in the paragraph can use
			if (token.type == TokenType.PARAGRAPH_START) {
				let paragraphStartElement = {} as Token.paragraphStartToken;
				paragraphStartElement.type = TokenType.PARAGRAPH;
				paragraphStartElement.children = [];
				paragraphStartElement.row = "";
				
				this.ast.children.push(paragraphStartElement);
				isParagraph = true;
			}

			if (token.type == TokenType.PARAGRAPH_END) {
				isParagraph = false;
			}

			//Link
			if (token.type == TokenType.LINK) {
				let linkElement = {} as Token.linkToken;
				linkElement.type = TokenType.LINK;
				linkElement.name = token.name;
				linkElement.url = token.url;
				linkElement.row = "[" + token.name + "](" + token.url + ")"
				if(isParagraph == true){
					this.ast.children[(this.ast.children).length - 1].children.push(linkElement)
				this.ast.children[(this.ast.children).length - 1].row = this.ast.children[(this.ast.children).length - 1].row + "[" + token.name + "](" + token.url + ")"
				} else {
					this.ast.children.push(linkElement)
				}	
			}

			//Image
			if (token.type == "Image" && isParagraph == true) {
				let imageToken = {} as Token.imageToken;
				imageToken.type = TokenType.IMAGE;
				imageToken.alt = token.alt;
				imageToken.url = token.url;
				imageToken.row = "![" + token.alt + "](" + token.url + ")"
				
				if(isParagraph == true) {
					this.ast.children[this.ast.children.length - 1].children.push(imageToken)
					this.ast.children[(this.ast.children).length - 1].row = this.ast.children[(this.ast.children).length - 1].row + "[" + token.alt + "](" + token.url + ")"
				} else {
					this.ast.children.push(imageToken)
				}
			}

			// Text
			if (token.type == TokenType.TEXT) {
				let textToken = {} as Token.textToken;
				textToken.type = TokenType.TEXT;
				textToken.value = token.value;
				textToken.row = token.value

				if(isParagraph == true){
					this.ast.children[(this.ast.children).length - 1].children.push(textToken)
				this.ast.children[(this.ast.children).length - 1].row = this.ast.children[(this.ast.children).length - 1].row + token.value
				}else {
					this.ast.children.push(textToken)
				}
				
			}

			// Unmarkable
			if (token.type == TokenType.UNMARKABLE) {
				let unmarkableTextToken = {} as Token.unmarkableToken;
				unmarkableTextToken.type = TokenType.UNMARKABLE;
				unmarkableTextToken.value = token.value;
				unmarkableTextToken.row = "\\" + token.value + "\\";
				
				if(isParagraph == true){
					this.ast.children[(this.ast.children).length - 1].children.push(unmarkableTextToken)
					this.ast.children[(this.ast.children).length - 1].row = this.ast.children[(this.ast.children).length - 1].row + token.value
				} else {
					this.ast.children.push(unmarkableTextToken)
				}
				
			}

	
	

			// Strong
			if (token.type == TokenType.STRONG) {
				let strongTextToken = {} as Token.strongTextToken
				strongTextToken.type = TokenType.STRONG;
				strongTextToken.value = token.value;
				strongTextToken.row = "**" + token.value + "*+"
				
				if(isParagraph == true){
					this.ast.children[(this.ast.children).length - 1].children.push(strongTextToken)
					this.ast.children[(this.ast.children).length - 1].row = this.ast.children[(this.ast.children).length - 1].row + token.value
				} else {
					this.ast.children.push(strongTextToken)
				}
			}	

			// Color text
			if (token.type == "Color") {

				let colorTextToken = {} as Token.colorTextToken;
				colorTextToken.type = TokenType.COLOR;
				colorTextToken.color = token.color;
				colorTextToken.value = token.value;
				colorTextToken.row = token.value + "." + token.color;
				
				if(isParagraph == true){
					this.ast.children[(this.ast.children).length - 1].children.push(colorTextToken)
				this.ast.children[(this.ast.children).length - 1].row = this.ast.children[(this.ast.children).length - 1].row + token.value +"."+token.color 
				} else {
					this.ast.children.push(colorTextToken)
				}
				

			}

			// Color badge
			if (token.type == "Badge") {

				let badgeToken = {} as Token.bagdeToken;
				badgeToken.type = TokenType.BADGE;
				badgeToken.color = token.color;
				badgeToken.value = token.value;
				badgeToken.row = token.value + "@" + token.color;
				
				if(isParagraph == true){
					this.ast.children[(this.ast.children).length - 1].children.push(badgeToken)
				this.ast.children[(this.ast.children).length - 1].row = this.ast.children[(this.ast.children).length - 1].row + token.value +"@"+token.color 
				} else {
					this.ast.children.push(badgeToken)
				}
				
			}

			// InlineCode
			if (token.type == TokenType.CODE_INLINE) {
				
				let inlineCodeElement = {} as Token.codeInlineToken;
				inlineCodeElement.type = TokenType.CODE_INLINE;
				inlineCodeElement.value = token.value;
				inlineCodeElement.row = token.value;
				
				if(isParagraph == true){
					this.ast.children[(this.ast.children).length - 1].children.push(inlineCodeElement)
					this.ast.children[(this.ast.children).length - 1].row = this.ast.children[(this.ast.children).length - 1].row + token.value
				}else {
					this.ast.children.push(inlineCodeElement);
				}
			}

			// UnderLine
			if (token.type == TokenType.UNDER_LINE) {
				let underLineElement = {} as Token.underLineToken;
				underLineElement.type =  TokenType.UNDER_LINE;
				underLineElement.value =  token.value;
				if(isParagraph == true){
					this.ast.children[(this.ast.children).length - 1].children.push(underLineElement)
				this.ast.children[(this.ast.children).length - 1].row = this.ast.children[(this.ast.children).length - 1].row + token.value
				}else{
					this.ast.children.push(underLineElement)
				}	
			}


			token_number++;

		}
	}
}
