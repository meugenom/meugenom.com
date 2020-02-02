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
        article(title: String): Article
  }
`);

var root = { 
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
    article: ({title}) => {                 
        return getArticle(title);
      }, 

};


const app = express();
app.use(express.static('./../dist/'));

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

/**
 * @todo all REST to delete 
 */


app.get('/getList', (req, res) => {    
    res.header("Access-Control-Allow-Origin", "*");
    res.send(getArticlesList());
    
});


app.get('/getLastList', (req, res) => {    
    res.header("Access-Control-Allow-Origin", "*");
    
    let lastList = [];

    getArticlesList().forEach((post, key) => {
        if(key < 5){
            lastList.push(post);
        }
    }) 

    res.send(lastList);
    
});


// time code stub for REST Frontend 
app.get('/post/:id', async function (req, res){
    
    // Retrieve the tag from our URL path
    let id = req.params.id;
    let fileName = id + '.md';
    
    res.send( (getArticlesList().find(p => p.fileName === fileName)).body);        
    
});


updateArticlesList();
app.listen(81, () => console.log('listening on port 81!'));