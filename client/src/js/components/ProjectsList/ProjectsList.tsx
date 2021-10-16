import * as React from 'react'

import Config from './../../Config'
import Query from './../Service/Query'
import Service from '../Service/Service'
import './Cards.scss'

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

interface ILang {
	name: string
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
		createdAt: string,
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
		languages: {
			nodes: ILang[]
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

	renderLanguages(project: IProject){
		return  project.node.languages.nodes.map((language: ILang) => {
				return (
					<div>
						<i className="bi bi-tag"><a href="#">{language.name}</a></i>
						<br></br>
					</div>
				)
			 })
	}

    renderProjectsList() {
        return this.state.projectsList.map((project: IProject, id: number) => {
			
			project.node.languages.nodes.map((language: ILang) => {
				//console.log(language.name);
			 })
			
				return (
					<div key = {project.node.id} className="blog-card">
					<div className="meta">
					  <div className="photo" style={{ backgroundImage: `url(`+ project.node.openGraphImageUrl +`)`}}></div>
					  
					  <ul className="details">

						<li className="author">
							<i className="bi bi-person">
								<a href="https://github.com/eugenemdev"><strong> eugenemdev</strong></a>
							</i>
						</li>
					
						<li className="date">
						<i className="bi bi-calendar4-event"> created: {new Date(project.node.createdAt).getDate()}.
                            {this.getMonth(new Date(project.node.createdAt).getMonth())}.
                            {new Date(project.node.updatedAt).getFullYear()}
						</i>
							
						</li>
						<li className="tags">						
							{this.renderLanguages(project)}
						</li>
					  </ul>
					</div>
					<div className="description">
					  <h1>{project.node.name}</h1>
					  <h2>
					  		(updated {new Date(project.node.updatedAt).getDate()}.
                            {this.getMonth(new Date(project.node.updatedAt).getMonth())}.
                            {new Date(project.node.updatedAt).getFullYear()})
					  </h2>
					  <p> {project.node.description}</p>
					  <p className="view-source">
						<a href="#" onClick= {(e)=>{
                                this.openWebPage(e, "https://github.com" + project.node.resourcePath)
                            }}>Source</a>
						</p>
						<p className="view-web">
						{project.node.homepageUrl === '' || project.node.homepageUrl == null
                                    ? ''
                                    : <a href="#" onClick= {(e) =>{
                                        this.openWebPage(e, project.node.homepageUrl)
                                    }}
                                    >Web</a>
                                }
					  </p>
					</div>
				  </div>
				)
			}
        )
    }

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