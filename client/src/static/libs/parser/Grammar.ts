'use strict'

/**
 * Grammar
 * This is a class that contains all the regular expressions used in the parser.
 * 
 */
export class Grammar {

	public static BLOCKS = {

		// heading‚
		HEADING: /^#{1,6}\s+[^\n]*(?:\n|$)/,
		HEADING_LEVEL: /^(#{1,5})/,

		// caption
		CAPTION: /^---\sdate:((.*))\stitle:((.*))\stemplate:((.*))\sthumbnail:((.*))\sslug:((.*))\stags:((.*))\scluster:((.*))\sorder:((.*))\s---/,

		SPACE: / /,
		LINE: /\n/,

		// color line 
		COLOR: /((.?)[^\s]+)\.(blue|gray|red|green|yellow|indigo|purple|pink)/g,

		// badge
		BADGE: /((.?)[^\s]+)\|(blue|gray|red|green|yellow|indigo|purple|pink)/g,

		// list		
		LIST: /^\S.*:\n(\s*(-(?!>)|\[\]|\[.\])\s*\S.*){1,20}/,
		LIST_ATTRIBUTE: /(-|\[\]|\[x\])/g,


		// code block
		CODE_BLOCK: /^\`\`\`(cpp|c|matlab|octave|python|bash|java|javascript|typescript|swift|text)?([^(\`){3}].*\n){1,200}\`\`\`/,
		CODE_BLOCK_LANG: /[^\`\`\`](\w+)\n/gs,
		CODE_BLOCK_BODY: /\n([\s\S]+)[^\`\`\`]/gs,

		// code in code block
		CODE_IN_CODE: /^\`\`\`(cpp|c|python|matlab|bash|java|javascript|typescript|swift|text)?\n([^\`\`\`]+)\`\`\`(cpp|c|python|matlab|bash|java|javascript|typescript|swift)\n([^\`\`\`]+)\`\`\`\n\`\`\`\n/,
		INLINE_CODE: /([^\`\`\`]+)/gs,
		INLINE_CODE_PARAMS: /([^\n]+)/sg,

		// inline code
		INLINE_CODE_BLOCK: /\`([^\`\n]+)\`/g,

		// quote		
		QUOTE: /^(>[^\n]*(\n|$))+/,
		
		//TODO: need to remove
		QUOTE_PARAMS: /[^<>]+/g,

		// links
		LINK: /^\[([^\]]+)\]\((\S+)\)/,
		
		// need remove
		LINK_NAME: /\[\S.+\]/g,
		LINK_URL: /\(\S.+\)/g,

		
		// images
		IMAGE: /^!\[([^)]+)\]\(\S+\)/,
		IMAGE_NAME: /!\[\S.+\]/g,
		IMAGE_URL: /\(\S.+\)/g,

		// horizontal line
		UNDER_LINE: /(?<!\w)_([^_\n]+?)_(?!\w)/g,

		UNMARKABLE_BLOCK: /^\\\*\s?([\s\S]*?)\\\*/,
		//UNMARKABLE_INLINE: /\\\*\s([^\n]+?)\s\\\*/,

		// need remove
		STRONG: /^\*\*(.*?)\*\*/,
		
		STRONG_TEXT: /^\*\*([\s\S]*?)\*\*/,


		// table: matches one or more rows of the form | ... | per line
		// [^\n|] ensures at least one non-pipe non-newline char so pure
		// pipe-only lines (e.g. stray |) are not matched
		TABLE: /^(\|[^\n|][^\n]*\|[ \t]*\n?)+/,

		FORMULA_BLOCK: /^\$\$([\s\S]+?)\$\$/,
		FORMULA_INLINE: /^\$(?!\$)(?!token\.)([^$\n]+?)\$(?!\$)/,

		PARAGRAPH: /([^\n]+)/g,

		TOKEN: /\$token.(\S{35}[^\s\.\*\`])/g,

		TXT_TOKEN: /[^\$token.\w\b-](\w)+/g,
	}
}
