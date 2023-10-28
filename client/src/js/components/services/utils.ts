/**
 * @autor: meugenom
 * @date: 14.10.2023
 */

import './lazyLoading.css'

class Utils {

  public url: string;
  private r: string[];
  private request: { resource: string | null; id: string | null; verb: string | null; };


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
    
    // lazy loading images
    static async lazyLoadImage(imageElement: HTMLImageElement) {
      
      const loaderElement = document.createElement('div');
      loaderElement.classList.add('imageLoader');
      imageElement.parentNode.insertBefore(loaderElement, imageElement);
    
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              try {
                loaderElement.style.display = 'block'; // Show the loader
    
                const response = await fetch(img.dataset.src);
                if (response.ok) {
                  const blob = await response.blob();
                  const objectURL = URL.createObjectURL(blob);
                  img.src = objectURL;
                }
              } catch (error) {
                console.error('Error loading image:', error);
              } finally {
                loaderElement.style.display = 'none'; // Hide the loader
              }
            }
            observer.unobserve(img);
          }
        });
      });
    
      observer.observe(imageElement);
    }

    
    static async _lazyLoadImage(imageElement: HTMLImageElement) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              const response = await fetch(img.dataset.src);
              if (response.ok) {
                const blob = await response.blob();
                const objectURL = URL.createObjectURL(blob);
                img.src = objectURL;
              }
            }
            observer.unobserve(img);
          }
        });
      });
    
      observer.observe(imageElement);
    }
  }
  
  export default Utils