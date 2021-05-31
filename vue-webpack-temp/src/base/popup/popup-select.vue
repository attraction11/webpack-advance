<template>
    <div class="com-select-model">
        <p class="text-center com-select-title">
            <span>请选择</span>
            <span class="confirm-choice" @click="confirmSelect()">确定</span>
        </p>
        <div class="wrapper" ref="wrapper">
            <ul class="com-select-wrapper">
                <li class="fold" v-for="(item, index) in selection" @click="switchItem(item, index)">
                    <div class="com-select-item">
                        <p :class="{'active': currentIndex === index}">{{item.name}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
  import BScroll from 'better-scroll'

  export default {
    props: {
      selection: {
        type: Array,
        default: []
      },
      currentIndex: {
        type: Number,
        default: 0
      },
      selectType: {
        type: String,
        default: ''
      }
    },
    mounted() {
      const __BScroll = BScroll
      this.$nextTick(() => {
        this.scroll = new __BScroll(this.$refs.wrapper, {})
      })
    },
    methods: {
      switchItem(item, index) {
        this.$emit('switch', item, index)
      },
      confirmSelect() {
        this.$emit('confirm')
      }
    }
  }
</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
    @import "~common/stylus/variable"
    .com-select-model
        position fixed
        bottom 0
        width 100%
        letter-spacing 0px
        color #000
        width 100%
        background-color #fff
        z-index 1000
        .com-select-title
            height 42px
            line-height 42px
            font-size 14px
            color #333
            border-bottom 1px solid #ececec
            display flex
            justify-content space-between
            position fixed
            z-index 10
            background #fff
            width 100%
            padding 0 12px
            box-sizing border-box
            &:before
                content ''
                background-color #5ea76b
                width 45px
                height 3px
                position absolute
                left 12px
                bottom 0
            span.confirm-choice
                color #999
        .wrapper
            min-height 132px
            max-height 332px
            margin 0
            overflow hidden
            li.fold
                height 46px
                display flex
                justify-content space-between
                margin 0 16px
                flex-direction row
                font-size 14px
                color #333
                div
                    flex 1
                    p.active
                        color #5ea76b
                .com-select-item
                    line-height 46px
            li.fold:first-child
                padding-top 46px
</style>
