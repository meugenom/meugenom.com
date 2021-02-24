# eugenem.dev

## in progress

https://eugenem.dev
This is my personal website, that you can see in the web by link "https://eugenem.dev".

Tehnologies were used:
- Webpack (ES6) 
- GraphQL
- Typescript
- React
- SCSS
- Java Spring 
- maven

### settings:
- need preinstalled jdk, npm, nodejs, mvn
- for showing information about projects related with github you need add to "/src/main/resources/js/Config.tsx" own Github's developer's token, by default in my app set empty


### How to start in the terminal:
1. clone repository 
`git clone https://github.com/eugenemdev/eugenem.dev.git`
2. change dir
`cd eugenem.dev`
3. for building frontend and backend parts write in the terminal:  
` mvn clean spring-boot:run`
4. in the Visual Studio Code start application with button "Run"
5. for building only frontend part use in the terminal:
` npm run build`

### How to see started web page
open web browser with link:  http://localhost:8081 after starting of spring java web server

