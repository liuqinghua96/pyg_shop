export default {
  name: 'Goods',
  data () {
    return {
      queryMsg: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      goodsList: []
    }
  },
  methods: {
    async getData () {
      const {data: {data, meta}} = await this.$http.get('goods', {params: this.queryMsg})
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this.goodsList = data.goods
      this.total = data.total
    },
    search () {
      this.getData()
    },
    changePager (newpage) {
      this.queryMsg.pagenum = newpage
      this.getData()
    },
    async delGood (id) {
      this.$confirm('永久删除该商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const {
            data: { meta }
          } = await this.$http.delete(`goods/${id}`)
          if (meta.status !== 200) return this.$message.error(meta.msg)
          this.$message.success('删除商品成功')
          this.getData()
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    }
  },
  mounted () {
    this.getData()
  }
}
