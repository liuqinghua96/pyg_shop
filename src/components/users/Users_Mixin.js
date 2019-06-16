export default {
  name: 'Users',
  data () {
    var checkMobile = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        return callback(new Error('手机号格式不正确'))
      }
      callback()
    }
    return {
      userList: [],
      queryMsg: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      dialogAddVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      stateValue: '',
      roleList: [],
      dialogAsignVisible: false,
      asignForm: {},
      dialogEditVisible: false,
      editForm: {},
      rules: {
        username: [
          { required: true, message: '用户名不得为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不得为空', trigger: 'change' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不得为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不得为空', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getData () {
      const {
        data: { data, meta }
      } = await this.$http.get('users', { params: this.queryMsg })
      if (meta.status !== 200) return this.$message.error('获取用户列表失败')
      this.userList = data.users
      this.total = data.total
    },
    changePager (newpage) {
      this.queryMsg.pagenum = newpage
      this.getData()
    },
    search () {
      this.getData()
    },
    addSubmit () {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const {
            data: { meta }
          } = await this.$http.post('users', this.addForm)
          if (meta.status !== 201) return this.$message.error('添加用户失败')
          this.$message.success('添加用户成功')
          this.dialogAddVisible = false
          this.getData()
        }
      })
    },
    showDialogAddForm () {
      this.dialogAddVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    delUser (id) {
      this.$confirm('永久删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const {
            data: { meta }
          } = await this.$http.delete(`users/${id}`)
          if (meta.status !== 200) return this.$message.error('删除用户失败')
          this.$message.success('删除用户成功')
          this.getData()
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    changeState (row) {
      this.$confirm('修改该用户状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const {
            data: { meta }
          } = await this.$http.put(`users/${row.id}/state/${row.mg_state}`)
          if (meta.status !== 200) { return this.$message.error('修改用户状态失败') }
          this.$message.success('修改用户状态成功')
          this.getData()
        })
        .catch(() => {
          this.$message.info('已取消修改')
          this.getData()
        })
    },
    async setState (row) {
      this.stateValue = ''
      this.dialogAsignVisible = true
      this.asignForm = row
      const {data: {data, meta}} = await this.$http.get('roles')
      if (meta.status !== 200) return this.$message.error('获取角色列表失败')
      this.roleList = data
    },
    async asignSubmit () {
      if (this.stateValue === '') {
        this.$message.error('未选中角色')
        return
      }
      const {data: {meta}} = await this.$http.put(`users/${this.asignForm.id}}/role`, {rid: this.stateValue})
      if (meta.status !== 200) return this.$message.error('分配用户角色失败')
      this.$message.success('分配用户角色成功')
      this.dialogAsignVisible = false
      this.getData()
    },
    editUser (row) {
      this.dialogEditVisible = true
      this.editForm = row
    },
    editSubmit () {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          const {data: {meta}} = await this.$http.put(`users/${this.editForm.id}`, {email: this.editForm.email, mobile: this.editForm.mobile})
          if (meta.status !== 200) return this.$message.error('编辑用户失败')
          this.$message.success('编辑用户成功')
          this.dialogEditVisible = false
          this.getData()
        }
      })
    }
  },
  mounted () {
    this.getData()
  }
}
