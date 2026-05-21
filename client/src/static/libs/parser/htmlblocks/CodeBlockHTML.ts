'use strict'
import * as Token from "../Token";

// Cache for Shiki highlighter instance to avoid re-initialization on every code block render.
let cachedHighlighter: any = null;

async function getShikiHighlighter() {
    if (cachedHighlighter) {
        return cachedHighlighter;
    }

    //const shiki = await import('shiki');
    const shiki = await import(/* webpackChunkName: "shiki-core" */ 'shiki');
    
    // Initialize Shiki with a reasonable set of languages and themes.    
    cachedHighlighter = await shiki.createHighlighter({
        themes: ['github-light', 'github-dark'],
        langs: ['c', 'cpp', 'java', 'json', 'bash', 'python', 'javascript', 'typescript', 'sql', 'yaml', 'markdown', 'xml', 'css']
    });

    return cachedHighlighter;
}

export class CodeBlockHTML {
  
    private token: Token.codeBlockToken;
    
    constructor(token: Token.codeBlockToken) {
        this.token = token; 
    }

    renderAsElement() : HTMLElement {
        const lang = this.token.language || 'text';
        let rawCode = this.token.code;

        // Remove newline at the start
        if (rawCode.startsWith('\n')) {
            rawCode = rawCode.slice(1);
        }

        const lines = rawCode.split('\n');
        if (lines[lines.length - 1] === '') lines.pop();        

        // 1. Main containers
        const OuterNode = document.createElement("div");
        OuterNode.className = "code-block-outer my-5";

        const WrapperNode = document.createElement("div");
        WrapperNode.className = "relative rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden font-mono z-10 bg-white dark:bg-[#1e293b]";

        // 2. Header
        const HeaderNode = document.createElement("div");
        HeaderNode.className = "flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700";
        HeaderNode.innerHTML = `
            <span class="text-[11px] font-mono font-bold uppercase tracking-widest opacity-50 text-slate-700 dark:text-slate-300">${lang}</span>
            <button class="code-copy-btn text-[11px] font-mono opacity-50 hover:opacity-100 transition-opacity text-slate-700 dark:text-slate-300" title="Copy code">
                copy
            </button>
        `;

        // 3. Body (Columns for line numbers and code)
        const BodyNode = document.createElement("div");
        BodyNode.className = "flex overflow-x-auto";

        // Line numbers column
        const LineNumsNode = document.createElement("div");
        LineNumsNode.className = "select-none text-right leading-6 pr-4 pl-3 py-4 text-[13px] text-slate-400 dark:text-slate-600 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex-shrink-0";
        LineNumsNode.innerHTML = lines.map((_, i) => `<div>${i + 1}</div>`).join('');

        // Code container (Shiki will insert its HTML here)
        const CodeContainer = document.createElement("div");
        CodeContainer.className = "flex-1 min-w-0"; 
        
        // While Shiki is loading, show raw text to avoid layout "jump"
        CodeContainer.innerHTML = `<pre class="leading-6 p-4 bg-transparent text-[13px]"><code>${rawCode}</code></pre>`;

        BodyNode.appendChild(LineNumsNode);
        BodyNode.appendChild(CodeContainer);

        WrapperNode.appendChild(HeaderNode);
        WrapperNode.appendChild(BodyNode);
        OuterNode.appendChild(WrapperNode);

        // 4. Lazy Shiki highlighting
        getShikiHighlighter().then(highlighter => {
            // Shiki's codeToHtml returns a full <pre><code> block, so we need to extract the inner HTML to insert into our CodeContainer.            
            const shikiHtml = highlighter.codeToHtml(rawCode, { 
                lang: lang,
                themes: { light: 'github-light', dark: 'github-dark' }
            });
            
            CodeContainer.innerHTML = shikiHtml;
            
            const shikiPre = CodeContainer.querySelector('pre');            
            if (shikiPre) {
                shikiPre.style.backgroundColor = 'transparent';
                shikiPre.className = "leading-6 p-4 text-[13px] overflow-x-auto !bg-transparent";               

                const shikiCode = shikiPre.querySelector('code');
                if (shikiCode) {
                    shikiCode.style.backgroundColor = 'transparent';
                    shikiCode.className ="leading-6 text-[13px] !bg-transparent";
                }
            }
        }).catch((err: any) => {
            console.error('Shiki loading error:', err);
        });

        // 5. Copy logic
        const copyBtn = HeaderNode.querySelector('.code-copy-btn') as HTMLButtonElement;
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(lines.join('\n')).then(() => {
                    copyBtn.textContent = 'copied!';
                    setTimeout(() => { copyBtn.textContent = 'copy'; }, 2000);
                });
            });
        }
        
        return OuterNode;
    }
}