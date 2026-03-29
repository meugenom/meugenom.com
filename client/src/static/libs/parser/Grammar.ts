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
		LIST: /^(?:([^\n]+):)?\s*\n?(\s*(-(?!>)|\[\]|\[x\])\s*[^\n]+(?:\n|$)){1,20}/,
		LIST_ATTRIBUTE: /(-|\[\]|\[x\])/g,


		// code block
		CODE_BLOCK: /^(\`){3}(cpp|c|matlab|octave|python|bash|java|javascript|typescript|swift|text)?([^(\`){3}].*\n){1,2000}\`\`\`/,
		CODE_BLOCK_LANG: /[^\`\`\`](\w+)\n/gs,
		CODE_BLOCK_BODY: /\n([\s\S]+)[^\`\`\`]/gs,

		
		// code in code block		
		CODE_IN_CODE: /^(`{4,})([a-z0-9+]*)[\n\r]([\s\S]*?)\n\1(?![`])/,
		// match [0] - all 
		// match [3] - clear code

		INLINE_CODE: /([^\`\`\`]+)/gs,
		INLINE_CODE_PARAMS: /([^\n]+)/sg,

		// inline code
		INLINE_CODE_BLOCK: /^\`([^\`\n]+)\`/,

		// quote		
		QUOTE: /^(>[^\n]*(\n|$))+/,				

		// links
		LINK: /^\[([^\]]+)\]\((\S+)\)/,
		
		// images
		IMAGE: /^!\[([^)]+)\]\(\S+\)/,
		IMAGE_NAME: /!\[\S.+\]/g,
		IMAGE_URL: /\(\S.+\)/g,

		// horizontal line
		UNDER_LINE: /^(?<!\w)_([^_\n]+?)_(?!\w)/,
		

		UNMARKABLE_BLOCK: /^\\\*\s?([\s\S]*?)\\\*/,
		

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
