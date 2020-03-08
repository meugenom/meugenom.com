
import * as React from 'react'

interface IProps {
    searchName: string,
    projectsList: IProject[]
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

interface IState {
}

export default class ProjectsListFilter extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = { }

        console.log(this.props.projectsList)

        /*
        //const projectsF = await this.filterProjects('reactjs')
        //this.setState({ projectsList: projectsF})
        */
        }
    /*
    handleChange = (e) => {
        this.setState({
            projectsFilter: e.target.value
        })
        this.props.onChange(event.target.value)
    }

    <input type="text" id='filter'  value={this.state.projectsFilter}  onChange={this.handleChange}/>
    */
   /*
   filterProjects(filterString: string){
    const D = this.state.projectsList.filter((project: IProject) => {
            const F = project.node.repositoryTopics.edges.filter((topic: IRepositoryTopic) => {
                return topic.node.topic.name === filterString
            })
            if (F[0] !== undefined){
                return project
            }
    })
    return D
    }
    */

    render() {
        return (
        <div>
            <label htmlFor="filter">Filter by Projects: </label>
            {this.props.projectsList.map((project: IProject) => {
                project.node.repositoryTopics.edges.map((topic: IRepositoryTopic) => {
                    <button>{topic.node.topic.name}</button>
                })
            })}
        </div>
        )
    }
}