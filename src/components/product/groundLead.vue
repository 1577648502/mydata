<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>产品管理</el-breadcrumb-item>
      <el-breadcrumb-item>接地线</el-breadcrumb-item>
    </el-breadcrumb>
     <el-card>
         <el-table
        :data="groundLeadData.filter(data => !search || data.id.toLowerCase().includes(search.toLowerCase()) ||data.recipient.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%; margin-bottom: 20px"
        row-key=""
        border
      >
        <el-table-column prop="id" label="接地线编号" sortable> </el-table-column>
        <el-table-column prop="recipient" label="领用人"> </el-table-column>
        <el-table-column prop="date" label="时间"> </el-table-column>
        <el-table-column prop="incident" label="事件"> </el-table-column>
        <el-table-column label="操作" width="180px">
             <template slot="header" slot-scope="scope" width="170px">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入编号或名字搜索"
            />
          </template>
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
   data(){
      return{
         search:'',
        groundLeadData:[
        {
          id: "20190901001",
          recipient: "张三",
          date: "2021年9月1日14:00",
          incident: "领用出库",
        },
        {
          id: "20190901002",
          recipient: "李四",
          date: "2021年9月2日10:00",
          incident: "领用出库",
        },
        {
          id: "20190901003",
          recipient: "王五",
          date: "2021年9月3日17:00",
          incident: "正确安放",
        },
       
        {
          id: "20190901004",
          recipient: "赵柳",
          date: "2021年9月4日13:00",
          incident: "收回",
        },
        ]
      }
    }
};
</script>
<style lang="less" scoped>
</style>