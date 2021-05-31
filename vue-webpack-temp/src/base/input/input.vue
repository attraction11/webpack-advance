<template>
    <div :class="{'com-input-wrap':true,'com-input-active': isActive}">
        <input type="text"
               @focus="inputFocus"
               @blur="inputBlur"
               @input="inputChange"
               @keyup.enter="keyupEnter"
               :value="value"
               ref="input"
               :class="{'com-input':true}"
               :disabled="disabled"
               :placeholder="placeholder"
        />
        <slot></slot>
    </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    name: 'ComButton',
    props: {
      value: {
        type: String,
        default: ''
      },
      input: {
        type: Function,
        default: () => {
        }
      },
      focus: {
        type: Function,
        default: () => {
        }
      },
      disabled: {
        type: Boolean,
        default: () => {
        }
      },
      placeholder: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isActive: false,
        inputValue: ''
      }
    },
    methods: {
      inputFocus() {
        this.focus();
        // this.isActive = true
      },
      keyupEnter(e) {
        this.$emit('enter', e.target.value);
      },
      inputBlur(e) {
        this.$emit('blur', e.target.value);
        // this.isActive = false;
      },
      inputChange(evt) {
        this.$emit('input', evt.target.value);
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .com-input-wrap
        border-bottom 1px solid $border-color-grey
        transition .3s all
        .com-input
            position relative
            width 80%
            border 0
            background-color #ededed
            color #333
            padding 5px
            outline none
            border-radius 3px

    .com-input-active
        border-bottom-color $theme-color

    .hairlines .com-input
        border-bottom-width .5px
</style>
