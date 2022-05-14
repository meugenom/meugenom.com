import * as React from 'react'
import { isMobile } from "react-device-detect";
import './_SocialLinks.css'

export default class SocialLinks extends React.Component<{}, IState> {

    constructor(props: {}){
        super(props);
        this.state = {}
    }

	

    public render(): JSX.Element{
		if(isMobile) {
			return (
				<div className="social_links">
						<a href="https://github.com/meugenom" className="sl_container github_touch">
					 
						  <svg  preserveAspectRatio="xMinYMin meet" viewBox="0 0 200 200" className="sl_circle">  
						 <circle cx="100" cy="100" r="50"/>
						  </svg>
						  <div className="sl_social">
						  <i className="bi-github" role="img" aria-label="GitHub"></i>
						  </div>
					</a>
					<a href="mailto:hallo@meugenom.com?subject=My propositions" className="sl_container mail_touch">
						  <svg  preserveAspectRatio="xMinYMin meet" viewBox="0 0 200 200" className="sl_circle">  
							 <circle cx="100" cy="100" r="50"/>
						  </svg>
						  <div className="sl_social">
							<i className="bi bi-envelope"></i>
						  </div>
					</a>
					<a href="https://t.me/meugenom" className="sl_container telegram_touch">
						  <svg  preserveAspectRatio="xMinYMin meet" viewBox="0 0 200 200" className="sl_circle">  
						 <circle cx="100" cy="100" r="50"/>
						  </svg>
						  <div className="sl_social">								  
							<i className="bi bi-telegram"></i>
						  </div>
					</a>
					<a href="https://www.linkedin.com/in/meugenom/" className="sl_container linkedin_touch">
						  <svg  preserveAspectRatio="xMinYMin meet" viewBox="0 0 200 200" className="sl_circle">  
							 <circle cx="100" cy="100" r="50"/>
						  </svg>
						  <div className="sl_social">
							<i className="bi bi-linkedin"></i>
						  </div>
					</a>
			</div>
	)
		} else {
			return (
				<div className="social_links">
						<a href="https://github.com/meugenom" className="sl_container github_no_touch">
					 
						  <svg  preserveAspectRatio="xMinYMin meet" viewBox="0 0 200 200" className="sl_circle">  
						 <circle cx="100" cy="100" r="50"/>
						  </svg>
						  <div className="sl_social">
						  <i className="bi-github" role="img" aria-label="GitHub"></i>
						  </div>
					</a>
					<a href="mailto:hallo@meugenom.com?subject=My propositions" className="sl_container mail_no_touch">
						  <svg  preserveAspectRatio="xMinYMin meet" viewBox="0 0 200 200" className="sl_circle">  
							 <circle cx="100" cy="100" r="50"/>
						  </svg>
						  <div className="sl_social">
							<i className="bi bi-envelope"></i>
						  </div>
					</a>
					<a href="https://t.me/meugenom_channel" className="sl_container telegram_no_touch">
						  <svg  preserveAspectRatio="xMinYMin meet" viewBox="0 0 200 200" className="sl_circle">  
						 <circle cx="100" cy="100" r="50"/>
						  </svg>
						  <div className="sl_social">								  
							<i className="bi bi-telegram"></i>
						  </div>
					</a>
					<a href="https://www.linkedin.com/in/meugenom/" className="sl_container linkedin_no_touch">
						  <svg  preserveAspectRatio="xMinYMin meet" viewBox="0 0 200 200" className="sl_circle">  
							 <circle cx="100" cy="100" r="50"/>
						  </svg>
						  <div className="sl_social">
							<i className="bi bi-linkedin"></i>
						  </div>
					</a>
			</div>
			)
		}
        
	}
}

// tslint:disable-next-line: no-empty-interface
interface IState {}
