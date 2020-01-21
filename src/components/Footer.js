class Bottombar{

    static render(){
        let template =  /*html*/`
        <footer class="footer container">
        <a href="https://ko-fi.com/meugenom" target="_blank" rel="noopener noreferrer">
          Ko-Fi
        </a>        
        <a href="https://twitter.com/meugenom" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        <a href="https://github.com/eugenemdev" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://github.com/eugenemdev/eugenem.dev" target="_blank" rel="noopener noreferrer">
          View source
        </a>
      </footer>
        `
        return template;
    }

}

export default Bottombar;