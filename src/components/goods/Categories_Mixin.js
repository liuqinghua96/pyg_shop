export default {
  name: 'Categories',
  data () {
    return {
      getGoodsParams: {
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      goodsList: [],
      dialogAddVisible: false,
      addForm: {
        cat_pid: 0,
        cat_name: '',
        cat_level: 0
      },
      dialogEditVisible: false,
      editForm: {},
      rules: {
        cat_name: [
          { required: true, message: '用户名不得为空', trigger: 'blur' }
        ]
      },
      optionsList: [],
      selectedData: []
    }
  },
  methods: {
    async getData () {
      const {
        data: { data, meta }
      } = await this.$http.get('categories', { params: this.getGoodsParams })
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this.goodsList = data.result
      this.total = data.total
    },
    // 切换页码
    changePager (newPager) {
      this.getGoodsParams.pagenum = newPager
      this.getData()
    },
    // 添加分类的弹出层
    async addCategories () {
      const {
        data: { data, meta }
      } = await this.$http.get('categories', {
        params: { type: 2 }
      })
      if (meta.status !== 201) return this.$message.error(meta.msg)
      this.optionsList = data
      this.dialogAddVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
        this.selectedData = []
      })
    },
    // 添加分类的提交按钮
    addSubmit () {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          // 设置addForm中的参数
          const len = this.selectedData.length
          if (len !== 0) {
            this.addForm.cat_pid = this.selectedData[len - 1]
          }
          this.addForm.cat_level = len
          const {
            data: { meta }
          } = await this.$http.post('categories', this.addForm)
          if (meta.status !== 201) return this.$message.error(meta.msg)
          this.$message.success('添加分类成功')
          this.getData()
        }
      })
    },
    // 编辑分类的弹出层
    editCategories (id) {
      this.dialogEditVisible = true
      this.$nextTick(async () => {
        this.$refs.editForm.resetFields()
        const {
          data: { data, meta }
        } = await this.$http.get(`categories/${id}`)
        if (meta.status !== 200) return this.$message.error(meta.msg)
        this.editForm = data
      })
    },
    // 编辑分类的提交按钮
    async editSubmit () {
      const {
        data: { meta }
      } = await this.$http.put(`categories/${this.editForm.cat_id}`, {
        cat_name: this.editForm.cat_name
      })
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this.$message.success('编辑分类成功')
      this.getData()
      this.dialogEditVisible = false
    },
    // 删除分类
    delCategories (id) {
      this.$confirm('确认删除该分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const {
            data: { meta }
          } = await this.$http.delete(`categories/${id}`)
          if (meta.status !== 200) return this.$message.error(meta.msg)
          this.$message.success('删除分类成功')
          this.getData()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  mounted () {
    this.getData()
  }
}
