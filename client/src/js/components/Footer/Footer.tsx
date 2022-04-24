import * as React from "react";
import SocialLinks from "../SocialLinks/SocialLinks";

export default class Footer extends React.Component<{}> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <footer
        className="
	  						bg-gradient-to-r from-slate-400 to-slate-200 border-gray-600 
	  						shadow-lg 
							shadow-slate-500/10 							
							dark:bg-gray-800 							
							fixed inset-x-0 
							bottom-0 
							z-10"
      >
        <div className="flex justify-center">
          <div className="text-sm text-gray-100 dark:text-gray-400 align-middle text-center pt-5">
            © 2022 &nbsp;
          </div>
          <div className="flex justify-center mt-0">
            <div className="social-buttons">
              <SocialLinks />
            </div>
          </div>
        </div>
      </footer>
    );
  }
}