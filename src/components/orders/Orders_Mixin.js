export default {
  name: 'Orders',
  data () {
    return {
      queryMsg: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      ordersList: []
    }
  },
  methods: {
    async getData () {
      const {data: {data, meta}} = await this.$http.get('orders', {params: this.queryMsg})
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this.ordersList = data.goods
      this.total = data.total
    },
    search () {
      this.getData()
    },
    changePager (newpage) {
      this.queryMsg.pagenum = newpage
      this.getData()
    }
  },
  mounted () {
    this.getData()
  }
}
