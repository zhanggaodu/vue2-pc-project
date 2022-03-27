<template>
  <button id="top" @click="toTop">回到顶部</button>
</template>
<script>

export default {
  props: {},
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {

  },
  methods: {
    toTop () {
      document.getElementById('top').scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<style lang='sass' scoped>
</style>
