import * as React from "react";
import { Link } from "react-router-dom";

interface Props {
  routs: route[];
}

interface route {
  link: string;
  name: string;
}


const Nav: React.FC<Props> = ({routs}) => {
  return (
	<ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
		{routs.map((route:any) => (
			<li key= {route.link}
			className="nav-item">
				<Link to={route.link}
				className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
					{route.name}
				</Link>
			</li>
		))}
	</ul> 
  );
};

export default Nav;