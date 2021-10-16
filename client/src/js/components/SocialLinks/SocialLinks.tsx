import * as React from 'react'
import './SocialLinks.scss'

export default class SocialLinks extends React.Component<{}, IState> {

    constructor(props: {}){
        super(props);

        this.state = {}
    }

    public render(): JSX.Element{
        return (
            <div id="social_links">
                <div id="sl_wrapper">
  					<div id="sl_share">
    					<a href="https://github.com/eugenemdev" className="sl_container github">
      						<svg  preserveAspectRatio="xMinYMin meet" viewBox="0 0 200 200" className="sl_circle">  
         					<circle cx="100" cy="100" r="50"/>
      						</svg>
      						<div className="sl_social">
							  <i className="bi-github" role="img" aria-label="GitHub"></i>
      						</div>
    					</a>
    					<a href="mailto:hallo@eugenmorozov.de?subject=My propositions" className="sl_container mail">
      						<svg  preserveAspectRatio="xMinYMin meet" viewBox="0 0 200 200" className="sl_circle">  
         						<circle cx="100" cy="100" r="50"/>
      						</svg>
      						<div className="sl_social">
        						<i className="bi bi-envelope"></i>
      						</div>
    					</a>
    					<a href="https://t.me/eugenemdev" className="sl_container telegram">
      						<svg  preserveAspectRatio="xMinYMin meet" viewBox="0 0 200 200" className="sl_circle">  
         					<circle cx="100" cy="100" r="50"/>
      						</svg>
      						<div className="sl_social">								  
        						<i className="bi bi-telegram"></i>
      						</div>
    					</a>
    					<a href="https://www.linkedin.com/in/meugenom/" className="sl_container linkedin">
      						<svg  preserveAspectRatio="xMinYMin meet" viewBox="0 0 200 200" className="sl_circle">  
         						<circle cx="100" cy="100" r="50"/>
      						</svg>
      					<div className="sl_social">
        					<i className="bi bi-linkedin"></i>
      			</div>
    		</a>
  		</div>
	</div>
</div>
)}
}

// tslint:disable-next-line: no-empty-interface
interface IState {}
