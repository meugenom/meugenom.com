import * as React from 'react'
import LastArticlesList from '../LastArticlesList/LastArticlesList'
import ProjectsList from '../ProjectsList/ProjectsList'


export default class Home extends React.Component<{}, IState> {

    constructor(props: {}){
        super(props);

        this.state = {}
    }

    public render(): JSX.Element{
        return (
            <div>
                <LastArticlesList/>
                <ProjectsList/>
            </div>
        )
    }
}

// tslint:disable-next-line: no-empty-interface
interface IState {}
