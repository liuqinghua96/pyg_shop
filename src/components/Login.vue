<template>
  <div class="login_container">
    <div class="box">
      <img src="../assets/images/logo.png"
           alt="">
      <el-form ref="form"
               :model="form"
               :rules="rules">
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-user-fill"
                    type="text"
                    v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="iconfont icon-eye-slash"
                    type="password"
                    v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item class="button-group">
          <el-button type="primary"
                     @click="submit()">登录</el-button>
          <el-button @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const { data: { data, meta } } = await this.$http.post('login', this.form)
          if (meta.status !== 200) return this.$message.error({ message: meta.msg || '登录失败', duration: 1000 })
          sessionStorage.setItem('token', data.token)
          this.$router.push('/home')
        }
      })
    },
    reset () {
      this.form.username = ''
      this.form.password = ''
    }
  }
}
</script>
<style scoped>
.login_container {
  height: 100%;
  width: 100%;
  background: linear-gradient(45deg, #ccc, #105763);
  position: relative;
}
.login_container .box {
  height: 250px;
  width: 400px;
  box-shadow: 0 0 10px #fff;
  border-radius: 5px;
  background: linear-gradient(45deg, #d2ecf1, #efefef);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  padding: 0 15px;
  box-sizing: border-box;
}
.login_container .box img {
  display: block;
  width: 200px;
  margin: 15px auto;
}
.button-group {
  text-align: center;
}
.button-group button {
  margin: 8px 15px;
}
</style>
