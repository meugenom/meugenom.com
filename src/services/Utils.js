const Utils = {     
    parseRequestURL : () => {        
        //let url = location.hash.slice(1).toLowerCase() || '/';
        //let url = location.hash.toLowerCase() || '/';          
        //let url = window.location.href.replace(/#\//, '');

        let url = location.hash.replace(/#\//, '')
        let r = url.split("/")
        let request = {
            resource    : null,
            id          : null,
            verb        : null
        }

        //request.resource    = r[3]
        //request.id          = r[4]
        //request.verb        = r[5]                
        
        request.resource    = r[0]
        request.id          = r[1]
        request.verb        = r[2]                            

        //window.history.replaceState('', document.title, url);

        return request
        
    }

    // --------------------------------
    //  Simple sleep implementation
    // --------------------------------
    , sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default Utils;