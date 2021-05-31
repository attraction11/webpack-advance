<!--
* @Author: cuijk
* @Date:   2017-09-30 10:56:46
* @Last Modified by:   cuijk
* @Last Modified time: 2017-10-17 23:00:50
* @describe radios 单选框
 -->
<template>
    <ul class="radios">
        <li class="radio-item" v-for="(item, index) in radios" @click="switchItem(index)">
            <input type="radio"/>
            <label>{{item.value}}</label>
        </li>
    </ul>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      radios: {
        type: Array,
        default: []
      }
    },
    methods: {
      switchItem(index) {
        this.$emit('switch', index)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .radios
        display flex
        .radio-item
            color $color-theme
            font-size 13px
            height 45px
            line-height 45px
            flex-basis 150px
            padding-right 5px
            position: relative;
            input[type="radio"] + label
                height: 45px;
                line-height: 45px;
                font-size: 14px;
                color: #333;
                &:before
                    content "\a0"
                    display inline-block
                    vertical-align middle
                    width 15px
                    height 15px
                    margin-right 5px
                    border-radius 50%
                    border 1px solid #999
            // text-indent .15em
            input[type="radio"]
                position absolute
                top 18px
                left 4px
                opacity: 0;
            input[type="radio"]:checked + label:before
                background-color #5ea76b
                background-clip content-box
                border 1px solid #5ea76b
                padding 4px
                width 7px
                height 7px
</style>
