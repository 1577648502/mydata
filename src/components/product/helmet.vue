<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>产品管理</el-breadcrumb-item>
      <el-breadcrumb-item>安全帽</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <LivePlayer
      :videoUrl="url"
      fluent
      autoplay
      stretch
      playback-rates
      controls
    ></LivePlayer> -->
    <div id="palyback">
    <div :class="{'else': onswitch}">
      <div id="player-container-id"></div>
    </div>
  </div>
    <el-card> </el-card>
  </div>
</template>
 <script src="https://web.sdk.qcloud.com/player/tcplayerlite/release/v2.4.1/TcPlayer-2.4.1.js" charset="utf-8"></script>
<script>
import LivePlayer from "@liveqing/liveplayer";
export default {
  components: {
    LivePlayer,
  },
  mounted() {
     this.playVideo()
  },
  data() {
    return {
      
      //       rtmp://47.106.114.236:11006/live/36147_28290"
      // 1: "https://mg.runde.pro/live/36147_28290.m3u8"
      // 2: "https://mg.runde.pro/live/36147_28290.flv"
      // 3: "webrtc://caps.runde.pro/live/36147_28290"
      url: "webrtc://47.112.144.197/live/36147_28290",
      rtmp:" rtmp://47.106.114.236:11006/live/36147_28290"
    };
  },
  methods: {
    playVideo() {
        document.getElementById('player-container-id').innerHTML = ""
        this.player = new TcPlayer('player-container-id', {
          "m3u8": 'https://mg.runde.pro/slive/36147_29251.m3u8', //请替换成实际可用的播放地址
          "autoplay": true, //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
          // "coverpic": img,
          "width": '100%', //视频的显示宽度，请尽量使用视频分辨率宽度
          "height": '100%', //视频的显示高度，请尽量使用视频分辨率高度
          "remember": 1
        });
      },
  },
};
</script>
<style lang="less" scoped>
</style>