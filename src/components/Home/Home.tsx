import * as React from 'react'
import LastArticlesList from '../LastArticlesList/LastArticlesList'
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
            <div id="main-content">
                <h1> I'm Eugen </h1>
                            <p>
                                I'm a web developer writing about Javascript,
                                Python, Java and all things which are interesting and maybe incredible.
                            </p>
                            <div className="social-buttons">
                                Social Buttons ... (under construction)
                            </div>
                <LastArticlesList/>
                <ProjectsList/>
            </div>
        )
    }
}

interface IState {
    currentTask: string;
    tasks: ITask[];

}

interface ITask {
    id: number;
    value: string;
    completed: boolean
}

