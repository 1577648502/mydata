<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="dialogVisible = true"
            >添加角色</el-button
          >
        </el-col>
      </el-row>

      <!-- 角色列表 -->
      <el-table :data="rolesList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="[
                'borderBottom',
                index1 === 0 ? 'borderTop' : '',
                'rowDs',
              ]"
              v-for="(i1, index1) in scope.row.children"
              :key="i1.id"
            >
              <!-- 一级标题 -->
              <el-col :span="5">
                <el-tag closable @close="deleteUser(scope.row, i1.id)">{{
                  i1.authName
                }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级三级标题 -->
              <el-col :span="19">
                <el-row
                  v-for="(i2, index2) in i1.children"
                  :key="i2.id"
                  :class="[index2 === 0 ? '' : 'borderTop', 'rowDs']"
                >
                  <el-col :span="6">
                    <el-tag
                      closable
                      @close="deleteUser(scope.row, i2.id)"
                      type="success"
                      >{{ i2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="(i3) in i2.children"
                      :key="i3.id"
                      closable
                      @close="deleteUser(scope.row, i3.id)"
                      >{{ i3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 序号列 -->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="getUsername(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteUser(scope.row.id)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="getRightList(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加角色弹出层 -->
    <el-dialog
      title="添加角色"
      :visible.sync="dialogVisible"
      @closed="addDialogClosed"
      width="50%"
    >
      <el-form
        :model="rolesLists"
        :rules="rolesListRules"
        ref="rolesListRef"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="rolesLists.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="rolesLists.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑角色弹出层 -->
    <el-dialog
      title="添加角色"
      :visible.sync="dialogVisible1"
      @closed="addDialogClosed"
      width="50%"
    >
      <el-form :model="UserList" ref="rolesListRef" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="UserList.roleName" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="UserList.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="putUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑权限弹出层 -->
    <el-dialog
      title="编辑权限"
      :visible.sync="dialogVisible2"
      width="50%"
      @close="setRightKeys()"
    >
      <!-- 树形控件 -->
      <el-tree
        :data="rightList"
        :props="defaultProps"
        default-expand-all
        show-checkbox
        node-key="id"
        ref="rightRef"
        :default-checked-keys="righKeys"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="putRightList"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rolesList: [],
      rolesLists: {
        roleName: "",
        roleDesc: "",
      },
      UserList: {},
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      rolesListRules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      rightList: [],
      // 树形空间属性
      defaultProps: {
        children: "children",
        label: "authName",
      },
      //树形空间按id显示内容
      righKeys: [],
      //提交用户权限的id
      id:''
    };
  },
  created() {
    console.log(this.rightList);
    this.getRolesList();
  },
  methods: {
    //获取角色列表
    getRolesList() {
      this.$http
        .get("roles")
        .then((res) => {
          this.rolesList = res.data.data;
          //   this.rolesLists=res.data.data[];
          console.log(this.rolesLists);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //添加角色界面弹出层
    addUser() {
      this.dialogVisible = true;
    },
    //添加角色界面关闭重置表单
    addDialogClosed() {
      this.$refs.rolesListRef.resetFields();
    },
    // 添加角色
    getUser() {
      this.$http
        .post("roles", this.rolesLists)
        .then((res) => {
          console.log(res);
          this.$message.success(" 添加成功");
          this.dialogVisible = false;
          this.getRolesList();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //id获取角色信息
    getUsername(id) {
      this.$http
        .get("roles/" + id)
        .then((res) => {
          console.log(res);
          this.UserList = res.data.data;
          this.dialogVisible1 = true;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //编辑角色信息
    putUser() {
      this.$http
        .put("roles/" + this.UserList.roleId, {
          roleName: this.UserList.roleName,
          roleDesc: this.UserList.roleDesc,
        })
        .then((res) => {
          console.log(this.UserList);
          this.$message.success(" 添加成功");
          this.dialogVisible1 = false;
          this.getRolesList();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //删除角色信息
    deleteUser(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http
            .delete("roles/" + id)
            .then((res) => {
              console.log(res);
              this.getRolesList();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //删除用户权限
    deleteUser(role, id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http
            .delete("roles/" + role.id + "/rights/" + id)
            .then((res) => {
              console.log(res);
              role.children = res.data.data;
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //获取所有权限列表
    getRightList(role) {
      this.getRightKeys(role, this.righKeys);
      this.id=role.id
      this.dialogVisible2 = true;
      this.$http
        .get("rights/tree")
        .then((res) => {
          this.rightList = res.data.data;
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //通过递归函数取出所有三级权限id保存到数组
    getRightKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach((item) => {
        this.getRightKeys(item, arr);
      });
    },
    //  关闭对话框清空数组中已经保存的三级权限id
    setRightKeys() {
      this.righKeys = [];
    },
    //提交更改角色权限请求
    putRightList() {
      const keys=[
        ...this.$refs.rightRef.getCheckedKeys(),
        ...this.$refs.rightRef.getHalfCheckedKeys(),
      ]
      const idStr=keys.join(',')
      this.$http
        .post("roles/"+this.id+"/rights", {rids:idStr})
        .then((res) => {
          this.dialogVisible2=false
            this.getRolesList();
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>
<style lang="less" scoped>
.el-tag {
  margin: 7px;
}
.borderTop {
  border-top: 1px solid #eee;
}
.borderBottom {
  border-bottom: 1px solid #eee;
}
.rowDs {
  display: flex;
  align-items: center;
}
</style>
