import { TokenType } from "./Types"
import * as Token from "./Token"

type typeCodeInCode = {
	token : Token.codeInCodeToken,
	values: string[]
}

type allTypes = {
	codeInLine : typeCodeInCode
}


const c: typeCodeInCode = {
	token : {type: TokenType.CODE_IN_CODE , code: "", language: ""},
	values: [ "type", "value", "row"]
}

const ac : allTypes = {
	codeInLine : c
}


export class Runner {

	constructor(){
		this.start();
	}

	private start(){
		for (const [key, value] of Object.entries(ac)) {
			
			let a =  {} as Token.codeInCodeToken;
			a.type = value.token.type;
			a.row = "```"+value.token.language + "\n" + value.token.code + "\n```";
			a.code = value.token.code;
			a.language = value.token.language	
			
			return a

		  }
	}

	//private init : Array<Object> = Object.entries(ac).map((value, key) => {
	//	console.log(value);
	//	return { key: key , value: value }
	//});
}