export default {
  name: 'Params',
  data () {
    return {
      // 级联对应部分
      selectValue: [],
      optionsList: [],
      // tab栏部分
      activeName: 'many',
      paramsArr: [],
      // manyArr: [],
      // onlyArr: [],
      // 设置添加按钮能否点击
      disabled: true,
      // 添加参数弹出层
      dialogAddVisible: false,
      addForm: {
        attr_name: ''
      },
      // 编辑参数弹出层
      dialogEditVisible: false,
      editForm: {},
      rules: {
        attr_name: [
          {required: true, message: '参数名不能为空', tigger: 'blur'}
        ]
      },
      addTagInputValue: ''
    }
  },
  computed: {
    // 级联组件第三级数据的id
    id: function () {
      if (this.selectValue.length === 3) {
        return this.selectValue[2]
      } else {
        return null
      }
    }
  },
  methods: {
    // 级联部分
    handleChange () {
      this.getParams()
    },
    async getData () {
      const {
        data: { data, meta }
      } = await this.$http.get('categories', { params: { type: 3 } })
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this.optionsList = data
    },
    // tab栏部分
    handleClick () {
      this.getParams()
    },
    // 获取参数列表
    async getParams () {
      const len = this.selectValue.length
      if (len === 3) {
        this.disabled = false
        const {data: {data, meta}} = await this.$http.get(`categories/${this.id}/attributes`, {params: {sel: this.activeName}})
        if (meta.status !== 200) return this.$message.error(meta.msg)
        if (this.activeName === 'many') {
          data.forEach(element => {
            element.attr_vals = element.attr_vals.length ? element.attr_vals.split(',') : []
            // 设置input与el-tag的显示与隐藏
            element.inputShow = false
          })
        }
        this.paramsArr = data
      } else {
        this.disabled = true
        this.selectValue = []
      }
    },
    addParams () {
      this.dialogAddVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    addSubmit () {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const {data: {meta}} = await this.$http.post(`categories/${this.id}/attributes`, {attr_name: this.addForm.attr_name, attr_sel: this.activeName})
          if (meta.status !== 201) return this.$message.error(meta.msg)
          this.$message.success('添加参数成功')
          this.dialogAddVisible = false
          this.getParams()
        }
      })
    },
    delParams (attrId) {
      this.$confirm('确认删除该参数?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data: {meta}} = await this.$http.delete(`categories/${this.id}/attributes/${attrId}`)
        if (meta.status !== 200) return this.$message.error(meta.msg)
        this.$message.success('删除参数成功')
        this.getParams()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async delTag (row, attrId) {
      row.attr_vals.splice(attrId, 1)
      const {data: {meta}} = await this.$http.put(`categories/${this.id}/attributes/${attrId}`, {
        attr_name: row.attr_name,
        attr_sel: row.attr_sel,
        attr_vals: row.attr_vals.join(',')
      })
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this.$message.success('删除选项成功')
    },
    async editParams (attrId) {
      this.dialogEditVisible = true
      const {data: {data, meta}} = await this.$http.get(`categories/${this.id}/attributes/${attrId}`)
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this.editForm = data
    },
    editSubmit () {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          const {data: {meta}} = await this.$http.put(`categories/${this.id}/attributes/${this.editForm.attr_id}`, {
            attr_name: this.editForm.attr_name,
            attr_sel: this.editForm.attr_sel,
            attr_vals: this.editForm.attr_vals
          })
          if (meta.status !== 200) return this.$message.error(meta.msg)
          this.getParams()
          this.dialogEditVisible = false
        }
      })
    },
    clickTag (row) {
      row.inputShow = true
      this.$nextTick(() => {
        this.$refs['input' + row.attr_id].focus()
      })
    },
    async addTag (row) {
      if (this.addTagInputValue !== '') {
        row.attr_vals.push(this.addTagInputValue)
        const {data: {meta}} = await this.$http.put(`categories/${this.id}/attributes/${row.attr_id}`, {
          attr_name: row.attr_name,
          attr_sel: row.attr_sel,
          attr_vals: row.attr_vals.join(',')
        })
        if (meta.status !== 200) return this.$message.error(meta.msg)
        row.inputShow = false
        this.addTagInputValue = ''
        // this.getParams()
      } else {
        row.inputShow = false
      }
    }
  },
  mounted () {
    this.getData()
  }
}
