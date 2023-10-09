export interface IProps {}

export interface IState {
  projectsList: IProject[];
  projectsFilter: IProject[];
}

export interface IIssue {
  id: string;
  number: number;
  lastEditedAt: Date;
  bodyText: string;
}

export interface ILang {
  name: string;
}

export interface IRepositoryTopic {
  node: {
    topic: {
      name: string;
    };
  };
}

export interface IProject {
  node: {
    id: string;
    name: string;
    description: string;
    updatedAt: string;
    createdAt: string;
	pushedAt: string;
    hasIssuesEnabled: boolean;
    homepageUrl: string;
    resourcePath: string;
    openGraphImageUrl: string;
	stargazers: {
		totalCount: string
	},
	forks: {
		totalCount: string
	},
    repositoryTopics: {
      edges: IRepositoryTopic[];
    };
    issues: {
      nodes: IIssue[];
    };
    languages: {
      nodes: ILang[];
    };
  };
}
