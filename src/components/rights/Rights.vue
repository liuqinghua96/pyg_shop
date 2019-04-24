<template>
  <div class="rights_container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-table :data="rightsList"
                stripe
                height="400"
                style="width: 100%">
        <el-table-column type="index"
                         width="50">
        </el-table-column>
        <el-table-column property="authName"
                         label="权限名称">
        </el-table-column>
        <el-table-column property="path"
                         label="路径">
        </el-table-column>
        <el-table-column label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级权限</el-tag>
            <el-tag v-if="scope.row.level === '1'" type="success">二级权限</el-tag>
            <el-tag v-if="scope.row.level === '2'" type="warning">三级权限</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import Mixin from './Rights_Mixin'
export default {
  mixins: [Mixin]
}
</script>
<style scoped>
</style>
