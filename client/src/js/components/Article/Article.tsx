import * as React from 'react'
import Service from '../Service/Service'
import Query from '../Service/Query'

// import parser for markable text
import { Tokenizer } from "../../../static/libs/parser/Tokenizer";
import { Parser } from "../../../static/libs/parser/Parser";
import { View } from "../../../static/libs/parser/View";

// import prismjs
import * as Prism from 'prismjs';

interface IState {
    getAllSpecificationTextByArticleSlug: string
}
interface IProps {
    match: {
        params: {
            slug: string
            }
    }
}


export default class Article extends React.Component< IProps, IState> {

    constructor(props: IProps){
        super(props);
        const slug = this.props.match.params.slug
        this.state = {
            getAllSpecificationTextByArticleSlug:''            
        }

        this.init(slug)

    }

    async init(slug: string){
        await this.getArticle(slug)
        //await this.parse(this.state.getAllSpecificationTextByArticleSlug)
		await this.parse(this.state.getAllSpecificationTextByArticleSlug)
        await Prism.highlightAll()
    }

    parse(article: string){
        
		const tokenizer = new Tokenizer(article);
		
		//console.log(tokenizer.tokens);
		const parser = new Parser(tokenizer.tokens);
		
		//console.log(parser.ast);
		new View(parser.ast);

		//const html = (new View()).render(article)
        //return html
    }

    async getArticle(slug: string){
        const token = ''
        const host = Query.getAllSpecificationTextByArticleSlug.host
        const query = Query.getAllSpecificationTextByArticleSlug.query
        const variables = { "slug": slug }
        const dataType = 'json'

        const response = await new Service().graphql(dataType, token, host, query, variables)
        await this.setState({getAllSpecificationTextByArticleSlug : response.getAllSpecificationTextByArticleSlug})

    }

    render(){
        return (
            <main>
                <div>
                    <article id="article" className='mb-20'/>
                </div>
            </main>
        )
    }
}