<template>
  <div class="users_container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <!-- 搜索框 -->
        <el-col :span="6">
          <el-input v-model="queryMsg.query"
                    placeholder="请输入内容"
                    class="input-with-select">
            <el-button slot="append"
                       @click="search()"
                       icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <!-- 添加用户 -->
        <el-col :span="18">
          <el-button type="primary"
                     @click="showDialogAddForm()"
                     plain>添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户信息表格 -->
      <el-table :data="userList"
                stripe
                style="width: 100%">
        <el-table-column prop="username"
                         label="用户名">
        </el-table-column>
        <el-table-column prop="email"
                         label="邮箱">
        </el-table-column>
        <el-table-column prop="mobile"
                         label="电话">
        </el-table-column>
        <el-table-column prop="role_name"
                         label="角色">
        </el-table-column>
        <el-table-column prop="mg_state"
                         label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state"
                       @change="changeState(scope.row)"
                       active-color="#13ce66"
                       inactive-color="#ccc">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="mini"
                         icon="el-icon-edit"
                         round
                         @click="editUser(scope.row)"></el-button>
              <el-button size="mini"
                         icon="el-icon-delete"
                         @click="delUser(scope.row.id)"></el-button>
              <el-button size="mini"
                         icon="el-icon-setting"
                         round
                         @click="setState(scope.row)"></el-button>
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
    <!-- 添加用户弹出层 -->
    <el-dialog width="400px"
               title="添加用户"
               :visible.sync="dialogAddVisible">
      <el-form :model="addForm"
               label-width="80px"
               autocomplete="off"
               :rules="rules"
               ref="addForm">
        <el-form-item label="用户名"
                      prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password"
                      type="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
                      prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 用户分配角色弹出层 -->
    <el-dialog width="400px"
               title="分配角色"
               :visible.sync="dialogAsignVisible">
      <el-form :model="asignForm"
               label-width="80px"
               autocomplete="off"
               ref="addForm">
        <el-form-item label="当前用户">
          {{ asignForm.username }}
        </el-form-item>
        <el-form-item label="当前角色">
          {{ asignForm.role_name }}
        </el-form-item>
        <el-form-item label="分配角色">
          <el-select v-model="stateValue"
                     placeholder="请选择">
            <el-option v-for="item in roleList"
                       :key="item.id"
                       :label="item.roleName"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogAsignVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="asignSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户弹出层 -->
    <el-dialog width="400px"
               title="编辑用户"
               :visible.sync="dialogEditVisible">
      <el-form :model="editForm"
               label-width="80px"
               autocomplete="off"
               :rules="rules"
               ref="editForm">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
                      prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
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
import Mixin from './Users_Mixin'
export default {
  mixins: [Mixin]
}
</script>
<style scoped>
</style>
