<template>
  <button id="top" @click="toTop">回到顶部</button>
</template>
<script>

export default {
  name: 'totop',
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

<style scoped>
button {
  width: 100px;
  height: 40px;
}
</style>
