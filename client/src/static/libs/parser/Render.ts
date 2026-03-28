import { CaptionHTML } from "./htmlblocks/CaptionHTML"
import { HeaderHTML } from "./htmlblocks/HeaderHTML";
import {ParagraphHTML} from "./htmlblocks/ParagraphHTML"
import { CodeBlockHTML } from "./htmlblocks/CodeBlockHTML";
import {QuoteHTML} from "./htmlblocks/QuoteHTML";
import {ListHTML} from "./htmlblocks/ListHTML";
import { TableHTML } from "./htmlblocks/TableHTML";
import { FormulaHTML } from "./htmlblocks/FormulaHTML";
import { TokenType } from "./Types";
import { ASTNode } from "./interfaces/astNode";



export class Render {

	private ast : ASTNode;
	public htmlOutput : HTMLElement | null;

	constructor(node : ASTNode, htmlOutput : HTMLElement | null) {
		this.ast = node
		this.htmlOutput = htmlOutput;

		if (this.ast && this.htmlOutput) {
			this.renderNodes(this.ast.children, this.htmlOutput);
		}
	}

	renderNodes(nodes: ASTNode[], container: HTMLElement) {
    
		let element: HTMLElement | Text;

		nodes.forEach(node => {

			// every time we start processing a new node, we reset the element variable to null
			element = null as any; // initialize element as null for each node
        	

			switch (node.type) {
				
				// Block Caption 
				case TokenType.CAPTION:					
					const caption = new CaptionHTML(node.token as any);
					element = caption.renderAsElement();
					console.log('Rendered Caption:', element);
					break;

				// Block Header
				case TokenType.HEADING_FIRST:
				case TokenType.HEADING_SECOND:
				case TokenType.HEADING_THIRD:
				case TokenType.HEADING_FORTH:
				case TokenType.HEADING_FIFTH:
					const header = new HeaderHTML(node.token as any, this.htmlOutput as HTMLElement);
					element = header.renderAsElement();
					console.log('Rendered Header:', element);
					break;


            	case TokenType.TEXT:
                	element = document.createTextNode(node.token.value);
                	break;

            	case TokenType.STRONG:
                	element = document.createElement('strong');
                	// РЕКУРСИЯ: отправляем детей этого узла на рендеринг внутрь 'strong'
                	
					this.renderNodes(node.children, element); 
                	break;

            case TokenType.LINK:
                element = document.createElement('a');
                element.setAttribute('href', node.token.url);
                this.renderNodes(node.children, element); // Рендерим текст ссылки
                break;

            case TokenType.PARAGRAPH:
				element = document.createElement('p');								
                this.renderNodes(node.children, element); // Рендерим содержимое абзаца
                break;

            // ... остальные типы (Badge, Formula, и т.д.)
        }

		if (element) {
            container.appendChild(element);
        }
        	// ... and so on for all types


    	});
	}
}