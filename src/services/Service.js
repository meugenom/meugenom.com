'use strict';
import Config from'../config/Configs';


const dataType = {
    json: 'json',
    text: 'text'
}


let PostService = {
    
    graphql : async (dataType, host, token, query, variables)=> {
        try {            
        let token = Config.token;    
        let response = await fetch(
            host, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
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