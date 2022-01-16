import * as React from 'react'

export default class Footer extends React.Component<{}> {

    constructor(props: {}){
        super(props);
        }

    public render(){
        return (
            <footer className="footer container">                        
                <a href="https://github.com/meugenom" target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>
                <a href="https://github.com/meugenom/meugenom.com" target="_blank" rel="noopener noreferrer">
                    View source
                </a>                
                <a>
                    &copy; 2021 eugenem.dev
                </a> 
                
            </footer>
        )
    }
}
