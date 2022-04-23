const Query = {
    lastArticlesList: {
      host: 'http://localhost:8080/graphql/', //https://meugenom.com/graphql/
      query: '{ lastArticlesList { slug title id date tags}}'
    },
    articlesList: {
      host: 'http://localhost:8080/graphql/', //https://meugenom.com/graphql/
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
              (last: 15,
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
      host: 'http://localhost:8080/graphql/', //https://meugenom.com/graphql/
      query: 'query Query($id: Long!) {\n  getAllSpecificationTextByArticleId(id: $id) \n}\n'
    },
	getAllSpecificationTextByArticleSlug: {
		host: 'http://localhost:8080/graphql/', //https://meugenom.com/graphql/
		query: 'query Query($slug: String!) {\n  getAllSpecificationTextByArticleSlug(slug: $slug) \n}\n'
	  }

  }

export default Query
