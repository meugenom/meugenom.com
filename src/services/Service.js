'use strict';
//const Host = 'http://localhost:8081';
const Host = '';

const defaultHeaders = { "Content-Type": "application/json; charset=utf-8;" };
let Headers = {};

const Request = {
    //GraphQL
    getVersion : '{version}'
}


const dataType = {
    json: 'json',
    text: 'text'
}


let PostService = {
    
    http : async (link, dataType)=> {

        try {
            let response = await fetch(link, { headers: Headers});        
            let data = (dataType == 'json' ? await response.json() : await response.text());                
            return data;                 
          } catch (err) {                    
                location.hash = '#/Error404';
                throw new Error(err.message);                            
          }
    },

    graphql : async (dataType, query, variables)=> {
        try {            
        let response = await fetch(
            '/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },           
            body: JSON.stringify({
                query,
                variables: variables,
              })            
            });
        let data = (dataType == 'json' ? await response.json() : await response.text());                                                 
        //console.log(data.data);
         return data.data;                 
        
        } catch (err) {
            location.hash = '#/Error404';  
            throw new Error(err.message);  
                                    
        }
    }
    
}

export default PostService; 