## Personal Web Site:
- front-end works on port 8081;
- backend works on port 3000;

This is personal web page, that you can see [https://meugenom.com](https://meugenom.com).

### What were used to prepare this page:
- imported own developed markdown-ts-compiler (Markdown->HTML [markdown-ts-compiler](https://github.com/meugenom/markdown-ts-compiler));
- used Typescript + React (frontend part);
- Java and Spring-Boot (backend part);
- GraphQL;
- Webpack (ES6);
- Tailwind CSS;
- maven;

### How to set up:

1. need preinstalled OpenJDK(build 16.0.2+7), npm(8.5.0), node(16.14.2), mvn(3.8.2), nginx(1.21.2);
2. for information about projects you need  personal acess token [https://github.com/settings/tokens](https://github.com/settings/tokens);
3. add this token to [./src/js/Config.tsx](https://github.com/meugenom/meugenom.com/tree/master/client/src/js/Config.tsx);


### How to start:

1. clone repository 
`git clone https://github.com/meugenom/meugenom.com.git`
2. change dir
`cd meugenom.com`
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
	}
```

### How to see web page:

open web browser with link:  http://localhost:8080 after starting both servers (front and back).

### Author 
@meugenom [mail me](mailto:hallo@meugenom.com?subject=Github%20source%20question&amp;body=Hello%20Eugen,%0D%0A%0D%0Ahier%20is%20your%20message)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
