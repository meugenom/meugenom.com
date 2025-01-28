'use strict';

import Loader from '../loader';

export default class Service {

  async graphql(dataType: string, token: string, host: string, query: string, variables: object) {
    if (!variables) {
      throw new Error('Variables parameter is null or undefined');      
    }
    let response: any;

    // Get page element
    const page: any = document.getElementById('page');

    // Clear all children from the page
    while (page.firstChild) {
      page.removeChild(page.firstChild);
    }

    // Add loader to page
    const loader = new Loader();
    page.appendChild(await loader.render());

    try {
      response = await this.fetchWithRetry(host, token, query, variables, 3);
    } catch (error) {

      // Handle specific error codes or show a generic error message
      switch (response?.status) {
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
          this.showErrorPage(page, 'An unexpected error occurred. Please try again later.');
      }
      return;
    }

    let data;
    try {
      data = (dataType === 'json' ? await response.json() : await response.text());
    } catch (error) {
      console.error(error);
      window.location.href = '/error500';
      return;
    }

    // Check for successful response
    if (!response.ok) {
      this.showErrorPage(page, `Error: ${response.status}`);
      return;
    }

    return data.data;
  }

  async fetchWithRetry(
    url: string,
    token: string,
    query: string,
    variables: any,
    retries: number = 3,
    backoff = 300): Promise<Response> {
    try {
      if (!variables) {
        throw new Error('Variables parameter is null or undefined');
      }
      const response = await fetch(
        url, {
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
        }
      );

      if (!response.ok) throw new Error('Network response was not ok');
      return response;
    } catch (error) {
      if (retries === 0) throw error;

      await this.delay(backoff * Math.pow(2, 3 - retries));      
      
      if (retries === 1){
        throw new Error('Network response was not ok');
      };

      return this.fetchWithRetry(url, token, query, variables, retries - 1, backoff);
    }
  }

  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  showErrorPage(page: any, message: string) {
    // Clear all children from the page
    while (page.firstChild) {
      page.removeChild(page.firstChild);
    }
    
  }
}
