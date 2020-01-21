'use strict';
//const Host = 'http://localhost:3000';
const Host = '';
const Headers = { "Content-Type": "application/json; charset=utf-8;" };
const Request = {
    getList     : '/getList',
    getLastList : '/getLastList',
    updateList  : '/updateList',
    getPost     : '/post/'
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
                location.hash = '#/Error500';
                throw new Error(err.message);                            
          }
    },

    getList :  () => {        
        let link = Host + Request.getList;        
        return PostService.http(link, dataType.json);                
    },

    getLastList : () => {                
        let link = Host + Request.getLastList;        
        return PostService.http(link, dataType.json);
    },
    
    updateList : () => {
        let link = Host + Request.updateList;         
        return PostService.http(link, dataType.json);
    },

    getPost : async (param) => {        
        let link = Host + Request.getPost  + param        
        return PostService.http(link, dataType.text)
    }

}

export default PostService;

