'use strict'

/**
 * Grammar
 * This is a class that contains all the regular expressions used in the parser.
 * 
 */
export class Grammar {

	public static BLOCKS = {

		SPACE: / /,
		LINE: /\n/,


		// heading‚
		HEADING: /^#{1,6}\s+[^\n]*(?:\n|$)/,
		HEADING_LEVEL: /^(#{1,5})/,

		// caption regex getested		
		CAPTION: /^---[\s\S]*?---/,		
		CAPTION_PARAMETER: /^---\s*date:\s*(.*?)\s*title:\s*(.*?)\s*template:\s*(.*?)\s*thumbnail:\s*(.*?)\s*slug:\s*(.*?)\s*tags:\s*(.*?)\s*cluster:\s*(.*?)\s*order:\s*(.*?)\s*---$/m,
		CAPTION_DATE: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
		CAPTION_THUMBNAIL: /^'[\.\/a-zA-Z0-9\-_]+\.(png|jpg|jpeg|webp)'$/,
		CAPTION_SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
		CAPTION_CLUSTER: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
		
		// color line 
		//COLOR: /((.?)[^\s]+)\.(blue|gray|red|green|yellow|indigo|purple|pink)/,
		COLOR: /([^\s]+)\.(blue|gray|red|green|yellow|indigo|purple|pink)(?!\w)/,
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

		TABLE: /^(\|[^\n|][^\n]*\|[ \t]*\n?)+/,
		TABLE_CELL: /([^|]+)(?=\|)/g,

		FORMULA_BLOCK: /^\$\$([\s\S]+?)\$\$/,
		FORMULA_INLINE: /^\$(?!\$)(?!token\.)([^$\n]+?)\$(?!\$)/,

		PARAGRAPH: /([^\n]+)/g,

		TOKEN: /\$token.(\S{35}[^\s\.\*\`])/g,

		TXT_TOKEN: /[^\$token.\w\b-](\w)+/g,
	}
}
