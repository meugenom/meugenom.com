import * as React from "react";

export default class About extends React.Component<{}> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <div>
        <h2> About me</h2>
        <p>
          When I was little, I started interesting things which influenced my
          opinion. It was mathematik, philosophy, biology and history. And all
          the time I wanted to structure my knowledge to understand how can use
          algorithms in my real life.
        </p>
        <p>
          My web-life began early, just me working on my own. And in later, I
          have received formal education at the university.
        </p>
        <p>
          Today I primarily create websites and also work with development both
          frontend and backend, specifically with JavaScript, Java and Python. I
          have a wide range of skills to apply my knowledge to more sorts of
          projects.
        </p>
        <p>
          If you have any ideas, critiques or you want to say hi, send me an
          email at:
		  &nbsp;
          <a href="mailto:hallo@eugenemorozov.de">hallo@eugenmorozov.de</a>
        </p>
      </div>
    );
  }
}
