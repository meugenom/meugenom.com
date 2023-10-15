---
date: 2023-10-15
title: 'How to define types for process environment'
template: post
thumbnail: '../thumbnails/process-environment.png'
slug: how-to-define-types-for-process-environment
categories: process-env typescript
tags: process-env typescript
---


### Problem with process environment variables:

When reading parameters from the .env file in a TypeScript application with Webpack 5.0, there are questions about how to implement this using TypeScript's built-in facilities. The answer to the question is not so obvious, but it turned out to be quite simple.

One of the solutions is to declare global types in TypeScript. Let's break down this code piece by piece.

### How to use

1. Open or create directory `src\types` in the project.
2. Create a file with the name `environments.d.ts` and add the following code to it:

```javascript
1. export {};
2.   declare global {
3.     namespace NodeJS {
4.       interface ProcessEnv {
5.         GITHUB_TOKEN: string
6.       }
7.     }
8.   }
```

### How it works

Let's break it down:

1. `export {};` : This is an empty export used to ensure the file is recognized as a TypeScript module. It informs TypeScript that this file is a module and prevents potential naming conflicts.

2. `declare global { ... }` : This construction allows extending the global TypeScript namespace. Here, it's used to add properties to the global NodeJS object.

3. `namespace NodeJS { ... }` : NodeJS is a namespace used to define global types in the Node.js environment.

4. `interface ProcessEnv { ... }` : This interface defines the properties that can exist in the process.env object in Node.js. 

5. In this case, it defines the property: `GITHUB_TOKEN` as a string

### Conclusion

As a result, this code helps TypeScript understand what data types can be present in the process.env object, making development easier and providing type safety when working with environment variables in Node.js applications.


