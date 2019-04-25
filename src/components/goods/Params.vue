<template>
  <div class="users_container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 警告框 -->
      <el-alert title="注意：第三级分类才可设置参数。"
                type="warning"
                show-icon>
      </el-alert>
    </el-card>
  </div>
</template>
<script>
import Mixin from './Params_Mixin'
export default {
  mixins: [Mixin]
}
</script>
<style scoped>
</style>
