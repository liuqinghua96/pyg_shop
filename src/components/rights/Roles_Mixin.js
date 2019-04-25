export default {
  name: 'Roles',
  data () {
    return {
      rolesList: [],
      dialogAddVisible: false,
      dialogEditVisible: false,
      dialogAsignVisible: false,
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      editForm: {
        id: '',
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '角色名称必填', trigger: 'blur' }
        ],
        roleDesc: [{ required: true, message: '角色描述必填', trigger: 'blur' }]
      },
      defaultChecked: [],
      rightsTree: [],
      asignRoleId: '',
      defaultProps: {
        id: 'id',
        children: 'children',
        label: 'authName'
      }
    }
  },
  methods: {
    // 转换children为child
    toChild (data) {
      data.forEach(element => {
        if (!element.children) return false
        element.child = element.children
        delete element.children
        this.toChild(element.child)
      })
    },
    // 初始时加载角色列表
    async getData () {
      const {
        data: { data, meta }
      } = await this.$http.get('roles')
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this.toChild(data)
      this.rolesList = data
    },
    // 显示添加角色的弹出层
    addRole () {
      this.dialogAddVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    // 添加角色的提交按钮功能
    addSubmit () {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const {
            data: { meta }
          } = await this.$http.post('roles', this.addForm)
          if (meta.status !== 201) return this.$message.error(meta.msg)
          this.$message.success('添加角色成功')
          this.dialogAddVisible = false
          this.getData()
        }
      })
    },
    // 删除角色
    delRole (id) {
      this.$confirm('确定删除该角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const {
            data: { meta }
          } = await this.$http.delete(`roles/${id}`)
          if (meta.status !== 200) return this.$message.error(meta.msg)
          this.$message.success(meta.msg)
          this.getData()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 显示编辑角色的弹出层
    editRole (row) {
      this.dialogEditVisible = true
      this.editForm.id = row.id
      this.editForm.roleName = row.roleName
      this.editForm.roleDesc = row.roleDesc
    },
    // 编辑角色的提交按钮功能
    editSubmit () {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          const {
            data: { meta }
          } = await this.$http.put(`roles/${this.editForm.id}`, {
            roleName: this.editForm.roleName,
            roleDesc: this.editForm.roleDesc
          })
          if (meta.status !== 200) return this.$message.error(meta.msg)
          this.$message.success('修改角色成功')
          this.dialogEditVisible = false
          this.getData()
        }
      })
    },
    // 删除表格隐藏位置权限功能
    async delRights (row, id) {
      this.$confirm('确定删除该权限?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const {
            data: { data, meta }
          } = await this.$http.delete(`roles/${row.id}/rights/${id}`)
          if (meta.status !== 200) return this.$message.error(meta.msg)
          this.$message.success('删除权限成功')
          this.toChild(data)
          row.child = data
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 显示分配权限的弹出层
    async asignRights (row) {
      this.defaultChecked = []
      const {data: {data, meta}} = await this.$http.get(`rights/tree`)
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this.rightsTree = data
      this.asignRoleId = row.id
      // 只将最后一层数据的id放到defauChecked数组中即可
      row.child.forEach(item => {
        item.child.forEach(item => {
          item.child.forEach(item => {
            this.defaultChecked.push(item.id)
          })
        })
      })
      this.dialogAsignVisible = true
    },
    // 分配权限的提交按钮
    async asignSubmit () {
      // 合并全选与半选框
      const treeDom = this.$refs.treeChecked
      const holeCheck = treeDom.getCheckedKeys()
      const halfCheck = treeDom.getHalfCheckedKeys()
      const arr = [...holeCheck, ...halfCheck]
      const submitStr = arr.join(',')
      const {data: {meta}} = await this.$http.post(`roles/${this.asignRoleId}/rights`, {rids: submitStr})
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this.$message.success('分配权限成功')
      this.dialogAsignVisible = false
      this.getData()
    }
  },
  mounted () {
    this.getData()
  }
}
