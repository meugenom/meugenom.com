import * as React from 'react'
import Config from './../../Config'
import Query from './../Service/Query'
import Service from '../Service/Service'
import './ProjectsList.scss'

interface IState {
    projectsList: IProject[],
    count: number
}

interface IIssue {
    id: string,
    number: number,
    lastEditedAt: Date,
    bodyText: string
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
        issues: {
            nodes: IIssue[]
        }
    }
}

export default class ProjectsList extends React.Component<{}, IState> {

    constructor(props: {}) {
        super(props);
        this.state = { projectsList: [], count: 0}
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
        const projectsWithoutDescription = await projects.filter((project: IProject) => String(project.node.description) != 'null')
        this.setState({ projectsList: projectsWithoutDescription})
    }

    // String(project.node.description) != 'null'

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
                                (updated {new Date(project.node.updatedAt).getDate()}/
                                {new Date(project.node.updatedAt).getMonth()}/
                                {new Date(project.node.updatedAt).getFullYear()})
                            </p>
                            <button className="btn btn-block card-btn"><a href={"https://github.com" + project.node.resourcePath}>to source</a></button>
                                {project.node.homepageUrl === '' || project.node.homepageUrl == null
                                    ? ''
                                    : <button className="btn btn-block card-btn"><a href={project.node.homepageUrl}>to website</a></button>
                                }
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <main id="main-content">
                <div className="container">
                    <article>
                        <h2>Open Source Projects</h2>
                        <ul className="cards">
                            {this.renderProjectsList()}
                        </ul>
                    </article>
                </div>
            </main>
        )
    }
}
