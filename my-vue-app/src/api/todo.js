import fetch from '@/utils/fetch'

export function fetchTodo ({ token, productKey }) {
  return fetch({
    url: '/api/stores/getTodoList',
    method: 'post',
    data: { token, productKey }
  })
    .then(resp => {
      if (resp.data.code === 0) {
        let data = resp.data.data.data || []
        return data
      }
      return []
    })
    .catch(error => {
      console.error(error)
      return []
    })
}
