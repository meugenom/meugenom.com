import * as React from 'react'
import ArticlesList from '../ArticlesList/ArticlesList'
import ProjectsList from '../ProjectsList/ProjectsList'


export default class Home extends React.Component<{}, IState> {

    constructor(props: {}){
        super(props);

        this.state = {
            currentTask: "",
            tasks: [],
        }
    }

    public render(): JSX.Element{
        return (
            <div>
                <ArticlesList/>
                <ProjectsList/>
            </div>
        )
    }
}

interface IState {
    currentTask: string;
    tasks: Array<ITask>;    
    
}

interface ITask {
    id: number;
    value: string;
    completed: boolean
}

