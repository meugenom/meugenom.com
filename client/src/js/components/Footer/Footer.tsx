import * as React from "react";
import SocialLinks from "../SocialLinks/SocialLinks";

export default class Footer extends React.Component<{}> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (

      <footer className="p-4 bg-gradient-to-r from-slate-400 to-slate-100 border-gray-600 shadow-lg shadow-slate-500/10 sm:p-1 dark:bg-gray-800 fixed inset-x-0 bottom-0 z-10">
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-200 sm:text-center dark:text-gray-400">
            © 2022{" "}
            <a href="https://meugenom.com" className="hover:underline">
              meugenom.com
            </a>
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <div className="social-buttons">
              <SocialLinks />
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
