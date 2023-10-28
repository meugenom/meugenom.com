interface IIssue {
    id: string;
    number: number;
    lastEditedAt: Date;
    bodyText: string;
  }
  
  interface ILang {
    name: string;
  }
  
  interface IRepositoryTopic {
    node: {
      topic: {
        name: string;
      };
    };
  }

export default interface IProject {
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
