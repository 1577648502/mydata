<template>
     <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设置管理</el-breadcrumb-item>
      <el-breadcrumb-item>任务设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
         <el-table
        :data="taskData"
        style="width: 100%; margin-bottom: 20px"
        row-key=""
        border
      >
        <el-table-column prop="task_id" label="id" sortable> </el-table-column>
        <el-table-column prop="task_name" label="名称"> </el-table-column>
        <el-table-column prop="c_user_name" label="创建人"> </el-table-column>
        <el-table-column prop="c_time" label="开始时间"> </el-table-column>
        <el-table-column prop="b_time" label="结束时间"> </el-table-column>
        <el-table-column prop="location" label="位置"> </el-table-column>
        <el-table-column prop="x_point" label="坐标X"> </el-table-column>
        <el-table-column prop="y_point" label="坐标Y"> </el-table-column>
        <el-table-column prop="main_user_name" label="执行人姓名"> </el-table-column>
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
      taskData: [],
      
    };
  },
  created() {
    this.getTask();
  },
  methods: {
    getTask() {
      this.$http
        .post("/apiindex.php?ctl=task&act=get_task_list", {
          admin_id: window.sessionStorage.admin_id,
          p:1
        })
        .then((res) => {
          console.log(res);
          this.taskData = res.data.data;
           this.taskData.forEach(element => {
             var a = new Date(parseInt(element.c_time) )
             console.log(a.toLocaleString());
            //  console.log((new Date()))
             element.c_time=(new Date(parseInt(element.c_time))).toLocaleString()
             element.b_time=(new Date(parseInt(element.b_time))).toLocaleString()
          });
        });
    },
  },
}
</script>
<style lang="less" scoped>

</style>