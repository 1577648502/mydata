<template>
  <div>
    <div class="a" v-if="this.$store.state.url == ''">
      <img src="../../assets/img/3.png" alt="" />
    </div>

    <!-- <div id="player-container-id">fdsfsf</div> -->

    <LivePlayer
      :videoUrl="this.$store.state.url"
      fluent
      autoplay
      live
      stretch
      aspect="fullscreen"
      style="width: 80%"
      v-else
    ></LivePlayer>
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
    setInterval(this.iff(), 1);
  },
  data() {
    return {
      a: false,
      url: this.$store.state.url,
      rtmp: "https://mg.runde.pro/live/36147_28290",
    };
  },
  methods: {
    // 初始化 视频播放器
    iff() {
      if (this.$store.state.url == "") {
        console.log("空");
      } else {
        this.playVideo();
      }
    },
    // init() {
    //   var player = new TcPlayer("id_test_video", {
    //     m3u8: this.$store.state.url, //请替换成实际可用的播放地址
    //     autoplay: false, //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
    //     // poster: { style: "cover", src: poster },
    //     width: "100%", //视频的显示宽度，请尽量使用视频分辨率宽度
    //     height: "100%", //视频的显示高度，请尽量使用视频分辨率高度
    //     autoplay: true, //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
    //     live: true, //必选，设置视频是否为直播类型，将决定是否渲染时间轴等控件，以及区分点直播的处理逻辑 示例: true
    //     videoFullscreen: "auto",
    //     fullscreen: true,
    //     // controls:'system', // default 显示默认控件，none 不显示控件，system 移动端显示系统控件 备注：如果需要在移动端使用系统全屏，就需要设置为system。默认全屏方案是使用 Fullscreen API + 伪全屏的方式例子
    //     pausePosterEnabled: true,
    //     volume: 0.5,
    //     systemFullscreen: true,
    //     x5_orientation: 0,
    //   });
    //   document.getElementsByClassName("vcp-error-tips")[0].style.fontSize =
    //     "14px"; // 错误码提示语字体大小，因引入了rem，默认字体大小为100px.
    // },

    playVideo() {
      this.player = new TcPlayer("player-container-id", {
        m3u8: this.$store.state.url, //请替换成实际可用的播放地址
        autoplay: true, //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
        // "coverpic": img,
        remember: 1,
        width: "100%", //视频的显示宽度，请尽量使用视频分辨率宽度
        height: "100%", //视频的显示高度，请尽量使用视频分辨率高度
        autoplay: true, //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
        live: true, //必选，设置视频是否为直播类型，将决定是否渲染时间轴等控件，以及区分点直播的处理逻辑 示例: true
        videoFullscreen: "auto",
        fullscreen: true,
      });
    },
  },
};
</script>

<style lang="less">
#palyback {
  width: 100%;
  #player-container-id {
    width: 95%;
    height: 95%;
  }
}

.a {
  width: 135%;
  height: 100%;
  img {
    width: 95%;
    height: 95%;
  }
}

.right-chart-1 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .rc1-header {
    font-size: 24px;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
  }

  .rc1-chart-container {
    flex: 1;
    display: flex;
  }

  .left {
    width: 30%;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .number {
      font-size: 34px;
      color: #096dd9;
      font-weight: bold;
      margin-bottom: 30px;
    }
  }

  .right {
    flex: 1;
    padding-bottom: 20px;
    padding-right: 20px;
    box-sizing: border-box;
  }
}
</style>
