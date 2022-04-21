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
    <nav className="nav">
      <div className="nav-container">
        <div className="brand">
          <Link to="/">
            <img
              // tslint:disable-next-line: jsx-alignment
              src="../../images/face-splash.svg"
              alt="face-splash"
              className="favicon"
            />
          </Link>
        </div>
        <div className="links">
          {routs.map((route) => (
            <Link to={route.link}>{route.name}</Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Nav;