const Query = {
    lastArticlesList: {
      host: '/graphql',
      query: '{ lastArticlesList { slug title}}'
    },
    articlesList: {
      host: '/graphql',
      query: '{ articlesList { slug title}}'
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
                      issues(last: 10) {
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
    post: {
      host: '/graphql',
      query: 'query Query($slug: String!) {\n  article(slug: $slug) {\n    body\n  }\n}\n'
    }

  }

export default Query
