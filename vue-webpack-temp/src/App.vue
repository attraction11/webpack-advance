<template>
    <div id="app" @touchmove.prevent>
        <v-header></v-header>
        <v-tab></v-tab>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from '@components/m-header/m-header'
  import Tab from '@components/tab/tab'

  export default {
    components: {
      'v-header': MHeader,
      'v-tab': Tab
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
