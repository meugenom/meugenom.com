const Query = {
    lastArticlesList: {
      host: '/graphql',
      query: '{ lastArticlesList { slug title id}}'
    },
    articlesList: {
      host: '/graphql',
      query: '{ articlesList { slug title id}}'
    },    
    projectsList: {
      host: 'https://api.github.com/graphql',
      query: `{
              user(login: "eugenemdev") {
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
                      hasIssuesEnabled
                      homepageUrl
                      resourcePath
                      openGraphImageUrl
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
      host: '/graphql',
      query: 'query Query($id: Long!) {\n  getAllSpecificationTextByArticleId(id: $id) \n}\n'
    }

  }

export default Query
