## Personal Web Site:

<center>
	<img alt="" src="./assets/panda-meugenom.png"/>
</center>

### What is it:

This is my personal web page, that you can see [https://meugenom.com](https://meugenom.com).

### What were used to prepare this page:

- imported own markdown-ts-compiler v1.0.4 (Markdown->HTML [Markdown Typescript Compiler](https://github.com/meugenom/markdown-ts-compiler) with Tailwind CSS);
- used Typescript own [SPA MVC Router](https://github.com/meugenom/spa-mvc-router) on port 8082;
- Java and Spring-Boot (backend part on port 4000);
- GraphQL (frontend and backend part);
- Webpack (ES6);
- Tailwind CSS;
- maven;
- Redis (port 9001), set up  etc/redis.conf with port 9001;
- Github Token and User Name

### How to set up:

1. Need preinstalled java 17.0.1, npm(9.7.2), node(16.14.2), mvn(3.8.1), nginx(1.25.3 stable);
2. for information about projects you need  personal access token [https://github.com/settings/tokens](https://github.com/settings/tokens);
3. Create .env file in the `client/.env`directory (see `client/simple.env`)  and add this token to GITHUB_TOKEN= and github user name to GITHUB_USER_NAME=
4. For production please change your `.env` APP_MODE=production (by default APP_MODE=development)

### How to start:

1. clone repository 
`git clone https://github.com/meugenom/meugenom.com.git`

2. change dir
`cd meugenom.com/client`

3. install npm libraries
`npm install`

4. for building frontend part:
`npm run build`

5. create .env file in the `client/.env`directory (see `client/simple.env`)  and add this token to GITHUB_TOKEN= and github user name to GITHUB_USER_NAME=

6. start frontend server
	**for development:**	
	- change .env file in the `client/.env`directory (see `client/simple.env`)  and add to APP_MODE=development
	- start frontend dev server (for development)
	`npm run start`

	**for production:**	
	- change .env file in the `client/.env`directory (see `client/simple.env`)  and add to APP_MODE=production
	- start frontend prod server (for production)
	`node meugenom-server.js`

7. build backend part:
	**for development:**	
	- `cd ../server`
	- `mvn clean package`

	**for production:** when is not local machine
	- `cd ../server`	
	- `mvn clean package`


8. install Redis server and change port to 9001 in the `etc/redis.conf` file by default it's 6379

9. start backend dev server `mvn clean spring-boot:run`
	or
	**for development**
	- `./start-dev-server.sh`

	**for production**
	- `./start-prod-server.sh`

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

[meugenom](https://meugenom.com)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
