import service from '@common/service'

export const getData = () => {
  return new Promise(resolve => {
    service
      .get('/v4/contact/operator-url', {
        params: {
          ID: 12345
        }
      })
      .then(res => {
        resolve(res)
      })
  })
}

export const postData = () => {
  return new Promise(resolve => {
    service
      .post('/user', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  })
}
