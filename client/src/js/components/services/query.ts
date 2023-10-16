import Config from '../../config';

//by development
const Environment = {
	host : Config.localHost
}

if(process.env.APP_MODE == "production"){
	Environment.host = Config.publicHost;
}

const Query = {
    lastArticlesList: {
      host: Environment.host,
      query: '{ lastArticlesList { slug title id date tags}}'
    },
    articlesList: {
		host: Environment.host,
      query: '{ articlesList { slug title id date tags}}'
    },
    projectsList: {
      host: 'https://api.github.com/graphql',
      query: `{
              user(login: "meugenom") {
              email
              location
              websiteUrl
              repositories
              (last: 20,
                  orderBy:
                  {field: STARGAZERS,
                      direction: DESC
                  })
              {
                  edges {
                  node {
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
					  languages(first: 100) {
						nodes {
						  name
						}
					  }
                      repositoryTopics(first: 5) {
                        edges {
                          node {
                            topic {
                              name
                            }
                          }
                        }
                      }
                      issues(last: 5) {
                      nodes {
                          id
                          number
                          lastEditedAt
                          bodyText
                      }
                      }
                  }
                  }
              }
              }
          }
          `
    },
    getAllSpecificationTextByArticleId: {
		  host: Environment.host,
      query: 'query Query($id: Long!) {\n  getAllSpecificationTextByArticleId(id: $id) \n}\n'
    },
	  getAllSpecificationTextByArticleSlug: {
		  host: Environment.host,
		  query: 'query Query($slug: String!) {\n  getAllSpecificationTextByArticleSlug(slug: $slug) \n}\n'
	  },
    articlesListByTag: {
      host: Environment.host,
      query: 'query Query($tag: String!) {\n  articlesListByTag(tag: $tag){id\n title\n date\n tags\n slug\n} \n}\n'
    },    
  }

export default Query
