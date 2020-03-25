import * as React from 'react'
import Service from '../Service/Service'
import Query from '../Service/Query'

// import parser for markable text
import View from '../../../libs/parser/View'
// import prismjs
import * as Prism from 'prismjs';

interface IState {
    article: {
        body: string
    }
}
interface IProps {
    match: {
        params: {
            id: string
            }
    }
}


export default class Article extends React.Component< IProps, IState> {

    constructor(props: IProps){
        super(props);
        const id = this.props.match.params.id
        this.state = {
            article: {
                body: ''
            }
        }

        this.init(id)

    }

    async init(id: string){
        await this.getArticle(id)
        await this.parse(this.state.article.body)
        await Prism.highlightAll()
    }

    parse(article: string){
        const html = (new View()).render(article)
        return html
    }

    async getArticle(id: string){
        const token = ''
        const host = Query.post.host
        const query = Query.post.query
        const variables = { "slug": id }
        const dataType = 'json'

        const response = await new Service().graphql(dataType, token, host, query, variables)
        await this.setState({article : response.article})

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