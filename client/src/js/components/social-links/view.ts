'use strict'
import './socialLinks.css'

/**
 * View for component Navbar
 * @returns html to view navbar block
 */

class View {
  appendSocialLinks () {
    const view = /* html */
        `            
				<div class="social_links">
						<a href="https://github.com/meugenom" class="sl_container github_no_touch">
					 
						  <svg  preserveAspectRatio="xMinYMin meet" viewBox="0 0 200 200" class="sl_circle">  
						 <circle cx="100" cy="100" r="50"/>
						  </svg>
						  <div class="sl_social">
						  <i class="bi-github" role="img" aria-label="GitHub"></i>
						  </div>
					</a>
					<!-- mails exclude-->
					<!--
					<a href="mailto:hallo@meugenom.com?subject=My propositions" class="sl_container mail_no_touch">
						  <svg  preserveAspectRatio="xMinYMin meet" viewBox="0 0 200 200" class="sl_circle">  
							 <circle cx="100" cy="100" r="50"/>
						  </svg>
						  <div class="sl_social">
							<i class="bi bi-envelope"></i>
						  </div>
					</a>
					-->
					<a href="https://buymeacoffee.com/meugenom" class="sl_container coffee_no_touch">
						  <svg  preserveAspectRatio="xMinYMin meet" viewBox="0 0 200 200" class="sl_circle">  
						 <circle cx="100" cy="100" r="50"/>
						  </svg>
						  <div class="sl_social">								  
							<i class="bi bi-cup"></i>
						  </div>
					</a>
					<a href="https://www.linkedin.com/in/meugenom/" class="sl_container linkedin_no_touch">
						  <svg  preserveAspectRatio="xMinYMin meet" viewBox="0 0 200 200" class="sl_circle">  
							 <circle cx="100" cy="100" r="50"/>
						  </svg>
						  <div class="sl_social">
							<i class="bi bi-linkedin"></i>
						  </div>
					</a>
			</div>
        `
    return view
  }
}

export default View