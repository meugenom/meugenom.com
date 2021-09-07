import * as React from 'react'
import Service from '../Service/Service'
import Config from '../../Config'
import Query from '../Service/Query'
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";

interface IArticle {
    slug: string,
    title: string,
    id: string
}
interface IState {
    lastArticlesList: IArticle[]
}



export default class LastArticlesList extends React.Component<{}, IState> {

    constructor(props: {}) {
        super(props);

        this.state = { lastArticlesList: []}

        const token = Config.token
        const host = Query.lastArticlesList.host
        const query = Query.lastArticlesList.query
        const variables = {}
        const dataType = 'json'

        this.getArticles(dataType, token, host, query, variables);
    }

    async getArticles(dataType: string, token: string, host: string, query: string, variables: {}) {
        const response = await new Service().graphql(dataType, token, host, query, variables)
        await this.setState({ lastArticlesList: response.lastArticlesList })
    }

    renderArticlesList() {
        return this.state.lastArticlesList.map((article: IArticle) => {
            return (
                    <li key={article.slug}>
                        <Link to={`/article/${article.id}`}>{article.title}</Link>
                    </li>
            )
        })
    }

    render() {
        return (
            <main id="section-content">
                <div className="container">
                    <article>
                        <h2>List of Last Articles</h2>
                        <ul>
                            {this.renderArticlesList()}
                        </ul>
                    </article>
                </div>
            </main>
        )
    }
}
