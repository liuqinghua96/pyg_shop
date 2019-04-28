<template>
  <div class="goods_container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <el-row :gutter="20">
        <!-- 搜索框 -->
        <el-col :span="6">
          <el-input placeholder="请输入内容"
                    v-model="queryMsg.query"
                    class="input-with-select">
            <el-button slot="append"
                       @click="search()"
                       icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <!-- 添加商品 -->
        <el-col :span="18">
          <el-button type="primary"
                     plain>添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 用户信息表格 -->
      <el-table :data="goodsList"
                stripe
                style="width: 100%">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="goods_name"
                         width="600"
                         label="商品名称">
        </el-table-column>
        <el-table-column prop="goods_price"
                         label="价格"
                         width="100">
        </el-table-column>
        <el-table-column prop="goods_weight"
                         label="重量"
                         width="100">
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            {{scope.row.add_time|changeTime}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="mini"
                         icon="el-icon-edit"
                         round></el-button>
              <el-button size="mini"
                         icon="el-icon-delete"
                         @click="delGood(scope.row.goods_id)"
                         round></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background
                     :page-size="queryMsg.pagesize"
                     :current-page="queryMsg.pagenum"
                     layout="prev, pager, next"
                     :total="total"
                     @current-change="changePager">
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
import Mixin from './Goods_Mixin'
export default {
  mixins: [Mixin]
}
</script>
<style scoped>

</style>
