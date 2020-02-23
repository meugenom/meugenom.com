const Config =
{
  rules: {
	  '*': 'h1',
	  '**': 'h2',
	  '***': 'h3',
	  '****': 'h4'
	  },
	separator: {
		newLine: '\n',
		newSpace: ' '
	  },

  ImagesPattern: /^!\[(.*?)\]/,
  BracketsPattern: /\[(.*?)\]/,
  BracesPattern: /\((.*?)\)/,
  UnderDashPattern: /^\_(.*?)\_/,
  StrongPattern: /^\*\*(.*?)\*\*/,
  CodePattern: /^\`(.*?)\`$/,
  SearchLinkPattern: /<a href="">(.*?)/,
  UnMarkablePattern: /\\\*\w+\\\*/,

  StartCodePattern: /^\`(.*?)/,
  EndCodePattern: /(.*?)\`$/,
  StartStrongPattern: /^\*\*(.*?)/,
  EndStrongPattern: /(.*?)\*\*/,
  StartBracketsPattern: /\[(.*?)/,
  EndBracketsPattern: /(.*?)\]/,
  StartUnMarkablePattern: /\\\*\w+/,
  EndUnMarkablePattern: /\w+\\\*/,

  english: '@en',
  german: '@de',
  russian: '@ru',
  multi: '@all',

  version: '0.0.1rc'

}

export default Config
