const { getArticlesList, getArticle, updateArticlesList } = require('./data/articles')
const express = require('express')
const app = express()
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const terminate = require('./data/terminate')
const mySchema = require('./data/graphqlschema')
const schema = buildSchema(mySchema)
const path = require('path')

const root = {
  version: () => 'version 0.0.1',
  test: () => 'All tests were checked!',
  lastArticlesList: () => {
    const lastArticlesList = []
    const list = getArticlesList()
    list.forEach((info, key) => {
      if (key < 5) {
        lastArticlesList.push(info)
      }
    })
    return Promise.resolve(lastArticlesList)
  },
  articlesList: () => {
    return Promise.resolve(getArticlesList())
  },
  article: ({ slug }) => {
    return getArticle(slug)
  }

}

/**
 * https://stackoverflow.com/questions/51227859/react-router-doesnt-work-on-express-server
 */
app.use(express.static('./dist/'))
app.get('*', function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, './dist/') })
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

updateArticlesList()
const server = app.listen(8081, () => console.log('listening on port 8081!'))
const exitHandler = terminate(server, {
  coredump: false,
  timeout: 500
})

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'))
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'))
process.on('SIGTERM', exitHandler(0, 'SIGTERM'))
process.on('SIGINT', exitHandler(0, 'SIGINT'))
