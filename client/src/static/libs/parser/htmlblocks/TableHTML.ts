import * as Token from "../Token";
import { TokenType } from "../Types";
import "../static/styles/table.css";

export class TableHTML {
    private token: Token.tableToken;

    constructor(token: Token.tableToken) {
        this.token = token;		        
    }


    private createTableHead(headArray: string[]): string {
        let cells = '';
        headArray.forEach(head => {
            cells += `<th class="px-4 py-2 text-left text-[11px] font-mono font-bold tracking-widest text-slate-500 dark:text-slate-400 border-r last:border-r-0 border-gray-200 dark:border-gray-700">${head.trim()}</th>`;
        });
        return `<thead class="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"><tr>${cells}</tr></thead>`;
    }

    private createTableBody(bodyArray: string[]): string {
        let cells = '';
        bodyArray.forEach(body => {
            cells += `<td class="px-4 py-2 text-[13px] font-mono text-slate-700 dark:text-slate-300 border-r last:border-r-0 border-gray-100 dark:border-gray-700 selection:bg-blue-100 selection:text-blue-900">${body.trim()}</td>`;
        });
        return `<tr class="border-b border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors duration-100">${cells}</tr>`;
    }

    renderAsElement(): HTMLElement {
        const children = this.token.children;
        let thead = '';
        let tbodyRows = '';

        for (let i = 0; i < children.length; i++) {
            let rowArray = children[i].value.split("|");
            rowArray.pop();
            rowArray.shift();

            if (i === 0) {
                thead = this.createTableHead(rowArray);
            } else if (children[i].value.replace(/[\|\-\:\s]/g, '').length > 0) {
                // skip separator rows (---|---|---)
                tbodyRows += this.createTableBody(rowArray);
            }
        }

        // Outer wrapper — drop shadows (same as code block)
        const OuterNode = document.createElement("div");
        OuterNode.className = "code-block-outer my-5";

        // Inner wrapper
        const WrapperNode = document.createElement("div");
        WrapperNode.className = "relative rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden font-mono z-10";

        // Header bar
        const HeaderNode = document.createElement("div");
        HeaderNode.className = "flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700";
        HeaderNode.innerHTML = `<span class="text-[11px] font-mono font-bold uppercase tracking-widest opacity-50">Table</span>`;

        // Scrollable container for horizontal overflow on small screens
        const scrollContainer = document.createElement("div");
        scrollContainer.className = "overflow-x-auto";

        // Table
        const tableNode = document.createElement("table");
        tableNode.className = "w-full text-sm text-left";
        tableNode.innerHTML = `${thead}<tbody>${tbodyRows}</tbody>`;

        scrollContainer.appendChild(tableNode);
        WrapperNode.appendChild(HeaderNode);
        WrapperNode.appendChild(scrollContainer);
        OuterNode.appendChild(WrapperNode);
        
        return OuterNode;
    }

}