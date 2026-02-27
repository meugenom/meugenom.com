export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_TOKEN: string;
      GITHUB_USER_NAME: string;
      APP_MODE: string;
    }
  }

  const process: {
    env: NodeJS.ProcessEnv;
  };
}