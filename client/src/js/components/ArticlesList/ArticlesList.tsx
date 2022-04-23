import * as React from "react";
import Service from "../Service/Service";
import Config from "../../Config";
import Query from "../Service/Query";
import { BrowserRouter as Router, Link } from "react-router-dom";

interface IArticle {
  slug: string;
  title: string;
  date: string;
  tags: string;
  id: string;
}

interface IState {
  articlesList: IArticle[];
  classContent: string;
}
interface IProps {}

export default class ArticlesList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { articlesList: [], classContent: "main-content" };

    const token = Config.token;
    const host = Query.articlesList.host;
    const query = Query.articlesList.query;
    const variables = {};
    const dataType = "json";

    this.getArticles(dataType, token, host, query, variables);
  }

  async getArticles(
    dataType: string,
    token: string,
    host: string,
    query: string,
    variables: {}
  ) {
    const response = await new Service().graphql(
      dataType,
      token,
      host,
      query,
      variables
    );
    await this.setState({ articlesList: response.articlesList });
  }

  renderArticlesTags(tags: string) {
    const tagsArray = tags.split(" ");
    return tagsArray.map((tag) => {
      return (
        <Link to={`/tags/${tag}`}
			href="/tags/${tag}"
        	className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-emerald-500  hover:bg-emerald-600 uppercase last:mr-0 mr-1">
          	{tag}
		</Link>
      );
    });
  }

  renderArticlesList() {
    return this.state.articlesList.map((article: IArticle) => {
      return (
        <li className="text-slate-600 hover:text-blue-600" key={article.slug}>
          <Link to={`/article/${article.slug}`}>
            {article.title.substring(1, article.title.length - 1)}
          </Link>
		  &nbsp;
		  &nbsp;
          <span className="tag-container">
            {this.renderArticlesTags(article.tags)}
          </span>
		  &nbsp;
		  &nbsp;
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-blue-400 uppercase last:mr-0 mr-1">
            {article.date}
          </span>
        </li>
      );
    });
  }

  render() {
    return (
      <main id={this.state.classContent}>
        <div className="container">
          <article>
            <h4 className="text-2xl font-normal leading-normal mt-0 mb-2 text-gray-500">
              Articles:
            </h4>
            <ul className="list-decimal">{this.renderArticlesList()}</ul>
          </article>
        </div>
      </main>
    );
  }
}
