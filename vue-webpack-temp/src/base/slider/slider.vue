<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <span class="dot" :key="index" v-for="(item, index) in dots"
                  :class="{active: currentIndex == index}"></span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom'

  export default {
    data() {
      return {
        dots: [],
        currentIndex: 0
      }
    },
    props: {
      // 配置循环
      loop: {
        type: Boolean,
        default: true
      },
      // 配置自动播放
      autoPlay: {
        type: Boolean,
        default: true
      },
      // 配置循环间隔时间
      interval: {
        type: Number,
        default: 4000
      }
    },
    mounted() {
      // 配置DOM渲染后20ms后执行betterScroll配置(浏览器15ms间隔刷新)
      setTimeout(() => {
        this._setSliderWidth()
        this._initdots()
        this._initSlider()
        if (this.autoPlay) {
          this._play()
        }
      }, 20)
      window.addEventListener('resize', () => {
        if (!this.sider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    },
    destoryed() {
      // 组件销毁时,清除定时器释放内存
      clearTimeout(this.timer)
    },
    methods: {
      // 设置轮播图中的宽度
      _setSliderWidth(isResize) {
        // 初始化sliderGroup宽度
        let width = 0
        // 获取轮播图可视区域宽度
        let sliderWidth = this.$refs.slider.clientWidth
        this.children = this.$refs.sliderGroup.children

        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')

          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }

        // 针对循环播放,处理sliderGroup宽度
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initdots() {
        // 构建数组实例赋值给this.dots
        this.dots = new Array(this.children.length)
      },
      // 初始化轮播图配置
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 4000
          }
        })
        this.slider.on('scrollEnd', () => {
          this.currentIndex = this.slider.getCurrentPage().pageX
          if (this.loop) {
            this.currentIndex -= 1
          }
          if (this.autoPlay) {
            clearTimeout(this.timer)
            this._play()
          }
        })
      },
      _play() {
        let pageIndex = this.slider.getCurrentPage().pageX + 1
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"

    .slider
        min-height 1px
        .slider-group
            position relative
            overflow hidden
            white-space nowrap
            .slider-item
                float left
                box-sizing border-box
                overflow hidden
                text-align center
                a
                    display block
                    width 100%
                    overflow hidden
                    text-decoration none
                img
                    display block
                    width 100%
        .dots
            position absolute
            left 0px
            right 0px
            bottom 12px
            text-align center
            font-size 0
            .dot
                display inline-block
                margin 0 4px
                width 8px
                height 8px
                border-radius 50%
                background #fff
                &.active
                    width 20px
                    border-radius 5px
                    background $color-text-ll
</style>
