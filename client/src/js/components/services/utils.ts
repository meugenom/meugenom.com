/**
 * @autor: meugenom
 * @date: 14.10.2023
 */

class Utils {

  url: string;
  r: string[];
  request: { resource: string | null; id: string | null; verb: string | null; };


    constructor () {
            
      //private case for home page then location.hash is empty and location.pathname is empty
      if(location.hash.slice(1).toLowerCase() == '' && location.pathname.toLowerCase() == '') {
        this.url = '/'
      }else{
        this.url = location.hash.slice(1).toLowerCase() == '' 
          ? location.pathname.toLowerCase() : location.hash.slice(1).toLowerCase();
      }
            
      this.r = this.url.split('/')

      this.request = {
        resource: null,
        id: null,
        verb: null
      }

    }
  
    parseRequestURL () {

      this.request.resource = this.r[1]
      this.request.id = this.r[2]
      this.request.verb = this.r[3]

      return this.request
    }
  }
  
  export default Utils