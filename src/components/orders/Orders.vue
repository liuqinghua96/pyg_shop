<template>
  <div class="goods_container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
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
      </el-row>
      <!-- 用户信息表格 -->
      <el-table :data="ordersList"
                stripe
                style="width: 100%">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="order_number"
                         label="订单编号">
        </el-table-column>
        <el-table-column prop="order_price"
                         label="订单金额">
        </el-table-column>
        <el-table-column label="是否付款">
          <template slot-scope="scope">
            {{scope.row.pay_status==='1' ? '已付款' : '未付款'}}
          </template>
        </el-table-column>
        <el-table-column prop="is_send"
                         label="是否发货">
        </el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scope">
            {{scope.row.create_time|changeTime}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button size="mini"
                      icon="el-icon-location"
                      round
                      @click="dialogVisible=true"></el-button>
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
    <el-dialog title="物流详情"
               :visible.sync="dialogVisible"
               width="30%">
      <el-timeline>
        <el-timeline-item v-for="(activity, index) in activities"
                          :key="index"
                          :timestamp="activity.time">
          {{activity.context}}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>
<script>
import Mixin from './Orders_Mixin'
export default {
  mixins: [Mixin]
}
</script>
<style scoped>
</style>
