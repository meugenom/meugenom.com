import Config from "../../config";

//by development is default localhost will be used, but in production it will be taken from env variable or fallback to public host
const Environment = {
  host: Config.localHost,
};

const Query = {
  lastArticlesList: {
    host: Environment.host,
    query: "{ lastArticlesList { slug title id date tags cluster order}}",
  },
  articlesList: {
    host: Environment.host,
    query: "{ articlesList { id title date slug tags cluster order}}",
  },
  tagsList: {
    host: Environment.host,
    query: "{ tagsList { name slug}}",
  },
  projectsList: {
    host: Environment.host,
    query: `{
  githubProjects {
    name
    date
    description
    pushedAt
    createdAt
    hasIssuesEnabled
    homepageUrl
    resourcePath
    openGraphImageUrl
    stargazers
    forks
    primaryLanguage
    languages {
      name
    }
    repositoryTopics {
      name
    }
  }
}`,
  },
  getAllSpecificationTextByArticleId: {
    host: Environment.host,
    query:
      "query Query($id: Int!) {\n  getAllSpecificationTextByArticleId(id: $id) \n}\n",
  },
  getAllSpecificationTextByArticleSlug: {
    host: Environment.host,
    query:
      "query Query($slug: String!) {\n  getAllSpecificationTextByArticleSlug(slug: $slug) \n}\n",
  },
  articlesListByTag: {
    host: Environment.host,
    query:
      "query Query($tag: String!) {\n  articlesListByTag(tag: $tag){id\n title\n date\n tags\n slug\n cluster\n order\n} \n}\n",
  },
  searchArticles: {
    host: Environment.host,
    query:
      "query Query($term: String!) {\n  searchArticles(term: $term){ id title slug date tags cluster order }\n}\n",
  },
};

export default Query;
