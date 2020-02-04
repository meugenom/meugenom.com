const { getArticlesList, getArticle,  addArticle, updateArticlesList} = require("./data/articles");
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const schema = buildSchema(`
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
`);

const root = { 
    version: () => 'version 0.0.1' ,
    test: () => 'All tests were checked!',
    lastArticlesList: ()=>{                    
                let lastArticlesList = [];
                let list = getArticlesList();
                list.forEach((info, key) => {
                    if(key < 5){
                    lastArticlesList.push(info);
                }            
            })
            return Promise.resolve(lastArticlesList);
            },
    articlesList: ()=>{
        return Promise.resolve(getArticlesList());
    },
    article: ({slug}) => {                      
        return getArticle(slug);
      }, 

};

const terminate = require('./data/terminate');
const app = express();
app.use(express.static('./dist/'));


/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
*/

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

updateArticlesList();
const server = app.listen(8081, () => console.log('listening on port 8081!'));
const exitHandler = terminate(server, {
  coredump: false,
  timeout: 500
});

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
process.on('SIGINT', exitHandler(0, 'SIGINT'));