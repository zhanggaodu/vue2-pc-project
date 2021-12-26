module.exports = [
  // user login
  {
    url: '/login',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: true
      }
    }
  },
  {
    url: '/logout',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: true
      }
    }
  }
]
