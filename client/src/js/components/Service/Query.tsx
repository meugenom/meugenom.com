//by development
const Environment = {
	host : 'http://localhost:8080/graphql/'
}

console.log("APP_MODE = "+process.env.APP_MODE)

if(process.env.APP_MODE == "production"){
	Environment.host = 'https://meugenom.com/graphql/';
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
                  {field: UPDATED_AT,
                      direction: DESC
                  })
              {
                  edges {
                  node {
                      id
                      name
                      description
                      updatedAt
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
	  }

  }

export default Query
