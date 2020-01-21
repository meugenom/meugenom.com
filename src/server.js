const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

//const Config  = require('./config/Configs.js');

const dir = './../content/posts/';
//const dir = Config.dir;
let directoryPath = path.join(__dirname, dir);

let deltaTime =0;


app.use(express.static('./../dist/'));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


let postUpdate = () => {    
    let posts = [];
    let startTime = (new Date()).getTime();
    
    fs.readdir(directoryPath, function (err, files) {        
        if (err) {            
            res.send('Unable to scan directory: ' + err);
        }
            
    
        files.forEach((fileName, fileIndex) => {            

            fs.readFile(dir + fileName , 'utf8', function(err, contents) {
                
                let lines = contents.split('\n');
                let newPostTrigger = false;
                let postInfo = {};                                        

                    lines.forEach(line => {                                                 
                                                
                        if (line === '---'){
                            if(newPostTrigger == true){
                                newPostTrigger = false;                                                                
                                posts.push(postInfo);                                 
                            }else{
                                newPostTrigger = true;                                                        
                            }                            
                        }
                        
                        if(newPostTrigger){
                            
                            let words = line.split(' ');                            
                            if(words[0] === 'title:') postInfo.title = line.replace(/title:/,'').replace(/'/g,'');                                                        
                            if(words[0] === 'categories:') postInfo.categories = line.replace(/categories:/, '');
                            if(words[0] === 'tags:') postInfo.tags = line.replace(/tags:/, '')                                                                                                      
                            if(words[0] === 'template:') postInfo.template = words[1];
                            if(words[0] === 'thumbnail:') postInfo.thumbnail = words[1];
                            if(words[0] === 'slug:') postInfo.slug = words[1];                                                                        
                            if(words[0] === 'date:') {
                                                        
                                let day = (words[1]).slice(-2);
                                let month = (words[1]).slice(5, -3);
                                let year = (words[1]).slice(0, -6);
                                postInfo.date  = new Date(year, month, day);
                                                            
                            }                  
                        }   

                    });
                                    
                    if(fileIndex == files.length - 1){                                        
                        list = posts;
                        let endTime = (new Date()).getTime();                          
                        deltaTime = endTime - startTime; 
                        console.log( ' time of list update is ' + deltaTime + ' ms')                                                                                
                    }
                    
            });                        
        });        
    });
    

}



let list = [];
postUpdate();



app.get('/getList', (req, res) => {    
    res.header("Access-Control-Allow-Origin", "*");
    res.send(list);
    
});

app.get('/getLastList', (req, res) => {    
    res.header("Access-Control-Allow-Origin", "*");
    
    let lastList = [];

    list.forEach((post, key) => {
        if(key < 5){
            lastList.push(post);
        }
    }) 

    res.send(lastList);
    
});

app.get('/updateList', (req, res) => {    
    res.header("Access-Control-Allow-Origin", "*");
    
    let p1 = new Promise(function(resolve, reject) {       
        let update = postUpdate();
        resolve(update);
        let endTime = (new Date()).getTime();                    
        res.send('List of posts updated for '+ deltaTime + ' ms');    
        deltaTime = 0;
      });          
});

app.get('/post/:id', async function (req, res){
    
    // Retrieve the tag from our URL path
    let id = req.params.id;
    id = id + '.md';

    fs.readdir(directoryPath, function (err, files) {        
        if (err) {            
            res.send('Unable to scan directory: ' + err);
        }                 

        files.forEach((fileName) => {   
            if (fileName == id){
                fs.readFile(dir + fileName , 'utf8', function(err, contents) {                
                    res.send(contents);
                });                        
            }
        });        
    });

            
    
});

app.listen(3000, () => console.log('listening on port 3000!'));