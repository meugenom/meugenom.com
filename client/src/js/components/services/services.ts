'use strict'

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



    try {
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
    } catch (error) {
      console.log(error);
      window.location.href = '/'+error;
      return;
    }

    let data;
    try {

      data = (dataType === 'json' ? await response.json() : await response.text());            

    } catch (error) {
      
      console.log(error);

      //switch case for error codes 404, 502, 500

      switch (response.status) {
        case 404:
          window.location.href = '/error404';
          break;
        case 500:
          window.location.href = '/error500';
          break;
        case 502:
          window.location.href = '/error502';
          break;
        default:
          window.location.href = '/error404';
          break;
      }
      return;
    }
    // need to check for error 200-299
    if (!response.ok) {
      window.location.href = '/error502';
      return;
    }    
    
    return data.data;
  }
}