<template>
    <div class="com-button-wrap" @touchstart="touchStart" @touchend="touchEnd">
        <button @click="handleClick"
                role="button"
                :class="{'com-button':true,'com-button-sm':size === 'small','com-button-touch':isTouching, 'com-button-disabled': disabled}"
                tag="button"
                :disabled="disabled"
        >
            <label>
                <slot/>
            </label>
        </button>
    </div>
</template>

<script>
  export default {
    name: 'ComButton',
    props: {
      click: {
        type: Function,
        default: () => {
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: 'default'
      }
    },
    data() {
      return {
        isTouching: false
      };
    },
    methods: {
      touchStart() {
        if (this.disabled) return;
        this.isTouching = true;
      },
      handleClick(evt) {
        this.$emit('click', evt);
      },
      touchEnd() {
        this.isTouching = false;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '~common/stylus/variable';

    .com-button-wrap
        width 100%
        display inline-block

    .com-button
        width 100%
        height 38px
        line-height 38px
        background $theme-color
        border-radius 3px
        text-align center
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        color white
        outline none
        border 0
        transition 0.15s all

    .com-button-disabled
        opacity 0.4

    .com-button-touch
        background #579963

    .com-button-sm
        padding: 2px 10px
        border-radius: 5px
</style>
