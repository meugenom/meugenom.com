'use strict'
import { Grammar } from "./Grammar"
import { Caption } from "./Caption"
import * as Token from "./Token";
import { TokenType } from "./Types";

/**
 * 
 */

export class Tokenizer {

	public tokens =  [] as (Token.bagdeToken | Token.captionToken | Token.codeBlockToken |
		Token.codeInlineToken | Token.colorTextToken | Token.headToken | Token.imageToken |
		Token.linkToken | Token.listToken | Token.paragraphEndToken | Token.paragraphStartToken |
		Token.quoteToken | Token.strongTextToken | Token.textToken | Token.underLineToken |
		Token.unknownTextToken | Token.codeInCodeToken | Token.unmarkableToken)[];
	
	public text: string;
	public words: Array<string>;
	private word_number: number;

	constructor(text: string) {

		this.text = text;
		this.tokens = [];
		this.word_number = 0;
		this.words = [];
		this.init();
	}


	private init = (): void => {

		//add caption
		if (this.text.match(Grammar.BLOCKS.CAPTION) != null) {

			const caption = new Caption(this.text);
			let token = {} as Token.captionToken;
			token = caption.get();
			this.text = caption.text;//remove caption from article
			this.tokens.push(token);

		}


		//split by space
		this.words = this.text.split(Grammar.BLOCKS.SPACE);

		let out = "";

		/**
		 * LOOPS for multiple line blocks:
		 *  - CODEBLOCK
		 *  - CODE
		 *  - QUOTE
		 */

		this.word_number = 0;

		loop_word: while (this.word_number < this.words.length) {

			out = out + " " + (this.words[this.word_number]);

			//in the end of article
			if (this.word_number == this.words.length - 1) {

				let token =  {} as Token.unknownTextToken;
				token.type = TokenType.UNKNOWN_TEXT;
				token.value = out;
				this.tokens.push(token);

				this.word_number++;
				continue loop_word;
			}


			//CODE_IN_CODE block
			if (out.match(Grammar.BLOCKS.CODE_IN_CODE) != null) {

				const rest: string = out.replace(Grammar.BLOCKS.CODE_IN_CODE, "&codeInCode&");
				const arr = rest.split("&codeInCode&")

				//block before
				let unknownToken = {} as Token.unknownTextToken;
				unknownToken.type = TokenType.UNKNOWN_TEXT;
				unknownToken.value = arr[0];
				this.tokens.push(unknownToken);

				//founded block
				let codeToken = {} as  Token.codeInCodeToken;
				codeToken.type = TokenType.CODE_IN_CODE;
				codeToken.code = out.match(Grammar.BLOCKS.CODE_IN_CODE)[2];
				codeToken.language = out.match(Grammar.BLOCKS.CODE_IN_CODE)[1];
				this.tokens.push(codeToken);

				//block after 
				out = arr[1];
				this.word_number++;
				continue loop_word;
			}


			//CODE
			if (out.match(Grammar.BLOCKS.CODE_BLOCK) != null &&
				out.match(Grammar.BLOCKS.CODE_BLOCK)[2].length > 5 //because value is not less then 5 symbols...its CODEBLOCK
			) {

				const rest: string = out.replace(Grammar.BLOCKS.CODE_BLOCK, "&codeblock&");
				const arr = rest.split("&codeblock&")


				//block before
				let unknownTextToken = {} as  Token.unknownTextToken;
				unknownTextToken.type = TokenType.UNKNOWN_TEXT;
				unknownTextToken.value = arr[0];
				this.tokens.push(unknownTextToken);

				//founded block
				let codeToken = {} as  Token.codeBlockToken;
				codeToken.type = TokenType.CODE_BLOCK;
				codeToken.code = out.match(Grammar.BLOCKS.CODE_BLOCK)[2];
				codeToken.language = out.match(Grammar.BLOCKS.CODE_BLOCK)[1];
				this.tokens.push(codeToken);

				//block after
				out = arr[1];
				this.word_number++;
				continue loop_word;
			}

			//QUOTE
			if (out.match(Grammar.BLOCKS.QUOTE) != null) {

				const rest: string = out.replace(Grammar.BLOCKS.QUOTE, "&quote&");
				const arr = rest.split("&quote&")


				//block before
				let unknownToken = {} as  Token.unknownTextToken;
				unknownToken.type = TokenType.UNKNOWN_TEXT;
				unknownToken.value = arr[0];
				this.tokens.push(unknownToken);

				//founded block
				let quoteToken = {} as  Token.quoteToken;
				quoteToken.type = TokenType.QUOTE;
				quoteToken.row = out.match(Grammar.BLOCKS.QUOTE)[0];
				quoteToken.quote = out.match(Grammar.BLOCKS.QUOTE)[1];
				quoteToken.author = out.match(Grammar.BLOCKS.QUOTE)[2];
				this.tokens.push(quoteToken);

				//after block
				out = arr[1];
				this.word_number++;
				continue loop_word;

			}

			this.word_number++;

		}


		// LOOPS UNKNOWN_TEXT TO DEFINE OTHER TOKENS:

		let itokens = [] as  Array<Token.bagdeToken | Token.captionToken | Token.codeBlockToken |
			Token.codeInlineToken | Token.colorTextToken | Token.headToken | Token.imageToken |
			Token.linkToken | Token.listToken | Token.paragraphEndToken | Token.paragraphStartToken |
			Token.quoteToken | Token.strongTextToken | Token.textToken | Token.underLineToken |
			Token.unknownTextToken | Token.codeInCodeToken | Token.unmarkableToken >;


		this.tokens.forEach((token: any) => {

			if (token.type == TokenType.UNKNOWN_TEXT) {

				const text = token.value.split("\n")

				text.forEach((stroke: string) => {

					if (stroke != '' && stroke != ' ') {

						/**
						 * Search other tokens:
						 * 
						 * - Image
						 * - Link
						 * - InlineCode
						 *  - Strong
						 * - Unmarkable
						 * - Heading
						 * - Underdash
						 */


						if (stroke.match(Grammar.BLOCKS.IMAGE) != null) {

							//Paragrah Start -> Text before -> Image -> Text after -> Paragraph End

							//paragraph start
							let paragraphStartToken = {} as  Token.paragraphStartToken;
							paragraphStartToken.type = TokenType.PARAGRAPH_START;
							itokens.push(paragraphStartToken);

							//text before 
							let textBeforeToken = {} as  Token.textToken;
							textBeforeToken.type = TokenType.TEXT;
							textBeforeToken.value = stroke.match(Grammar.BLOCKS.IMAGE)[1];
							itokens.push(textBeforeToken)

							//image
							let imageToken = {} as  Token.imageToken;
							imageToken.type = TokenType.IMAGE;
							imageToken.alt = stroke.match(Grammar.BLOCKS.IMAGE)[2];
							imageToken.url = stroke.match(Grammar.BLOCKS.IMAGE)[3];
							itokens.push(imageToken);

							//text after
							let textAfterToken = {} as  Token.textToken;
							textAfterToken.type = TokenType.TEXT;
							textAfterToken.value = stroke.match(Grammar.BLOCKS.IMAGE)[4];
							itokens.push(textAfterToken);

							//end paragraph
							let paragraphEndToken = {} as Token.paragraphEndToken;
							paragraphEndToken.type = TokenType.PARAGRAPH_END;
							itokens.push(paragraphEndToken)

							return;

						}

						if (stroke.match(Grammar.BLOCKS.LINK) != null) {

							//Paragrah Start -> Text before -> Link -> Text after -> Paragraph End

							//paragraph start
							let paragraphStartToken= {} as Token.paragraphStartToken;
							paragraphStartToken.type = TokenType.PARAGRAPH_START;
							itokens.push(paragraphStartToken);

							//text before 
							let textBeforeToken= {} as Token.textToken;
							textBeforeToken.type = TokenType.TEXT;
							textBeforeToken.value = stroke.match(Grammar.BLOCKS.LINK)[1];
							itokens.push(textBeforeToken);

							//link
							let linkToken= {} as Token.linkToken;
							linkToken.type = TokenType.LINK;
							linkToken.name = stroke.match(Grammar.BLOCKS.LINK)[2];
							linkToken.url = stroke.match(Grammar.BLOCKS.LINK)[3];
							itokens.push(linkToken);

							//text after
							let textAfterToken= {} as Token.textToken;
							textAfterToken.type = TokenType.TEXT;
							textAfterToken.value = stroke.match(Grammar.BLOCKS.LINK)[4];
							itokens.push(textAfterToken);

							//end paragraph
							let paragraphEndToken = {} as Token.paragraphEndToken;
							paragraphEndToken.type = TokenType.PARAGRAPH_END;
							itokens.push(paragraphEndToken)

							return;

						}

						if (stroke.match(Grammar.BLOCKS.UNDER_LINE) != null) {

							//Paragrah Start -> Text before -> underLine -> Text after -> Paragraph End

							//paragraph start
							let paragraphStartToken = {} as Token.paragraphStartToken;
							paragraphStartToken.type = TokenType.PARAGRAPH_START;
							itokens.push(paragraphStartToken);

							//text before 
							let textBeforeToken = {} as Token.textToken;
							textBeforeToken.type = TokenType.TEXT;
							textBeforeToken.value = stroke.match(Grammar.BLOCKS.UNDER_LINE)[1];
							itokens.push(textBeforeToken)

							//underLine
							let underLineToken = {} as Token.underLineToken;
							underLineToken.type = TokenType.UNDER_LINE;
							underLineToken.value = stroke.match(Grammar.BLOCKS.UNDER_LINE)[2];
							itokens.push(underLineToken);

							// text after
							let textAfterToken = {} as Token.textToken;
							textAfterToken.type = TokenType.TEXT;
							textAfterToken.value = stroke.match(Grammar.BLOCKS.UNDER_LINE)[3];
							itokens.push(textAfterToken);

							//end paragraph
							let paragraphEndToken = {} as Token.paragraphEndToken;
							paragraphEndToken.type = TokenType.PARAGRAPH_END
							itokens.push(paragraphEndToken)

							return;

						}

						//inline code
						if (stroke.match(Grammar.BLOCKS.INLINE_CODE) != null) {

							//Paragrah Start -> Text before -> inline code -> Text after -> Paragraph End

							//paragraph start
							let paragraphStartToken = {} as Token.paragraphStartToken;
							paragraphStartToken.type = TokenType.PARAGRAPH_START;
							itokens.push(paragraphStartToken);

							//text before 
							let textBeforeToken = {} as Token.textToken;
							textBeforeToken.type = TokenType.TEXT;
							textBeforeToken.value = stroke.match(Grammar.BLOCKS.INLINE_CODE)[1];
							itokens.push(textBeforeToken)

							//inline code
							let codeInlineToken = {} as Token.codeInlineToken;
							codeInlineToken.type = TokenType.CODE_INLINE;
							codeInlineToken.value = stroke.match(Grammar.BLOCKS.INLINE_CODE)[2];
							itokens.push(codeInlineToken);

							// text after
							let textAfterToken = {} as Token.textToken;
							textAfterToken.type = TokenType.TEXT;
							textAfterToken.value = stroke.match(Grammar.BLOCKS.INLINE_CODE)[3];
							itokens.push(textAfterToken);

							//end paragraph
							let paragraphEndToken = {} as Token.paragraphEndToken;
							paragraphEndToken.type = TokenType.PARAGRAPH_END;
							itokens.push(paragraphEndToken)

							return;

						}

						// Strong text
						if (stroke.match(Grammar.BLOCKS.STRONG) != null) {

							//Paragrah Start -> Text before -> Strong Text -> Text after -> Paragraph End

							//paragraph start
							let paragraphStartToken = {} as Token.paragraphStartToken;
							paragraphStartToken.type = TokenType.PARAGRAPH_START;
							itokens.push(paragraphStartToken);

							//text before 
							let textToken = {} as Token.textToken;
							textToken.type = TokenType.TEXT;
							textToken.value = stroke.match(Grammar.BLOCKS.STRONG)[1];
							itokens.push(textToken)

							//strong text
							let strongTextToken = {} as Token.strongTextToken;
							strongTextToken.type = TokenType.STRONG;
							strongTextToken.value = stroke.match(Grammar.BLOCKS.STRONG)[2];
							itokens.push(strongTextToken);

							// text after
							let textAfterToken = {} as Token.textToken;
							textAfterToken.type = TokenType.TEXT;
							textAfterToken.value = stroke.match(Grammar.BLOCKS.STRONG)[3];
							itokens.push(textAfterToken);

							//end paragraph
							let paragraphEndToken = {} as Token.paragraphEndToken;
							paragraphEndToken.type = TokenType.PARAGRAPH_END;
							itokens.push(paragraphEndToken)

							return;
						}



						// Color text
						if (stroke.match(Grammar.BLOCKS.COLOR) != null) {

							//Paragrah Start -> Text before -> Color Text -> Text after -> Paragraph End

							const rest: string = stroke.replace(Grammar.BLOCKS.COLOR, "&color&");
							const arr = rest.split("&color&")

							//paragraph start
							let paragraphStartToken = {} as Token.paragraphStartToken;
							paragraphStartToken.type = TokenType.PARAGRAPH_START;
							itokens.push(paragraphStartToken);

							//text before 
							let textToken = {} as Token.textToken;
							textToken.type = TokenType.TEXT;
							textToken.value = arr[0];
							itokens.push(textToken)

							//Color Text
							let colorTextToken = {} as Token.colorTextToken;
							colorTextToken.type = TokenType.COLOR;
							colorTextToken.value = stroke.match(Grammar.BLOCKS.COLOR)[1];
							colorTextToken.color = stroke.match(Grammar.BLOCKS.COLOR)[3];
							itokens.push(colorTextToken);

							// text after
							let textAfterToken = {} as Token.textToken;
							textAfterToken.type = TokenType.TEXT;
							textAfterToken.value = arr[1];
							itokens.push(textAfterToken);

							//end paragraph
							let paragraphEndToken = {} as Token.paragraphEndToken;
							paragraphEndToken.type = TokenType.PARAGRAPH_END;
							itokens.push(paragraphEndToken)

							return;

						}

						// Color badges
						if (stroke.match(Grammar.BLOCKS.BADGE) != null) {

							//Paragrah Start -> Text before -> Color Badge -> Text after -> Paragraph End

							const rest: string = stroke.replace(Grammar.BLOCKS.BADGE, "&badge&");
							const arr = rest.split("&badge&")

							//paragraph start
							let paragraphStartToken = {} as Token.paragraphStartToken;
							paragraphStartToken.type = TokenType.PARAGRAPH_START;
							itokens.push(paragraphStartToken);

							//text before 
							let textToken = {} as Token.textToken;
							textToken.type = TokenType.TEXT;
							textToken.value = arr[0];
							itokens.push(textToken)

							//Color Badge
							let badgeToken = {} as Token.bagdeToken;
							badgeToken.type = TokenType.BADGE;
							badgeToken.value = stroke.match(Grammar.BLOCKS.BADGE)[1];
							badgeToken.color = stroke.match(Grammar.BLOCKS.BADGE)[3];
							itokens.push(badgeToken);

							// text after
							let textAfterToken = {} as Token.textToken;
							textAfterToken.type = TokenType.TEXT;
							textAfterToken.value = arr[1];
							itokens.push(textAfterToken);

							//end paragraph
							let paragraphEndToken = {} as Token.paragraphEndToken;
							paragraphEndToken.type = TokenType.PARAGRAPH_END;
							itokens.push(paragraphEndToken);

							return;

						}

						// Unmarkable text
						if (stroke.match(Grammar.BLOCKS.UNMARKABLE) != null) {

							//Paragrah Start -> Text before -> Unmarkable Text -> Text after -> Paragraph End

							//paragraph start
							let paragraphStartToken = {} as Token.paragraphStartToken;
							paragraphStartToken.type = TokenType.PARAGRAPH_START;
							itokens.push(paragraphStartToken);

							//text before 
							let textToken = {} as Token.textToken;
							textToken.type = TokenType.TEXT;
							textToken.value = stroke.match(Grammar.BLOCKS.UNMARKABLE)[1];
							itokens.push(textToken)

							//unmarkable text
							let unmarkableToken = {} as Token.unmarkableToken;
							unmarkableToken.type = TokenType.UNMARKABLE;
							unmarkableToken.value = stroke.match(Grammar.BLOCKS.UNMARKABLE)[2];
							itokens.push(unmarkableToken);

							// text after
							let textAfterToken = {} as Token.textToken;
							textAfterToken.type = TokenType.TEXT;
							textAfterToken.value = stroke.match(Grammar.BLOCKS.UNMARKABLE)[3];
							itokens.push(textAfterToken);

							//end paragraph
							let paragraphEndToken = {} as Token.paragraphEndToken;
							paragraphEndToken.type = TokenType.PARAGRAPH_END;
							itokens.push(paragraphEndToken);

							return;

						}

						// LIST						
						if (stroke.match(Grammar.BLOCKS.LIST) != null) {

							//Paragrah Start -> List -> Paragraph End

							//paragraph start
							let paragraphStartToken = {} as Token.paragraphStartToken;
							paragraphStartToken.type = TokenType.PARAGRAPH_START;
							itokens.push(paragraphStartToken);

							//List
							let listToken = {} as Token.listToken;
							listToken.type = TokenType.LIST;
							listToken.attribute = stroke.match(Grammar.BLOCKS.LIST)[1];
							listToken.value = stroke.match(Grammar.BLOCKS.LIST)[2];
							itokens.push(listToken);

							//end paragraph
							let paragraphEndToken = {} as Token.paragraphEndToken;
							paragraphEndToken.type = TokenType.PARAGRAPH_END;
							itokens.push(paragraphEndToken);

							return;

						}


						// Heading
						if (stroke.match(Grammar.BLOCKS.HEADING) != null) {

							const types = [
								TokenType.HEADING_FIRST,
								TokenType.HEADING_SECOND,
								TokenType.HEADING_THIRD,
								TokenType.HEADING_FORTH,
								TokenType.HEADING_FIFTH
							]

							const itype: number = stroke.match(Grammar.BLOCKS.HEADING)[1].length - 1;

							let headToken = {} as Token.headToken;
							headToken.type = types[itype];
							headToken.value = stroke.match(Grammar.BLOCKS.HEADING)[2];
							itokens.push(headToken);

							return;
						}

						// for other unidentified text
						// Paragraph -> Other Text -> Paragraph

						//paragraph start
						let paragraphStartToken = {} as Token.paragraphStartToken;
						itokens.push(paragraphStartToken);

						//Other Text 
						let textToken = {} as Token.textToken;
						textToken.type = TokenType.TEXT;
						textToken.value = stroke;
						itokens.push(textToken)


						//end paragraph
						let paragraphEndToken = {} as Token.paragraphEndToken;
						itokens.push(paragraphEndToken);

					}
				})

			} else {

				itokens.push(token);
			}
		})

		this.tokens = itokens;


	}
}