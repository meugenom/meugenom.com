import * as React from "react";
import { Link } from "react-router-dom";

interface Props {
  routs: route[];
}

interface route {
  link: string;
  name: string;
}

const Nav: React.FC<Props> = ({ routs }) => {
	
  return (
	<ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">      				
		{routs.map((route) => (
	<li className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-orange-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
				<Link to={route.link}>{route.name}</Link>
	</li>
	))}
	</ul> 
  );
};

export default Nav;