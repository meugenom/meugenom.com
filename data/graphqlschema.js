const schema = `
    type Article {
        id: String,
        date: String,
        title: String,    
        template: String,
        thumbnail: String,
        slug: String,
        categories: String,
        tags: String,
        fileName: String,
        body: String        
    },
    type Query {
        version: String,
        test:  String,
        lastArticlesList: [Article],
        articlesList: [Article],        
        article(slug: String): Article
  }
`
module.exports = schema
