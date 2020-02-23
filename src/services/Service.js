'use strict'
import Config from '../config/Configs'

const PostService = {

  graphql: async (dataType, host, token, query, variables) => {
    try {
      const token = Config.token
      const response = await fetch(
        host, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            query,
            variables: variables
          })
        })
      const data = (dataType === 'json' ? await response.json() : await response.text())
      return data.data
    } catch (err) {
      // eslint-disable-next-line no-undef
      location.hash = '#/Error404'
      throw new Error(err.message)
    }
  }

}

export default PostService
