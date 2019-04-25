<template>
  <div class="roles_container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-button type="primary"
                 plain
                 @click="addRole()">添加角色</el-button>
      <el-table :data="rolesList"
                stripe
                style="width: 100%">
        <!-- 表格展开部分 -->
        <el-table-column type="expand"
                         width="50">
          <template slot-scope="scope">
            <span v-if="!scope.row.child.length"
                  style="color:#bbb">该角色暂未分配权限</span>
            <el-row :gutter="20"
                    v-for="(item,index) in scope.row.child"
                    :key="item.id"
                    style="border-bottom:1px solid #eee"
                    :style="{'border-top':index===0?'1px solid #eee':'none'}">
              <!-- 一级权限 -->
              <el-col :span="4">
                <el-tag closable
                        @close="delRights(scope.row,item.id)">{{item.authName}}</el-tag>
                <span class="el-icon-caret-right"></span>
              </el-col>
              <el-col :span="20">
                <el-row v-for="(subItem,subIndex) in item.child"
                        :key="subItem.id"
                        :style="{'border-top':subIndex===0?'none':'1px solid #eee'}">
                  <!-- 二级权限-->
                  <el-col :span="6">
                    <el-tag closable
                            @close="delRights(scope.row,subItem.id)"
                            type="success">{{subItem.authName}}</el-tag>
                    <span class="el-icon-caret-right"></span>
                  </el-col>
                  <!-- 三级权限 -->
                  <el-col :span="18">
                    <el-tag closable
                            @close="delRights(scope.row,lastItem.id)"
                            v-for="lastItem in subItem.child"
                            :key="lastItem.id"
                            type="warning">{{lastItem.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"
                         width="50">
        </el-table-column>
        <el-table-column property="roleName"
                         label="角色名称">
        </el-table-column>
        <el-table-column property="roleDesc"
                         label="角色描述">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="mini"
                         icon="el-icon-edit"
                         round
                         @click="editRole(scope.row)"></el-button>
              <el-button size="mini"
                         icon="el-icon-delete"
                         @click="delRole(scope.row.id)"></el-button>
              <el-tooltip class="item"
                          effect="dark"
                          content="分配权限"
                          placement="right">
                <el-button size="mini"
                           icon="el-icon-setting"
                           round
                           @click="asignRights(scope.row)"></el-button>
              </el-tooltip>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加角色弹出层 -->
      <el-dialog title="添加角色"
                 :visible.sync="dialogAddVisible"
                 width="400px">
        <el-form :model="addForm"
                 label-width="80px"
                 :rules="rules"
                 ref="addForm">
          <el-form-item label="角色名称"
                        prop="roleName">
            <el-input v-model="addForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述"
                        prop="roleDesc">
            <el-input v-model="addForm.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogAddVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="addSubmit()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑角色弹出层 -->
      <el-dialog title="编辑角色"
                 :visible.sync="dialogEditVisible"
                 width="400px">
        <el-form :model="editForm"
                 label-width="80px"
                 :rules="rules"
                 ref="editForm">
          <el-form-item label="角色名称"
                        prop="roleName">
            <el-input v-model="editForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述"
                        prop="roleDesc">
            <el-input v-model="editForm.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogEditVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="editSubmit()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分配权限弹出层 -->
      <el-dialog width="400px"
                 title="分配权限"
                 :visible.sync="dialogAsignVisible">
        <el-tree :data="rightsTree"
                 show-checkbox
                 node-key="id"
                 :default-expand-all="true"
                 :default-checked-keys="defaultChecked"
                 :props="defaultProps"
                 ref="treeChecked">
        </el-tree>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogAsignVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="asignSubmit()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import Mixin from './Roles_Mixin'
export default {
  mixins: [Mixin]
}
</script>
<style scoped>
.el-row {
  display: flex;
  align-items: center;
}
.el-tag {
  margin: 10px 5px;
}
</style>
