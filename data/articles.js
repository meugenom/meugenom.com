const fs = require('fs');
const path = require('path');
const dir = './../content/posts';
const dirFromRoot = './content/posts';

let directoryPath = path.join(__dirname, dir);
let deltaTime =0;
let articlesList = [];  

/**
 * @returns short information about articles 
 * @todo need to refactor later
 */

const updateArticlesList = () => {    
          
    let startTime = (new Date()).getTime();

    fs.readdir(directoryPath, function (err, files) {        
        if (err) {            
            console.err('Unable to scan directory: ' + err);
        }
            
        files.forEach((fileName, fileIndex) => {            
            fs.readFile(dirFromRoot +'/'+ fileName , 'utf8', function(err, contents) {
                if (err) {            
                    console.err('Can\'t read file: ' + err);
                }
                let post = {};
                post.fileName = fileName;      
                post.body = contents;                 

                let lines = contents.split('\n');
                let newPostTrigger = false;
                                                  

                    lines.forEach(line => {                                                 
                                                
                        if (line === '---'){
                            if(newPostTrigger == true){
                                newPostTrigger = false;                                                                
                                articlesList.push(post);                                 
                            }else{
                                newPostTrigger = true;                                                        
                            }                            
                        }
                        
                        if(newPostTrigger){                                                                     
                            let words = line.split(' ');                                                        
                            if(words[0] === 'title:') post.title = line.replace(/title: /,'').replace(/'/g,'');                                                        
                            if(words[0] === 'categories:') post.categories = line.replace(/categories:/, '');
                            if(words[0] === 'tags:') post.tags = line.replace(/tags:/, '')                                                                                                      
                            if(words[0] === 'template:') post.template = words[1];
                            if(words[0] === 'thumbnail:') post.thumbnail = words[1];
                            if(words[0] === 'slug:') post.slug = words[1];                                                                        
                            if(words[0] === 'date:') {
                                                        
                                let day = (words[1]).slice(-2);
                                let month = (words[1]).slice(5, -3);
                                let year = (words[1]).slice(0, -6);
                                post.date  = new Date(year, month, day);
                                                            
                            }                  
                        }   

                    });
                                    
                    if(fileIndex == files.length - 1){                                                                
                        let endTime = (new Date()).getTime();                                                  
                        deltaTime = endTime - startTime;                         
                        console.log( ' time of list update is ' + deltaTime + ' ms');                                                                         
                    }
                    
            });                        
        });        
    }); 

}
 
/**
 * @todo new feature 
 */
const addArticle = () => {
    console.log('Add new article to store')
} 

const getArticle = (slug) => {    
        return articlesList.find(p => p.slug === slug);
}

const getArticlesList = () => {    
    return articlesList;
  };
  
  module.exports = {
    getArticlesList,
    addArticle,
    updateArticlesList,
    getArticle
  };
  