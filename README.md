## Personal Web Site:
- front-end works on port 8081;
- backend works on port 3000;

This is personal web page, that you can see [https://eugenem.dev](https://eugenem.dev).

### What were used to prepare this page:
- Javascript (ES6) (my markdown parser for *.md pages [Github:](https://github.com/eugenemdev/markable-to-html));
- Typescript and React (web site, frontend part);
- Java and Spring-Boot (for backend part);
- GraphQL;
- Webpack (ES6);
- SCSS, CSS;
- maven;

### How to set up:

1. need preinstalled OpenJDK(build 16.0.2+7), npm(v.7.20.5), node(v16.6.0), mvn(v.3.8.2), nginx(1.21.2);
2. for information about projects you need  personal acess token [https://github.com/settings/tokens](https://github.com/settings/tokens);
3. add this token to [./src/js/Config.tsx](https://github.com/eugenemdev/eugenem.dev/tree/master/client/src/js/Config.tsx);


### How to start:

1. clone repository 
`git clone https://github.com/eugenemdev/eugenem.dev.git`
2. change dir
`cd eugenem.dev`
3. install npm libraries
`npm install`
3. for building frontend part:
`npm run build`
4. start frontend dev server
`npm run start`
4. build backend
`cd ../server`
`mvn clean package`  
5. start backend dev server
`mvn clean spring-boot:run`
or
`./start-dev-server.sh`

### CORS settings:
1. write to  "/etc/hosts" host:
127.0.0.1 localhost

2. Open nginx.conf, comment old locations and add this:

```
	location ^~ / {
		proxy_pass http://localhost:8081/;
	}
	location ^~ /graphql/ {
		proxy_pass http://localhost:3000/graphql/; 
```

### How to see web page:

open web browser with link:  http://localhost:8080 after starting both servers (front and back).

### Author 
@eugenemdev [mail me](mailto:hallo@eugenem.dev?subject=Github%20source%20question&amp;body=Hello%20Eugen,%0D%0A%0D%0Ahier%20is%20your%20message)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

