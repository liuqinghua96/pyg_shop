import echarts from 'echarts'
export default {
  name: 'Report',
  data () {
    return {
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  methods: {
    async getDateCharts () {
      const myChart = echarts.init(this.$refs.myChart)
      const { data: { data, meta } } = await this.$http.get('reports/type/1')
      if (meta.status !== 200) return this.$message.error('获取报表数据失败')
      this.options = Object.assign(this.options, data)
      myChart.setOption(this.options)
    }
  },
  mounted () {
    this.getDateCharts()
  }
}
