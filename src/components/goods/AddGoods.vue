<template>
  <div class="addGoods_container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path: '/goods'}">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 警告框 -->
      <el-alert title="请按照步骤录入商品信息"
                type="info"
                show-icon
                center="">
      </el-alert>
      <!-- 进度条 -->
      <el-steps :active="activeStep"
                align-center
                style="margin: 20px 0;">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
      </el-steps>
      <!-- 标签页 -->
      <el-tabs tab-position="left"
               :before-leave="beforeLeave">
        <el-tab-pane label="基本信息">
          <el-form label-position="right"
                   :model="baseForm"
                   label-width="80px"
                   :rules="rules"
                   ref="baseForm">
            <el-form-item label="商品名称"
                          prop="goods_name">
              <el-input v-model="baseForm.goods_name"
                        style="width:500px"></el-input>
            </el-form-item>
            <el-form-item label="所属分类"
                          prop="goods_cat">
              <el-cascader expand-trigger="hover"
                           :options="optionsList"
                           style="width: 300px"
                           v-model="selectValue"
                           @change="handleChange"
                           :props="{value: 'cat_id', label: 'cat_name'}">
              </el-cascader>
            </el-form-item>
            <el-form-item label="商品价格"
                          prop="goods_price">
              <el-input v-model.number="baseForm.goods_price"
                        style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="商品数量"
                          prop="goods_number">
              <el-input v-model.number="baseForm.goods_number"
                        style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="商品重量"
                          prop="goods_weight">
              <el-input v-model.number="baseForm.goods_weight"
                        style="width:300px"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数">
          <el-form label-position="right"
                   label-width="80px">
            <el-form-item :key="item.attr_id"
                          v-for="item in manyAttrs"
                          :label="item.attr_name">
              <el-tag :key="i"
                      v-for="(tag, i) in item.attr_vals?item.attr_vals.split(','):[]">{{tag}}</el-tag>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品属性">
          <el-form label-position="right"
                   label-width="180px">
            <el-form-item :key="item.attr_id"
                          v-for="item in onlyAttrs"
                          :label="item.attr_name">
              <el-tag v-if="item.attr_vals"
                      style="width:300px;">{{item.attr_vals}}</el-tag>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品图片">
          <el-upload :action="uploadUrl"
                     :headers="requsetHeader"
                     list-type="picture-card"
                     :on-preview="handlePictureCardPreview"
                     :on-remove="handleRemove"
                     :on-success="imgSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible"
                     width="40%"
                     title="图片详情">
            <img width="100%"
                 :src="dialogImageUrl"
                 alt="">
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="商品内容">
          <quill-editor v-model="baseForm.goods_introduce"
                        style="height: 200px;">
          </quill-editor>
           <el-button type="success" @click="submitAddGood()">提交商品</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import Mixin from './AddGoods_Mixin'
export default {
  mixins: [Mixin]
}
</script>
<style scoped>
.el-tabs {
  margin-top: 60px;
}
.el-form {
  margin: 0 0 0 100px;
}
.el-form-item {
  margin: 16px 0;
}
.el-form-item:first-child {
  margin: 0;
}
.el-tag {
  margin-right: 6px;
}
.el-button {
  margin-top: 60px;
}
</style>
