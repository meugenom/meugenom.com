import Config from "../../config";

//by development is default localhost will be used, but in production it will be taken from env variable or fallback to public host
const Environment = {
  host: Config.localHost,
};

if (process.env.APP_MODE == "production") {
  Environment.host = process.env.GRAPHQL_HOST;
}

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
    host: "https://api.github.com/graphql",
    query: `{
    search(
      query: "user:${process.env.GITHUB_USER_NAME} topic:portfolio",
      type: REPOSITORY,
      last: 20
    ) {
      edges {
        node {
          ... on Repository {
            id
            name
            description
            updatedAt
            pushedAt
            createdAt
            hasIssuesEnabled
            homepageUrl
            resourcePath
            openGraphImageUrl
            stargazers {
              totalCount
            }
            forks {
              totalCount
            }
            primaryLanguage {
              name
            }
            languages(first: 6) {
              nodes {
                name
              }
            }
            repositoryTopics(first: 7) {
              edges {
                node {
                  topic {
                    name
                  }
                }
              }
            }
          }
        }
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
