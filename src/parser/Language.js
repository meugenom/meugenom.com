'use strict'

import LanguageConf from './Config.js'

const Language = {

  replaceLanguage: (node, language) => {
    let string = node.innerHTML
    string = string.replace(language, '')

    node.innerHTML = string
    if (language !== '') {
      node.dataset.language = language
    } else {
      node.dataset.language = '@all'
    }

    return node
  },

  detectLanguage: (node) => {
    // by default is english
    let language = ''

    const string = node.outerHTML

    const en = string.lastIndexOf(LanguageConf.english)
    const de = string.lastIndexOf(LanguageConf.german)
    const ru = string.lastIndexOf(LanguageConf.russian)
    const all = string.lastIndexOf(LanguageConf.multi)

    if (en >= 0) language = LanguageConf.english
    if (de >= 0) language = LanguageConf.german
    if (ru >= 0) language = LanguageConf.russian
    if (all >= 0) language = LanguageConf.multi

    return language
  },

  parseLang: (node) => {
    const language = Language.detectLanguage(node)
    node = Language.replaceLanguage(node, language)
    return node
  }

}

export default Language
