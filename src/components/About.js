'use strict';

class About {

    static render(){
        return /*html*/`
        <main id="main-content">
            <div class="container">
                <article>
                    <h1> About me</h1>
                        <p>
                            ...
                        </p>
                        <h1>Interesting</h1>
                        <p>
                            ...
                        </p>
                </article>
            </div>    
        </main>                                    
        `        
    }

    static after_render(){
    }
}

export default About;