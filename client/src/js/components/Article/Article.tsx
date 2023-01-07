import * as React from "react";
import { useParams } from "react-router-dom";
import Service from "../Service/Service";
import Query from "../Service/Query";

// import parser for markable text
import { Tokenizer } from "../../../static/libs/parser/Tokenizer";
import { Parser } from "../../../static/libs/parser/Parser";
import { View } from "../../../static/libs/parser/View";

// import prismjs
import * as Prism from "prismjs";



export default function Article() {
  const { slug } = useParams();
  console.log(slug)
  let specifications = {
    spec: "",
  };




  async function getArticle(slug: string) {
    const token = "";
    const host = Query.getAllSpecificationTextByArticleSlug.host;
    const query = Query.getAllSpecificationTextByArticleSlug.query;
    const variables = { slug: slug };
    const dataType = "json";

    const response = await new Service().graphql(
      dataType,
      token,
      host,
      query,
      variables
    );

    specifications = await { spec: response.getAllSpecificationTextByArticleSlug };
  }

  function parse(article: string) {

    const tokenizer = new Tokenizer(article);

    //console.log(tokenizer);
    const parser = new Parser(tokenizer.tokens);

    //console.log(parser.ast);
    new View(parser.ast);

  }

  async function init(slug: string) {
    await getArticle(slug);
    await parse(specifications.spec);
    await Prism.highlightAll();
  }
  
  //start init
  init(slug);

  return (
    <main>
      <div>
        <article id="article" className="mb-20" />
      </div>
    </main>
  );
}