import * as React from 'react'
import Service from '../Service/Service'
import Query from '../Service/Query'
import './Article.scss'

// import parser for markable text
import View from '../../../../resources/static/libs/parser/View'
// import prismjs
import * as Prism from 'prismjs';

interface IState {
    getAllSpecificationTextByArticleId: string
}
interface IProps {
    match: {
        params: {
            id: number
            }
    }
}


export default class Article extends React.Component< IProps, IState> {

    constructor(props: IProps){
        super(props);
        const id = this.props.match.params.id
        this.state = {
            getAllSpecificationTextByArticleId:''            
        }

        this.init(id)

    }

    async init(id: number){
        await this.getArticle(id)
        await this.parse(this.state.getAllSpecificationTextByArticleId)
        await Prism.highlightAll()
    }

    parse(article: string){
        const html = (new View()).render(article)
        return html
    }

    async getArticle(id: number){
        const token = ''
        const host = Query.getAllSpecificationTextByArticleId.host
        const query = Query.getAllSpecificationTextByArticleId.query
        const variables = { "id": id }
        const dataType = 'json'

        const response = await new Service().graphql(dataType, token, host, query, variables)
        await this.setState({getAllSpecificationTextByArticleId : response.getAllSpecificationTextByArticleId})

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