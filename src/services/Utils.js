const Utils = {
  parseRequestURL: () => {
    // let url = location.hash.slice(1).toLowerCase() || '/';
    // let url = location.hash.toLowerCase() || '/';
    // let url = window.location.href.replace(/#\//, '');

    // eslint-disable-next-line no-undef
    const url = location.hash.replace(/#\//, '')
    const r = url.split('/')
    const request = {
      resource: null,
      id: null,
      verb: null
    }

    // request.resource    = r[3]
    // request.id          = r[4]
    // request.verb        = r[5]

    request.resource = r[0]
    request.id = r[1]
    request.verb = r[2]

    // window.history.replaceState('', document.title, url);
    return request
  }
}

export default Utils
