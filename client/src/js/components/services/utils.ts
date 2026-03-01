/**
 * @autor: meugenom
 * @date: 14.10.2023
 */

class Utils {

  public url: string;
  private r: string[];
  private request: { resource: string | null; id: string | null; verb: string | null; };


    constructor () {
            
      //private case for home page then location.hash is empty and location.pathname is empty
      //if(location.hash.slice(1).toLowerCase() == '' && location.pathname.toLowerCase() == '') {
      //  this.url = '/'
      //}else{
      //  this.url = location.hash.slice(1).toLowerCase() == '' 
      //    ? location.pathname.toLowerCase() : location.hash.slice(1).toLowerCase();
      //}
      // Greift jetzt direkt auf den Pfad zu. 
      // Wenn pathname "/" ist, bleibt url "/"
      const path = location.pathname.toLowerCase();
      this.url = path === '' ? '/' : path;
      
      // Splitte den Pfad. 
      // Bei "/article/123" ist r = ["", "article", "123"]
      this.r = this.url.split('/')

      this.request = {
        resource: null,
        id: null,
        verb: null
      }

    }
  
    parseRequestURL () {
      // Da r[0] immer ein leerer String vor dem ersten Slash ist, 
      // fangen wir bei Index 1 an.
      this.request.resource = this.r[1] || null;
      this.request.id = this.r[2] || null;
      this.request.verb = this.r[3] || null;

      return this.request
    }
    
    // lazy loading images
    static async lazyLoadImage(imageElement: HTMLImageElement) {
      
      const loaderElement = document.createElement('div');
      loaderElement.classList.add('imageLoader');
      imageElement.parentNode?.insertBefore(loaderElement, imageElement);
    
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

    
  }
  
  export default Utils