import * as React from 'react'

export default class Error404 extends React.Component<{}> {

    constructor(props: {}){
        super(props);
        }

    public render(){
        return (
            <main id="main-content">
            <div className="container">
                <article>
                    <img src="../images/404.svg" 
                        alt="404-error"/>
                </article>
            </div>
        </main>
        )
    }
}
