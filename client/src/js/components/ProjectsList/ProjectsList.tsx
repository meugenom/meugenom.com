import * as React from 'react'

import Config from './../../Config'
import Query from './../Service/Query'
import Service from '../Service/Service'
import './ProjectsList.scss'

interface IProps {

}

interface IState {
    projectsList: IProject[],
    projectsFilter: IProject[]
}

interface IIssue {
    id: string,
    number: number,
    lastEditedAt: Date,
    bodyText: string
}

interface IRepositoryTopic {
    node: {
        topic: {
            name: string
        }
    }
}

interface IProject {
    node: {
        id: string,
        name: string,
        description: string,
        updatedAt: string,
        hasIssuesEnabled: boolean,
        homepageUrl: string,
        resourcePath: string,
        openGraphImageUrl: string,
        repositoryTopics: {
            edges: IRepositoryTopic[]
        }
        issues: {
            nodes: IIssue[]
        }
    }
}

export default class ProjectsList extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = { projectsList: [], projectsFilter: []}
        this.getProjects()
    }

    async getProjects() {
        const token = Config.token
        const host = Query.projectsList.host
        const query = Query.projectsList.query
        const variables = {}
        const dataType = 'json'
        const response = await new Service().graphql(dataType, token, host, query, variables)
        const projects = await response.user.repositories.edges
        const projectsWithDescription = await projects.filter((project: IProject) => String(project.node.description) !== 'null')
        this.setState({ projectsList: projectsWithDescription})
    }

    openWebPage(event: React.MouseEvent, link: string){
        event.preventDefault();
        window.open(link)
    }

    getMonth (num: number){
        return Config.months[num]
    }

    renderProjectsList() {
        return this.state.projectsList.map((project: IProject, id: number) => {
            return (
                <div key={project.node.id} className="cards-item">
                    <div className="card">
                        <img src={project.node.openGraphImageUrl} className="card-image card-image-fence"/>
                        <div className="card-content">
                            <div className="card-title">
                                {project.node.name}
                            </div>
                            <p className="card-text">
                                {project.node.description} |
                                (updated {new Date(project.node.updatedAt).getDate()}.
                                {this.getMonth(new Date(project.node.updatedAt).getMonth())}.
                                {new Date(project.node.updatedAt).getFullYear()})
                            </p>
                            <button className="btn" onClick= {(e)=>{
                                this.openWebPage(e, "https://github.com" + project.node.resourcePath)
                            }}
                            >to Github's source</button>
                                {project.node.homepageUrl === '' || project.node.homepageUrl == null
                                    ? ''
                                    : <button className="btn" onClick= {(e) =>{
                                        this.openWebPage(e, project.node.homepageUrl)
                                    }}
                                    >to Web page</button>
                                }
                        </div>
                    </div>
                </div>
            )
        })
    }

    // <ProjectsListFilter searchName="javascript" projectsList={this.state.projectsList}/>

    render() {
        return (
            <main id="main-content">
                <div className="container">
                    <article>
                        <h2>Pet Projects</h2>
						<p>
						Pet projects are homemade experiences with programming languages, structures of dates, 
						small challenges that were solved and explained on 
							<a href="https://github.com/eugenemdev"> Github.</a>
						</p>
                        <ul className="cards">
                            {this.renderProjectsList()}
                        </ul>
                    </article>
                </div>
            </main>
        )
    }
}
