class API {
  static signin (user) {
    return fetch('http://localhost:3000/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }).then(resp => resp.json())
  }

  static signup (user) {
      return fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(user)
      }).then(resp => resp.json())
  }

  static validate () {
    return this.get('http://localhost:3000/validate')
  }

  static getSnippets () {
    return this.get('http://localhost:3000/snippets')
  }

  static createSnippet (snippet) {
    return fetch('http://localhost:3000/snippets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify(snippet)
    })
  }

  static get (url) {
    return fetch(url, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then(resp => resp.json())
  }
}

window.API = API

export default API
