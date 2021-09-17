<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>功能区域</el-breadcrumb-item>
      <el-breadcrumb-item>报警记录</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table
        :data="alarmRecordData"
        style="width: 100%; margin-bottom: 20px"
        row-key=""
        border
      >
        <el-table-column prop="s_id" label="id" sortable> </el-table-column>
        <el-table-column prop="user_name" label="用户名"> </el-table-column>
        <el-table-column prop="device_id" label="设备id"> </el-table-column>
        <el-table-column prop="location" label="位置"> </el-table-column>
        <el-table-column prop="x_point" label="坐标X"> </el-table-column>
        <el-table-column prop="y_point" label="坐标Y"> </el-table-column>
        <el-table-column prop="c_time" label="时间"> </el-table-column>
        <el-table-column prop="sos_type" label="类型"> </el-table-column>
        <el-table-column prop="status" label="状态"> </el-table-column>
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
      alarmRecordData: [],
    };
  },
  created() {
    this.getalarmRecord();
  },
  methods: {
    getalarmRecord() {
      this.$http
        .post("/apiindex.php?ctl=task&act=get_sos_list", {
          admin_id: window.sessionStorage.admin_id,
          p: 1,
        })
        .then((res) => {
          console.log(res);
          this.alarmRecordData = res.data.data;
          this.alarmRecordData.forEach((element) => {
            element.c_time = new Date(
              parseInt(element.c_time)
            ).toLocaleString();
            if (element.sos_type == 0) {
              element.sos_type = "主动报警";
            }
            if (element.sos_type == 1) {
              element.sos_type = "穿戴报警";
            }
            if (element.sos_type == 2) {
              element.sos_type = "出围栏报警";
            }
            if (element.sos_type == 3) {
              element.sos_type = "温度报警";
            }
            if (element.sos_type == 4) {
              element.sos_type = "跌落报警";
            }
            if (element.sos_type == 5) {
              element.sos_type = "进入围栏报警";
            }
            if (element.sos_type == 6) {
              element.sos_type = "静默报警";
            }
            if(element.status==0){
              element.status='未处理'
            }if(element.status==1){
              element.status='已处理'
            }
          });
        });
    },
  },
};
</script>
<style lang="less" scoped>
</style>
