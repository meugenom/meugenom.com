import * as React from 'react'
import Config from './../../Config'
import Query from './../Service/Query'
import Service from '../Service/Service'

interface IState {
    projectsList: Array<IProject>;
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
        issues: {
            nodes: Array<IIssue>
        }
    }
}

export default class ProjectsList extends React.Component<{}, IState> {

    constructor(props: {}) {
        super(props);
        this.state = { projectsList: [] }
        this.getProjects()
    }

    async getProjects() {
        const token = Config.token
        const host = Query.projectsList.host
        const query = Query.projectsList.query
        let variables = {}
        const dataType = 'json'
        const response = await new Service().graphql(dataType, token, host, query, variables)        
        this.setState({ projectsList: response.user.repositories.edges})
    }

    renderProjectsList() {
        return this.state.projectsList.map((project: IProject, id: number) => {
            
            project.node.resourcePath = 'https://github.com/' + project.node.resourcePath

            return (
                <div key = {project.node.id}>
                    {
                        project.node.description ==='' || project.node.description == null
                        ? ''
                        :  <li>{project.node.description}                       

                            (updated {new Date(project.node.updatedAt).getDate()}/
                            {new Date(project.node.updatedAt).getMonth()}/                                                                     
                            {new Date(project.node.updatedAt).getFullYear()}) |                        
                            <a href={project.node.resourcePath}>to source</a> |                   
    
                        {
                            project.node.homepageUrl ==='' || project.node.homepageUrl == null
                            ? ''
                            :  <a href={project.node.homepageUrl}>to website</a> 
                        }</li>
                    }   
                    

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
                        <ul>
                            {this.renderProjectsList()}
                        </ul>
                    </article>
                </div>
            </main>
        )
    }
}
