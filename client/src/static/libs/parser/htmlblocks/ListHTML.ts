import * as Token from "../Token";
import { TokenType } from "../Types";

export class ListHTML {
    
    private token: Token.listToken;

    constructor(token: Token.listToken) {
        this.token = token;
    }

    private resolveTokens(text: string): string {
        if (!this.token.tokensMap) return text;
        const tokenRegex = /\$token\.([0-9a-f-]{36})/g;
        return text.replace(tokenRegex, (match) => {
            const t = this.token.tokensMap!.get(match);            
            return match;
        });
    }

    private createListItem(item: string): string {
        if (!item) return '';
        const resolved = this.resolveTokens(item);
        if (item.includes("[]")) {
            return `<li class="list-none ml-5 flex items-start gap-2"><input class="form-check-input appearance-none flex-shrink-0 h-4 w-4 border-solid border-gray-200 border-2 rounded-sm disabled:bg-white disabled:border-blue-400 mt-1 bg-no-repeat bg-center bg-contain" type="checkbox" value="" id="flexCheckDisabled" disabled/><label class="form-check-label opacity-100" for="flexCheckDisabled">${resolved.replace("[]", "")}</label></li>`;
        } else if (item.includes("[x]")) {
            return `<li class="list-none ml-5 flex items-start gap-2"><input class="form-check-input appearance-none flex-shrink-0 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-400 checked:border-blue-400 focus:outline-none transition duration-200 mt-1 bg-no-repeat bg-center bg-contain" type="checkbox" value="" id="flexCheckCheckedDisabled" checked disabled/><label class="form-check-label opacity-100" for="flexCheckCheckedDisabled">${resolved.replace("[x]", "")}</label></li>`;
        } else if (item.includes("-")) {
            const text = resolved.replace(/^\s*-\s*/, '');
            return `<li class="list-disc ml-5 font-mono text-sm leading-6">${text}</li>`;
        } else {
            return `<li class="list-disc ml-5 font-mono text-sm leading-6">${resolved}</li>`;
        }
    }

    renderAsElement(): HTMLElement | void {
        
        const value = this.token.value;        
        if (!value) return;

        console.log('Rendering List Block with value:', value);

        let list = value.split("\n");
        let listBlockNode = document.createElement("div");
        const title = list.shift();

        if (list && list.length > 0) {
            let listBlock = `<div class="mt-3">
                <p class="font-mono">${title}</p>
                <ul class="mt-1 ml-2 space-y-1">${list.map(item => this.createListItem(item)).join("")}</ul>
            </div>`;
            listBlockNode.innerHTML = listBlock;
        }
        console.log('Rendered List Block:', listBlockNode);
        return listBlockNode;
    }
}