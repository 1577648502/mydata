<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- card卡片 -->
    <el-card class="box-card">
      <template>
        <el-table :data="rightsList" style="width: 100%" border stripe>
             <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="authName" label="权限名称">
          </el-table-column>
          <el-table-column prop="path" label="路径">
            
          </el-table-column>
          <el-table-column prop="level" label="权限等级">
              <template scope="scope">
                <el-tag v-if="scope.row.level==1">一级</el-tag>
                <el-tag type="success" v-else-if="scope.row.level==2">二级</el-tag>
                <el-tag type="warning" v-else>三级</el-tag>
              </template>
              
        </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
        rightsList:[]
    };
  },
  created(){
      this.getRights()
  },
  methods:{
      getRights(){
          this.$http.get("rights/list")
          .then(res => {
              this.rightsList=res.data.data
              console.log(res)
          })
          .catch(err => {
              console.error(err); 
          })
      }
  }
};
</script>
<style lang="less" scoped></style>
