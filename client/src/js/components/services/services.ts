import Loader from '../loader';

export default class Service {

  async graphql(dataType: string, token: string, host: string, query: string, variables: object) {

    let response: any;

    //get page element
    const page : any = document.getElementById('page');

    //delete from page all children
    while (page.firstChild) {
      page.removeChild(page.firstChild);
    }

    //add loader to page
    const loader = new Loader();
    page.appendChild(await loader.render());

    //try{
      response = await fetch(
        host, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          query,
          variables
        })
      })
    
    let data;
    try {
      if (response){  
        console.log(response.status);        
        
        switch (response.status) {
          case 404:
            window.history.pushState({}, '404', window.location.origin + '/error404');          
            break;
          case 500:
            window.history.pushState({}, '500', window.location.origin + '/error500');          
            break;
          case 502:            
            window.history.pushState({}, '502', window.location.origin + '/error502');             
            break;
          default:
            //window.history.pushState({}, '404', window.location.origin + '/error404');          
            break;
        }
           
        //data = await response.json();
        data = await (dataType === 'json' ? response.json() : await response.text());
      }
    
    } catch (error) {      
      
      return;
    }
    
    return data.data;
  }
}