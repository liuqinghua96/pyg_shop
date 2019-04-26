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
      <!-- 级联列表的菜单 -->
      <el-form label-width="100px"
               style="margin: 15px 0">
        <el-form-item label="选择商品分类">
          <el-cascader expand-trigger="hover"
                       :options="optionsList"
                       style="width: 300px"
                       v-model="selectValue"
                       @change="handleChange"
                       :props="{value: 'cat_id', label: 'cat_name'}">
          </el-cascader>
        </el-form-item>
      </el-form>
      <!-- tab栏切换 -->
      <el-tabs v-model="activeName"
               @tab-click="handleClick">
        <!-- 动态参数表格 -->
        <el-tab-pane label="动态参数"
                     name="many">
          <el-button type="success"
                     :disabled="disabled"
                     @click="addParams()">添加动态参数</el-button>
          <el-table :data="paramsArr"
                    style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag v-for="(item, i) in scope.row.attr_vals"
                        :key="item.attr_id"
                        size="normal"
                        closable
                        @close="delTag(scope.row, i)">
                  {{item}}
                </el-tag>
                <el-input v-if="scope.row.inputShow"
                          style="width:100px"
                          :ref="'input'+scope.row.attr_id"
                          v-model="addTagInputValue"
                          @blur="addTag(scope.row)"
                          @keyup.native.enter="addTag(scope.row)"></el-input>
                <el-tag size="normal"
                        type="success"
                        v-else
                        style="width:100px"
                        :disable-transitions="true"
                        @click="clickTag(scope.row)">+添加tag</el-tag>
              </template>
            </el-table-column>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column label="属性名称"
                             prop="attr_name">
            </el-table-column>
            <el-table-column label="操作"
                             width="200">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button class="el-icon-edit"
                             round
                             @click="editParams(scope.row.attr_id)"></el-button>
                  <el-button class="el-icon-delete"
                             round
                             @click="delParams(scope.row.attr_id)"></el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 静态参数表格 -->
        <el-tab-pane label="静态参数"
                     name="only">
          <el-button type="success"
                     :disabled="disabled"
                     @click="addParams()">添加静态参数</el-button>
          <el-table :data="paramsArr"
                    style="width: 100%">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column label="属性名称"
                             prop="attr_name">
            </el-table-column>
            <el-table-column label="属性值">
              <template slot-scope="scope">
                <el-tag size="normal"
                        style="width: 300px">{{scope.row.attr_vals}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作"
                             width="200">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button class="el-icon-edit"
                             round
                             @click="editParams(scope.row.attr_id)"></el-button>
                  <el-button class="el-icon-delete"
                             round
                             @click="delParams(scope.row.attr_id)"></el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加静态、动态参数弹出层 -->
    <el-dialog width="400px"
               :title="activeName === 'many' ? '添加动态参数':'添加静态参数'"
               :visible.sync="dialogAddVisible">
      <el-form :model="addForm"
               label-width="80px"
               autocomplete="off"
               :rules="rules"
               ref="addForm">
        <el-form-item label="参数名称"
                      prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑静态、动态参数弹出层 -->
    <el-dialog width="400px"
               :title="activeName === 'many' ? '编辑动态参数':'编辑静态参数'"
               :visible.sync="dialogEditVisible">
      <el-form :model="editForm"
               label-width="80px"
               autocomplete="off"
               :rules="rules"
               ref="editForm">
        <el-form-item label="参数名称"
                      prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
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
import Mixin from './Params_Mixin'
export default {
  mixins: [Mixin]
}
</script>
<style scoped>
.el-tag {
  margin: 5px;
}
</style>
