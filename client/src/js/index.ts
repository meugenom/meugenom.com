/**
 * This is the entry point of the application. 
 */

/* eslint-disable no-new */
'use strict'
import "../styles/main.css";
import Router from './router/router'

// Listen on hash change:
window.addEventListener('hashchange', function () {
  console.log('hashchange')
  new Router()
})

//Listen when we have dynamic parameter in the url
window.addEventListener('popstate', function () {
  console.log('popstate')
  new Router()
})

// Listen on page load:
window.addEventListener('load', function () {
  console.log('load')
  new Router()
})