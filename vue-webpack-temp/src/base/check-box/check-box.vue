<template>
    <ul class="checkboxs">
        <li class="checkbox-item" v-for="(item, index) in checkboxs" @click="switchItem(item)">
            <input type="checkbox">
            <label :for="item.label">{{item.text}}</label>
        </li>
    </ul>
</template>

<script type='text/ecmascript-6'>
  export default {
    props: {
      checkboxs: {
        type: Array,
        default: []
      }
    },
    methods: {
      switchItem(item) {
        this.$emit('switch', item)
      }
    }
  }
</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
    @import "~common/stylus/variable"
    .checkboxs
        position relative
        label
            padding-left 25px
        input[type='checkbox']
            position absolute
            top 13px
            width 18px
            height 18px
            background-color #fff
            -webkit-appearance none
            border 1px solid #c9c9c9
            border-radius 50%
            vertical-align middle
        input[type=checkbox]:checked
            position absolute
            top 13px
            background url(5.png) no-repeat center
            background-size 22px 22px
            vertical-align middle
</style>
