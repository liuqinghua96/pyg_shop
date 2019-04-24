export default {
  name: 'Rights',
  data () {
    return {
      rightsList: []
    }
  },
  methods: {
    async getData () {
      const {data: {data, meta}} = await this.$http.get(`rights/list`)
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this.rightsList = data
    }
  },
  mounted () {
    this.getData()
  }
}
