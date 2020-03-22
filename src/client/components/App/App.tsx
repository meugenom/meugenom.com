import * as React from 'react'
import { Switch, Route, Link } from 'react-router-dom';
import Home from '../Home/Home'
import ArticlesList from '../ArticlesList/ArticlesList'
import ProjectsList from '../ProjectsList/ProjectsList'
import About from '../About/About'
import Article from '../Article/Article'
import Error404 from '../Error404/Error404'


interface IState {
    currentTask: string;
    tasks: ITask[];

}

interface ITask {
    id: number;
    value: string;
    completed: boolean
}


export default class App extends React.Component<{}, IState> {

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
              <nav className="nav">
                        <div className="nav-container">
                            <div className="brand">
                                <Link to="/">
                                    <img 
                                    // tslint:disable-next-line: jsx-alignment
                                    src="../../images/face-splash-maske.svg" alt="face-splash" className="favicon"
                                    />
                                </Link>
                            </div>
                            <div className="links">
                                <Link to="/">Home</Link>
                                <Link to="/articles">Articles</Link>
                                <Link to="/projects">Projects</Link>
                                <Link to="/about">About</Link>
                            </div>
                        </div>
            </nav>
                <Switch>
                    <Route exact={true} path="/" component={Home} />
                    <Route path="/articles" component={ArticlesList} />
                    <Route path="/projects" component={ProjectsList} />
                    <Route path="/about" component={About} />
                    <Route path='/post/:id' component={Article} />
                    <Route component={Error404} />
                </Switch>
              </div>
        )
    }
}

