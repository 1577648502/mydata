<template>
      <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>功能区域</el-breadcrumb-item>
      <el-breadcrumb-item>照片管理</el-breadcrumb-item>
    </el-breadcrumb>
     <el-card>
         <el-table
        :data="photoManagementData"
        style="width: 100%; margin-bottom: 20px"
        row-key=""
        border
      >
        <el-table-column prop="g_id" label="id" sortable> </el-table-column>
        <el-table-column prop="admin_name" label="名称"> </el-table-column>
        <el-table-column prop="g_name" label="组名称"> </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope" width="170px">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
         
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
     data() {
    return {
     photoManagementData: [],
    };
  },
  created() {
    this.getPhotoManagement();
  },
  methods: {
    getPhotoManagement() {
      this.$http
        .post("/apiindex.php?ctl=report&act=get_user_image", {
          user_id: window.sessionStorage.admin_id,
        })
        .then((res) => {
          console.log(res);
          this.photoManagementData = res.data.data;
        });
    },
  },
}
</script>
<style lang="less" scoped>

</style>