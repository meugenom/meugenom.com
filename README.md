## Personal Web Site:
[![Website Status](https://img.shields.io/badge/My_Site-Live-brightgreen?style=for-the-badge&logo=google-chrome)](https://meugenom.com)
</br>
![TypeScript](https://img.shields.io/badge/typescript-%23007acc.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
</br>
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge&logo=opensourceinitiative&logoColor=white)

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

1. Need preinstalled java 21 2023-09-19 LTS, npm(10.2.3), node(18.19.0), mvn(3.8.1), nginx(1.29.5 stable);
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

```bash

server {
        listen       8080;
        server_name  localhost;
        
		location / {
            if ($request_method = OPTIONS) {
              return 204;
            }

    	add_header Access-Control-Allow-Origin *;
    	add_header Access-Control-Max-Age 3600;
    	add_header Access-Control-Expose-Headers Content-Length;
    	add_header Access-Control-Allow-Headers Range;

            proxy_http_version  1.1;
            proxy_cache_bypass  $http_upgrade;
            proxy_set_header Upgrade           $http_upgrade;
            proxy_set_header Connection        "upgrade";
            proxy_set_header Host              $host;
            proxy_set_header X-Real-IP         $remote_addr;
            proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header X-Forwarded-Host  $host;
            proxy_set_header X-Forwarded-Port  $server_port;

            proxy_pass http://localhost:8082;
        }

          location /graphql/ {
          if ($request_method = OPTIONS) {
            add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
            add_header Access-Control-Allow-Headers 'Authorization, Content-Type, Accept';
            add_header Access-Control-Max-Age 3600;
            return 204;
          }

          add_header Access-Control-Allow-Origin *;
          add_header Access-Control-Max-Age 3600;
          add_header Access-Control-Expose-Headers Content-Length;
          add_header Access-Control-Allow-Headers 'Authorization, Content-Type, Accept';

          client_max_body_size       10M;

          proxy_http_version  1.1;
          proxy_set_header Upgrade           $http_upgrade;
          proxy_set_header Connection        "upgrade";
          proxy_set_header Host              $host;
          proxy_set_header X-Real-IP         $remote_addr;
          proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
          proxy_set_header X-Forwarded-Proto $scheme;
          proxy_set_header X-Forwarded-Host  $host;
          proxy_set_header X-Forwarded-Port  $server_port;

          # strip upstream CORS headers to avoid duplicates
          proxy_hide_header Access-Control-Allow-Origin;
          proxy_hide_header Access-Control-Allow-Methods;
          proxy_hide_header Access-Control-Allow-Headers;
          proxy_hide_header Access-Control-Max-Age;
          proxy_hide_header Access-Control-Expose-Headers;

          proxy_pass http://localhost:4000/graphql;
        }
    }
```

### Frontend Tests:

For testing web client is used jest framework in the `/client`

```bash
	cd client &&
	npm run test
```

or run to see tests coverage:

```bash
	cd client &&
	npm run test --coverage
```

### How to see web page:

open web browser with link:  `http://localhost:8080` after starting both servers (front and back).

### Author 

[meugenom](https://meugenom.com)

