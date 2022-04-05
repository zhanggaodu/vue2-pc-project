module.exports = [
  {
    url: '/update',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: true
      }
    }
  }
]
