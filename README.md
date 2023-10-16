## Personal Web Site:

<center>
	<img alt="" src="./assets/panda-meugenom.png"/>
</center>

### What is it:

This is my personal web page, that you can see [https://meugenom.com](https://meugenom.com).

### What were used to prepare this page:

- imported own markdown-ts-compiler (Markdown->HTML [Markdown Typescript Compiler](https://github.com/meugenom/markdown-ts-compiler) with Tailwind CSS);
- used Typescript own [SPA MVC Router](https://github.com/meugenom/spa-mvc-router) on port 8082;
- Java and Spring-Boot (backend part on port 4000);
- GraphQL (frontend and backend part);
- Webpack (ES6);
- Tailwind CSS;
- maven;
- Redis (port 9001), set up  etc/redis.conf with port 9001;
- Github Token

### How to set up:

1. Need preinstalled java 19.0.1, npm(8.9.0), node(16.14.2), mvn(3.8.7), nginx(1.23.3 stable);
2. for information about projects you need  personal access token [https://github.com/settings/tokens](https://github.com/settings/tokens);
3. Create .env file in the `client/.env`directory (see `client/simple.env`)  and add this token to GITHUB_TOKEN=
4. For production please change `client/src/config.ts` your public host and in `.env` APP_MODE=production (by default APP_MODE=development)

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
5. install Redis server
6. start backend dev server
`mvn clean spring-boot:run`
or
`./start-dev-server.sh`

### CORS settings:
1. write to  "/etc/hosts" host:
127.0.0.1 localhost

2. Open nginx.conf, comment old locations and add this:

```
	location ^~ / {
		proxy_pass http://localhost:8082/;
	}
	location ^~ /graphql/ {
		proxy_pass http://localhost:4000/graphql/; 
	}
```

### How to see web page:

open web browser with link:  http://localhost:8080 after starting both servers (front and back).

### Author 
@meugenom [mail me](mailto:hallo@meugenom.com?subject=Github%20source%20question&amp;body=Hello%20Eugen,%0D%0A%0D%0Ahier%20is%20your%20message)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
