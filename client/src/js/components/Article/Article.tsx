import * as React from 'react'
import Service from '../Service/Service'
import Query from '../Service/Query'
import './Article.scss'

// import parser for markable text
import View from '../../../static/libs/parser/View'
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
        await this.parse(this.state.getAllSpecificationTextByArticleSlug)
        await Prism.highlightAll()
    }

    parse(article: string){
        const html = (new View()).render(article)
        return html
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
            <main id="main-content">
                <div className="container">
                    <article/>
                </div>
            </main>
        )
    }
}