
class Error500 {
  static render () {
    return /* html */`
        <main id="main-content">
            <div class="container">
                <article>                    
                <img src="./images/500.svg" 
                    alt="500-error"/>
                </article>
            </div>
        </main>                
    `
  }

  static afterRender () {

  }
}

export default Error500
