<template>
  <div class="report_container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <div class="wrapper" style="width: 600px;height:400px;" ref="myChart"></div>
    </el-card>
  </div>
</template>

<script>
import Mixin from './Report_Mixin'
export default {
  mixins: [Mixin]
}
</script>

<style scoped>
</style>
