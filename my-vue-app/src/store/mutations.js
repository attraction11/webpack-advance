let idStart = 1

export default {
  'ADD_TODO': (state, todo) => {
    if (!todo.id) {
      todo.id = ++idStart
    }
    state.todos.push(todo)
  },

  'DEL_TODO': (state, todo) => {
    state.todos.forEach((item, index) => {
      if (item.id === todo.id) {
        state.todos.splice(index, 1)
      }
    })
  }
}
