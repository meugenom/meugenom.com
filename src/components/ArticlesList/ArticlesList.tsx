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
    articlesList: Array<IArticle>;
}
interface IProps {
}


export default class ArticlesList extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = { articlesList: [] }
        this.getArticles()
    }

    async getArticles() {
        const token = Config.token
        const host = Query.articlesList.host
        const query = Query.articlesList.query
        let variables = {}
        const dataType = 'json'

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
