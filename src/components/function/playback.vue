<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>功能区域</el-breadcrumb-item>
      <el-breadcrumb-item>视频回放</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :inline="true" :model="playback" class="demo-form-inline">
        <el-form-item label="选择用户信息">
          <el-select v-model="playback.uid" placeholder="用户id">
            <el-option label="28290" value="28290"></el-option>
            <!-- <el-option label="28808" value="28808"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="年">
          <el-select v-model="playback.year" placeholder="年">
            <el-option label="2021" value="2021"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="月" v-if="playback.uid == 28290">
          <el-select v-model="playback.month" placeholder="月">
            <el-option label="8" value="8"></el-option>
            <el-option label="9" value="9"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="月">
          <el-select v-model="playback.month" placeholder="月">
            <el-option label="9" value="9"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item
          label="日"
          v-if="playback.uid == 28290 && playback.month == 8"
        >
          <el-select v-model="playback.day" placeholder="日">
            <el-option label="28" value="28"></el-option>
            <el-option label="30" value="30"></el-option>
            <el-option label="31" value="31"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="日"
          v-else-if="playback.uid == 28290 && playback.month == 9"
        >
          <el-select v-model="playback.day" placeholder="日">
            <el-option label="02" value="02"></el-option>
            <el-option label="04" value="04"></el-option>
            <el-option label="06" value="06"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="日">
          <el-select v-model="playback.day" placeholder="日">
            <el-option label="06" value="06"></el-option>
            <el-option label="07" value="07"></el-option>
            <el-option label="08" value="08"></el-option>
            <el-option label="09" value="09"></el-option>
            <el-option label="10" value="10"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <LivePlayer :videoUrl="url" fluent autoplay  stretch v-if="url" playback-rates controls ></LivePlayer>
      <el-table
        :data="playbackData"
        style="width: 100%; margin-bottom: 20px"
        row-key=""
        border
      >
        <el-table-column prop="id" label="id" sortable> </el-table-column>
        <el-table-column prop="ctime" label="时间"> </el-table-column>
        <el-table-column prop="url" label="url"> </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope" width="170px">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              title="播放"
              @click="play(scope.row)"
              >播放</el-button
            >
          </template>
        </el-table-column>
      </el-table>

    </el-card>
  </div>
</template>
<script>
import LivePlayer from '@liveqing/liveplayer'
export default {
    components: {
    LivePlayer
  },
  data() {
    return {
      url: "",
      playback: {
        admin_id: window.sessionStorage.admin_id,
        uid: null,
        year: null,
        month: null,
        day: null,
      },
      playbackData: [],
    };


  },
  created() {
    this.getPlayback();
  },
  methods: {
    getPlayback() {
      this.$http
        .post("/apiindex.php?ctl=video&act=get_path_list", {
          admin_id: window.sessionStorage.admin_id,
        })
        .then((res) => {
          console.log(this.playbackData);
        });
    },
    onSubmit() {
      this.$http
        .post("/apiindex.php?ctl=video&act=get_video_list_v1", this.playback)
        .then((res) => {
          this.playbackData = res.data.data;
          console.log(res);
        });
    },
    play(row) {
      console.log(row);
      this.url = row.url;
    },
  },
};
</script>
<style lang="less" scoped>
</style>
