'use strict'

export default class Service {

  async graphql(dataType: string, token: string, host: string, query: string, variables: object) {
    const response: any = await fetch(
      host, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query,
        variables
      })
    })
      .catch((error) => {
        console.log(error)
        //navigate('/error')

      })
    const data = (dataType === 'json' ? await response.json() : await response.text())
    return data.data
  }
}
