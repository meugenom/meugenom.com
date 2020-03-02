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
}
interface IState {
    articlesList: IArticle[];
}
interface IProps {}


export default class ArticlesList extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = { articlesList: [] }

        const token = Config.token
        const host = Query.articlesList.host
        let query = Query.articlesList.query
        const variables = {}
        const dataType = 'json'

        // when route is '/' and using 5 last articles
        if (props === null){
            query = Query.lastArticlesList.query
        }

        this.getArticles( dataType, token, host, query, variables);
    }

    async getArticles(dataType: string, token: string, host: string, query: string, variables: {}) {
        const response = await new Service().graphql(dataType, token, host, query, variables)
        await this.setState({ articlesList: response.articlesList })
    }

    renderArticlesList() {
        return this.state.articlesList.map((article: IArticle) => {
            return (
                    <li key={article.slug}>
                        <Link to={`/post/${article.slug}`}>{article.title}</Link>
                    </li>
            )
        })
    }

    render() {
        return (
            <main id="main-content">
                <div className="container">
                    <article>
                        <h2>List of Articles</h2>
                        <ul>
                            {this.renderArticlesList()}
                        </ul>
                    </article>
                </div>
            </main>
        )
    }
}
