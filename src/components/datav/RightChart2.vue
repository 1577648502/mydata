<template>
  <el-table
    :data="tableData"
    style="width: 100% background-color: transparent;"
  >
    <el-table-column prop="date" label="设备" width="110"> </el-table-column>
    <el-table-column prop="name" label="在线" width="60">
      <template slot-scope="scope">
        <el-switch
          v-model="scope.row.live"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="警报" width="60">
      <template slot-scope="scope">
        <el-switch
          v-model="scope.row.value"
          active-color="#13ce66"
          inactive-color="#ff4949"
          >
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column prop="Altitude" label="高度" width="85"> </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "RightChart2",
  data() {
    return {

      tableData: [
        {
          date: "5号安全员",
          name: "王小虎",
          address: "上海",
          Altitude: "11.32米",
          value: true,
          live: true,
        },
        {
          date: "6号施工员",
          name: "王小虎",
          address: "上海",
          Altitude: "16.65米",
          value: true,
          live: false,
        },
      ],
    };
  },

  methods: {
    app(data) {
      console.log(data);
    },
  },
};
</script>

<style lang="less">
.el-table,
.el-table__expanded-cell,
.el-table tr,
.has-gutter tr th {
  background-color: transparent !important;
  border: 0;
  color: rgb(63, 134, 241);
  font-size: 18px;
}
.el-table tr:hover {
  background-color: transparent !important;
}
</style>
