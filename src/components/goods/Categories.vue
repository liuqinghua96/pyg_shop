<template>
  <div class="users_container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <el-button type="primary"
                 plain
                 @click="addCategories()">添加分类</el-button>
      <el-table :data="goodsList"
                style="width: 100%;margin-bottom: 20px;"
                row-key="cat_id"
                :indent="50">
        <el-table-column prop="cat_name"
                         label="分类名称"
                         width="700">
        </el-table-column>
        <el-table-column prop="cat_deleted"
                         label="是否有效">
          <template slot-scope="scope">
            <i v-if="!scope.row.cat_deleted"
               class="el-icon-success"
               style="color:green"></i>
            <i v-else
               class="el-icon-error"
               style="color:red"></i>
          </template>
        </el-table-column>
        <el-table-column label="等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.cat_level===0">一级分类</el-tag>
            <el-tag type="success"
                    v-if="scope.row.cat_level===1">二级分类</el-tag>
            <el-tag type="warning"
                    v-if="scope.row.cat_level===2">三级分类</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="mini"
                         icon="el-icon-edit"
                         round
                         @click="editCategories(scope.row.cat_id)"></el-button>
              <el-button size="mini"
                         icon="el-icon-delete"
                         round
                         @click="delCategories(scope.row.cat_id)"></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页控件 -->
      <el-pagination background
                     layout="prev, pager, next"
                     :total="total"
                     :page-size="getGoodsParams.pagesize"
                     :current-page="getGoodsParams.pagenum"
                     @current-change="changePager">
      </el-pagination>
    </el-card>
    <!-- 添加分类弹出层 -->
    <el-dialog width="400px"
               title="添加分类"
               :visible.sync="dialogAddVisible">
      <el-form :model="addForm"
               label-width="80px"
               autocomplete="off"
               :rules="rules"
               ref="addForm">
        <el-form-item label="分类名称"
                      prop="cat_name">
          <el-input v-model="addForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类"
                      prop="password">
          <!-- 级联组件 -->
          <el-cascader expand-trigger="hover"
                       :options="optionsList"
                       v-model="selectedData"
                       style="width:100%"
                       change-on-select
                       clearable
                       :props="{label: 'cat_name', value: 'cat_id'}">
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑分类弹出层 -->
    <el-dialog width="400px"
               title="编辑分类"
               :visible.sync="dialogEditVisible">
      <el-form :model="editForm"
               label-width="80px"
               autocomplete="off"
               :rules="rules"
               ref="editForm">
        <el-form-item label="分类名称"
                      prop="cat_name">
          <el-input v-model="editForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="editSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Mixin from './Categories_Mixin'
export default {
  mixins: [Mixin]
}
</script>
<style scoped>
</style>
