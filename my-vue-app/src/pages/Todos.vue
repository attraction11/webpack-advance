<template>
	<div class="todos">
		<router-link to="/"> home </router-link>
		<router-link to="todos"> todos </router-link>
		<h1 class="todos-title">this is todos</h1>
		<input v-model="newtodo.text" type="text" @keydown.13="createTodo" />
		<ul>
			<li v-for="todo in todos" :key="todo.id">
				{{ todo.text }}
				<span @click="delTodo(todo)">删除</span>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => {
    return {
      newtodo: {
        text: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'todos'
    ])
  },

  methods: {
    ...mapActions([
      'addTodo',
      'delTodo'
    ]),
    createTodo () {
      this.addTodo({
        // 这里用扩展运算符转为自变量类型，若使用引用类型会被this.newtodo.text = '' 改变
        ...this.newtodo
      })

      this.newtodo.text = ''
    }
  }
}
</script>

<style scoped lang="scss">
.todos {
	.todos-title {
		font-size: 28px;
		color: rebeccapurple;
	}
}
</style>
