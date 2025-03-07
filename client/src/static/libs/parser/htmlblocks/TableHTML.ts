import * as Token from "../Token";
import { DomUtilites } from "./DomUtilites";
import "../static/styles/table.css";

export class TableHTML {
    private DomUtilites: DomUtilites;
    private token: Token.tableToken;
    private htmlOutput: HTMLElement;

    constructor(token: Token.tableToken, htmlOutput: HTMLElement) {
        this.token = token;		
        this.htmlOutput = htmlOutput;
        this.DomUtilites = new DomUtilites();
    }

    private createTableHead(headArray: string[]): string {
        let tableHead = `<thead class="text-xs uppercase">
                         <tr>
                         `;
        headArray.forEach(head => {
            tableHead += `<th class="px-6 py-3">
                ${head}
                </th>`;
        });
        return tableHead + '</tr></thead>';
    }

    private createTableBody(bodyArray: string[]): string {
        let tableBody = "<tr>";
        bodyArray.forEach(body => {
            tableBody += `<td class="border px-8 py-4">${body}</td>`;
        });
        return tableBody + '</tr>';
    }

    render(): void {
        const children = this.token.children;
        let table = '';
        let tableNode = this.DomUtilites.createElement("table");
        tableNode.className = "w-full text-sm text-left rtl:text-right";

        for (let i = 0; i < children.length; i++) {
            let rowArray = children[i].value.split("|");
            rowArray.pop();
            rowArray.shift();

            if (i == 0) {
                table += this.createTableHead(rowArray);
            } else {
                table += this.createTableBody(rowArray);
            }
        }

        tableNode.innerHTML = `<tbody>${table}</tbody>`;

        const paragraphNode = this.DomUtilites.createElement("p");
        paragraphNode.appendChild(tableNode);

        const app = this.htmlOutput;
        app?.lastChild?.appendChild(paragraphNode);
    }
}