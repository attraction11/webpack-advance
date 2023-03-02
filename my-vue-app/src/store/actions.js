import { fetchTodo } from '@/api/todo'

export default {
  addTodo ({ commit }, todo) {
    commit('ADD_TODO', todo)
  },

  delTodo ({ commit }, todo) {
    commit('DEL_TODO', todo)
  },

  async getTodo ({ commit }, todo) {
    let list = await fetchTodo()
    return list
  }
}
