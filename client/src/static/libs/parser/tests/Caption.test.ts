import { Tokenizer } from "../Tokenizer";
import { TokenType } from "../Types";

describe('Caption Tests', () => {
    
    /*
    Test cases:
    1. Full right caption token
    2. Caption token with missing fields
    3. Caption token with extra fields
    4. Caption token with incorrect fields formatting

    Error Handling must be defined but don't break other tests suites and AST Logic
    */
    // Test case for finding captions
    test('full right caption token', () => {
        
        const text = 
        "---\n" +
        "date: 2021-08-30\n" +
        "title: 'How to Write Text'\n" +
        "template: post\n" +
        "thumbnail: './thumbnails/writing.png'\n" +
        "slug: how-to-write-text\n" +
        "tags: instruction texter writer\n" +
        "cluster: how-to-write-text\n" +    
        "order: 0\n" +
        "---\n";

        const tokenizer = new Tokenizer(text);
        const nodes = tokenizer.getAST();
        //Waitng the Elements DOM to be created and the tokens to be generated
        
        
        // testing Caption token about the params
        const captionNode = nodes.children.find(child => child.type === TokenType.CAPTION);

        // type Caption
        expect(captionNode?.type).toBe(TokenType.CAPTION);

        // tokens parameters
        expect(captionNode?.token.date).toEqual("2021-08-30");
        expect(captionNode?.token.title).toEqual("'How to Write Text'");
        expect(captionNode?.token.template).toEqual("post");
        expect(captionNode?.token.thumbnail).toEqual("'./thumbnails/writing.png'");
        expect(captionNode?.token.slug).toEqual("how-to-write-text");
        expect(captionNode?.token.tags).toEqual("instruction texter writer");
        expect(captionNode?.token.cluster).toEqual("how-to-write-text");
        expect(captionNode?.token.order).toEqual("0");
        
        }, 0);
        
    
    /*
    * Test case for finding captions with missing fields
    * @Return UNMARKABLE_BLOCK with Error message about missing fields
    */

    test('caption token with missing fields', () => {
        
        const text = 
            "---\n" +
            "date: 2021-08-30\n" +
            "title: 'How to Write Text'\n" +
            "template: post\n" +
            "thumbnail: './thumbnails/writing.png'\n" +                
            "tags: instruction texter writer\n" +
            "cluster: how-to-write-text\n" +                
            "---\n";

        const tokenizer = new Tokenizer(text);
        const nodes = tokenizer.getAST();
    
        const captionNode = nodes.children[0];
        expect(captionNode?.type).toBe(TokenType.UNMARKABLE);
    });

    /**
     * Test case for finding incorrect fields
     * @Return UNMARKABLE_BLOCK with Error message about incorrect fields
     */

    test('caption token with incorrect fields', () => {
        
        const text = 
            "---\n" +
            "date: 2021-0830\n" +
            "title: 'How to Write Text'\n" +
            "template: post\n" +
            "thumbnail: ./thumbnails/writing.png'\n" +
            "slug: how-to-write text-\n" +
            "tags: instruction texter writer\n" +
            "cluster: -how-to-write-text\n" +    
            "order: a\n" +
            "---\n";

        const tokenizer = new Tokenizer(text);
        const nodes = tokenizer.getAST();
    
        const captionNode = nodes.children[0];
        console.log(captionNode.token.date);
        expect(captionNode?.token.date).toBe("Invalid date format");
        expect(captionNode?.token.thumbnail).toBe("Invalid thumbnail format");
        expect(captionNode?.token.slug).toBe("Invalid slug format");
        expect(captionNode?.token.cluster).toBe("Invalid cluster format");
    });


}); // End of describe block

