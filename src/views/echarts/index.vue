<template>
  <div>
    <bar titleList="Mon, Tue, Wed, Thu, Fri, Sat, Sun"></bar>
    <!-- <div id="main" style="width: 600px; height: 400px"></div> -->
  </div>
</template>
<script>
// http://localhost:8080/#/echarts
import bar from '@/components/e-charts/bar.vue'
export default {
  name: 'echarts',
  components: { bar },
  props: {},
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
    // 接下来的使用就跟之前一样，初始化图表，设置配置项
    // var myChart = echarts.init(document.getElementById('main'))
    // myChart.setOption({
    //   xAxis: {
    //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    //   },
    //   yAxis: {},
    //   series: [
    //     {
    //       type: 'bar',
    //       data: [23, 24, 18, 25, 27, 28, 25]
    //     }
    //   ]
    // })
  },
  destroyed () { },
  methods: {
  }
}
</script>

<style lang='' scoped>
</style>
