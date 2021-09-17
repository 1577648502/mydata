<template>
  <div id="data-view">
    <dv-full-screen-container>
      <div class="main-header">
        <!-- <el-header>
          <div>
            <img src="../../assets/img/log1.png" style="width: 5%" />
            <span style="margin: 0 20px">广西水利电力职业技术学院</span>
          </div>
          <div>
            <span style="margin: 0 20px">广西森格科技股份有限公司</span>
            <img src="../../assets/img/log.png" alt="" />
            <el-button type="info" @click="loginout" style="margin: 0 20px"
              >退出</el-button
            >
          </div>
        </el-header> -->
        <div class="mh-left">
          <img
            src="../../assets/img/log1.png"
            style="width: 60px; height: 60px"
          />
          <div style="line-height: 60px">广西水利电力职业技术学院</div>
        </div>
        <!-- <div class="mh-left">
           
        </div> -->
        <div class="mh-middle">保障电力人员生命安全的智能预警系统</div>
        <!-- <div class="mh-right">
          <dv-border-box-2
            style="
              width: 120px;
              height: 50px;
              line-height: 50px;
              text-align: center;
              margin-left: 200px;
            "
          >
            <router-link to="/login"> 综合管理台 </router-link>
          </dv-border-box-2>
        </div> -->
        <div class="mh-right">
          <div>广西森格科技股份有限公司</div>
          <img
            src="../../assets/img/log.png"
            alt=""
            width="60px"
            style="margin: 0 20px 0 0"
          />

          <div style="heith: 10px"></div>
          {{ time }}
        </div>
      </div>

      <dv-border-box-1 class="main-container">
        <dv-border-box-3 class="left-chart-container">
          <Left-Chart-1 />
          <Left-Chart-2 />
          <Left-Chart-3 />
        </dv-border-box-3>

        <div class="right-main-container">
          <div class="rmc-top-container">
            <dv-border-box-3>
              <Center-Cmp />
            </dv-border-box-3>

            <div class="rmctc-right-container">
              <dv-border-box-3 class="rmctc-chart-1">
                <Right-Chart-1 />
              </dv-border-box-3>

              <dv-border-box-3 class="rmctc-chart-1">
                <Right-Chart-2 />
              </dv-border-box-3>
            </div>
          </div>

          <dv-border-box-4 class="rmc-bottom-container">
            <Bottom-Charts />
          </dv-border-box-4>
        </div>
      </dv-border-box-1>
    </dv-full-screen-container>
  </div>
</template>
  <script src="<%= BASE_URL %>js/liveplayer-lib.min.js"></script>
 
<script>
import LeftChart1 from "./LeftChart1";
import LeftChart2 from "./LeftChart2";
import LeftChart3 from "./LeftChart3";
import RightChart1 from "./RightChart1.vue";
import RightChart2 from "./RightChart2.vue";
import CenterCmp from "./CenterCmp";

import BottomCharts from "./BottomCharts";

export default {
  name: "DataView",
  components: {
    LeftChart1,
    LeftChart2,
    LeftChart3,
    CenterCmp,
    BottomCharts,
    RightChart1,
    RightChart2,
  },
  data() {
    return {
      visible: false,
      time: "",
    };
  },
  created() {
    this.getTime();
  },
  methods: {

    toHome() {
      this.$router.push({ path: "/login" });
    },
    getTime() {
      setInterval(this.formatDate, 500);
    },
    formatDate() {
      let date = new Date();

      let year = date.getFullYear(); // 年

      let month = date.getMonth() + 1; // 月

      let day = date.getDate(); // 日

      let week = date.getDay(); // 星期

      let weekArr = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];

      let hour = date.getHours(); // 时

      hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零

      let minute = date.getMinutes(); // 分

      minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零

      let second = date.getSeconds(); // 秒

      second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零

      this.time = `${year}年${month}月${day}日 ${hour}:${minute}:${second} ${weekArr[week]}`;
    },
  },
};
</script>

<style lang="less">
#data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;

  #dv-full-screen-container {
    background-image: url("./img/bg.png");
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .main-header {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .mh-left {
      margin-bottom: 10px;
      display: flex;
      // justify-content: center;
      // align-items: center;
      padding-left: 40px;
      font-size: 20px;
      color: rgb(1, 134, 187);

      a:visited {
        color: rgb(1, 134, 187);
      }
    }
    .mh-right {
      display: flex;
      // justify-content: center;
      // align-items: center;
      font-size: 20px;
      color: rgb(1, 134, 187);

      a:visited {
        color: rgb(1, 134, 187);
      }
    }

    .mh-middle {
      margin-bottom: 10px;
      font-size: 30px;
    }

    .mh-left,
    .mh-right {
      vertical-align: middle;
      height: 50px;
      width: 450px;
    }
  }

  .main-container {
    height: calc(~"100% - 80px");

    .border-box-content {
      padding: 20px;
      box-sizing: border-box;
      display: flex;
    }
  }

  .left-chart-container {
    width: 22%;
    padding: 10px;
    box-sizing: border-box;

    .border-box-content {
      flex-direction: column;
    }
  }

  .right-main-container {
    width: 78%;
    padding-left: 5px;
    box-sizing: border-box;
  }

  .rmc-top-container {
    width: 100%;
    height: 65%;
    display: flex;
  }

  .rmctc-left-container {
    width: 100%;
  }

  .rmctc-right-container {
    width: 35%;
  }

  .rmc-bottom-container {
    height: 35%;
  }

  .rmctc-chart-1,
  .rmctc-chart-2 {
    position: relative;
    height: 50%;
  }
  #map_box {
    width: 100%;
    height: 100%;
  }
}
</style>
