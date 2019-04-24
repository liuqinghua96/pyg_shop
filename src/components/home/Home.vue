<template>
  <el-container class="home_container">
    <el-header class="home_header">
      <el-button icon="iconfont icon-menu"
                 style="background:#bbb;border:#bbb"
                 @click="toggleMenu()"
                 circle></el-button>
      <span class="title">品优购后台管理系统</span>
      <el-button class="exit_btn"
                 type="danger"
                 @click="logout()"
                 round>退出</el-button>
    </el-header>
    <el-container>
      <el-aside class="home_aside"
                :width="collapse?'65px':'180px'">
        <el-menu background-color="#333744"
                 :unique-opened="true"
                 :collapse="collapse"
                 :collapse-transition="false"
                 :default-active="$route.name"
                 style="border: 0;margin-top: 5px;width: 100%"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 router>
          <el-submenu v-for="(item, index) in navList"
                      :key="item.id"
                      :index="''+item.order">
            <template slot="title">
              <i :class="['iconfont',iconArr[index]]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="subItem in item.children"
                            :key="subItem.id"
                            class="option"
                            :index="subItem.path">
                <i class="el-icon-menu"></i>
                {{subItem.authName}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="home_main">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      collapse: false,
      navList: [],
      iconArr: ['icon-user-fill', 'icon-cog', 'icon-shoppingcart', 'icon-file', 'icon-chart-area']
    }
  },
  methods: {
    toggleMenu () {
      this.collapse = !this.collapse
    },
    async getNavList () {
      const { data: { data, meta } } = await this.$http.get('menus')
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this.navList = data
    },
    logout () {
      sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  },
  mounted () {
    this.getNavList()
  }
}
</script>
<style scoped>
.home_container {
  height: 100%;
  width: 100%;
}
.home_header {
  background: #373d41;
  line-height: 60px;
}
.home_header .title {
  color: #ccc;
  font-size: 18px;
  padding-left: 16px;
}
.home_header .exit_btn {
  float: right;
  margin-top: 14px;
}
.home_aside {
  background: #333744;
}
.home_aside .option {
  box-sizing: border-box;
  width: 100%;
  min-width: 180px;
}
.home_main {
  background: #eaedf1;
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
