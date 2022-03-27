<template>
  <div :id="id" :style="size"></div>
</template>
<script>
import echarts from '@/plugin/e-charts'
// import * as echarts from 'echarts/core'
export default {
  name: 'bar',
  components: {},
  props: {
    id: {
      type: String,
      default: 'main'
    },
    size: {
      type: String,
      default: 'width: 600px; height: 400px'
    },
    titleList: {
      type: String,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: 'Mon, Tue, Wed, Thu, Fri, Sat, Sun'
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
    var myChart = echarts.init(document.getElementById('main'))
    myChart.setOption({
      xAxis: {
        data: this.titleList.split(',') || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: [23, 24, 18, 25, 27, 28, 25]
        }
      ]
    })
  },
  destroyed () { },
  methods: {
  }
}
</script>

<style lang='' scoped>
</style>
