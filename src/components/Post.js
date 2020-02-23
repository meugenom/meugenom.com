'use strict'

import Utils from '../services/Utils.js'
import PostService from '../services/Service.js'
import Query from '../services/Query.js'

// import parser for markable text
import { View } from '../parser/View.js'

const Post = {
  render: async () => {
    return /* html */`
        <main id="main-content">                                  
            <article>              
            </article>            
        </main>
        `
  },

  afterRender: async () => {
    const request = await Utils.parseRequestURL()

    // GraphQL query options
    const host = Query.post.host
    const token = ''
    const query = Query.post.query
    const variables = { slug: request.id }

    let post = await PostService.graphql('json', host, token, query, variables)
    post = await post.article.body

    await (new View()).render(post)
    await Post.setLanguage()
  },

  setLanguage: () => {
    // by default we can see english version
    let language = '@en'

    // add event listeners to languages buttons
    const english = document.getElementById('englishSelector')
    const german = document.getElementById('germanSelector')
    const russian = document.getElementById('russianSelector')

    english.addEventListener('click', function () {
      language = '@en'
      // console.log('Language changed on English')
      changeLanguage()
    })

    german.addEventListener('click', function () {
      language = '@de'
      // console.log('Language changed on German')
      changeLanguage()
    })

    russian.addEventListener('click', function () {
      language = '@ru'
      // console.log('Language changed on Russian')
      changeLanguage()
    })

    function changeLanguage () {
      /** by default multi */

      const article = document.querySelector('article')
      const articles = article.childNodes

      articles.forEach(node => {
        if (node.dataset !== undefined) {
          if (node.dataset.language === language || node.dataset.language === '@all') {
            node.style.display = ''
          } else {
            if (node.tagName !== 'HEADER') {
              node.style.display = 'none'
            }
          }
        }
      })
    }

    // first loading
    language = '@en'
    changeLanguage()
  }
}

export default Post
