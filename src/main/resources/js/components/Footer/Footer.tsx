import * as React from 'react'

export default class Footer extends React.Component<{}> {

    constructor(props: {}){
        super(props);
        }

    public render(){
        return (
            <footer className="footer container">        
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
        )
    }
}
