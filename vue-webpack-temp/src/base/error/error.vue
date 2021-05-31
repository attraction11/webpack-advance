<template>
    <div class="vc-error">
        <img src="./error.png" alt="报错图片"/>
        <p> {{msg}} </p>
        <Button @click="refresh">刷新</Button>
    </div>
</template>

<script type="text/ecmascript-6">
  import Button from 'base/button/button';

  export default {
    components: {
      Button
    },
    data() {
      return {}
    },
    computed: {
      msg() {
        return this.$route.query.msg || '出现错误'
      }
    },
    methods: {
      refresh() {
        history.go(-1)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .vc-error
        position fixed
        top 50%
        left 50%
        transform translate(-50%, -50%)
        text-align center
        p
            margin 30px 0
</style>
