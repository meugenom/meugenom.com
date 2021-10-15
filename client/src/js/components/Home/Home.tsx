import * as React from 'react'
import LastArticlesList from '../LastArticlesList/LastArticlesList'
import ProjectsList from '../ProjectsList/ProjectsList'
import SocialLinks from '../SocialLinks/SocialLinks'


export default class Home extends React.Component<{}, IState> {

    constructor(props: {}){
        super(props);

        this.state = {}
    }

    public render(): JSX.Element{
        return (
            <div id="main-content">
                <h2> Zervus! I'm Eugen </h2>
                            <p>
							I'm a <strong>software developer</strong> writing about things that will maybe interesting for you: 							
							<strong> data structures</strong>, <strong>Java</strong>, <strong>Javascript</strong>, and Python.
							Every day is special to do something useful for yourself, so don't lose it.
							This site is <strong>a little sandbox</strong> where I write my code. 
								<p>
								Follow me if you need my help or have questions:
								</p>
                            </p>
                            <div className="social-buttons">
                                <SocialLinks/>
                            </div>
                <LastArticlesList/>
                <ProjectsList/>
            </div>
        )
    }
}

// tslint:disable-next-line: no-empty-interface
interface IState {}
