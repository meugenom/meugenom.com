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

//in functional style
export default function Article() {

  //console.log(window.location.href);

  const { slug } = useParams();
  console.log('slug: ', slug);

  const [specifications, setSpecifications] = React.useState({ spec: "" });


  async function getArticle(slug: string) {
    const token = "";
    const host = Query.getAllSpecificationTextByArticleSlug.host;
    const query = Query.getAllSpecificationTextByArticleSlug.query;
    const variables = { slug: slug };
    const dataType = "json";

    try {

    const response = await new Service().graphql(
      dataType,
      token,
      host,
      query,
      variables
    );

    //specifications = await { spec: response.getAllSpecificationTextByArticleSlug };
    setSpecifications({ spec: response.getAllSpecificationTextByArticleSlug });

  } catch (error) {
    console.error(error);
    // Error saving data
  }
  }

  React.useEffect(() => {
    async function init() {
      await getArticle(slug);
    }

    init();
  }, [slug]);

  React.useEffect(() => {
    if (specifications.spec) {
      const tokenizer = new Tokenizer(specifications.spec);
      const parser = new Parser(tokenizer.tokens);
      new View(parser.ast);
      Prism.highlightAll();
    }
  }, [specifications.spec]);

  return (
    <main>
      <div>
        <article id="article" className="mb-20" />
      </div>
    </main>
  );
}