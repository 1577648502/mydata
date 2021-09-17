<template>
  <div class="left-chart-3">
    <div class="bcci-header">流量统计</div>
    <dv-charts :option="option" />
  </div>
</template>

<script>
import LabelTag from "./LabelTag";
export default {
  components: {
    LabelTag,
  },

  name: "LeftChart3",
  data() {
    return {
      option: {
        title: {
          text: "流量使用情况",
          style: {
            fill: "#fff",
          },
        },
        series: [
          {
            type: "gauge",
            data: [{ name: "itemA", value: 55 }],
            center: ["50%", "55%"],
            axisLabel: {
              formatter: "{value}%",
              style: {
                fill: "#fff",
              },
            },
            axisTick: {
              style: {
                stroke: "#fff",
              },
            },
            animationCurve: "easeInOutBack",
          },
        ],
      },
    };
  },
}
</script>

<style lang="less">
.left-chart-3 {
  width: 100%;
  height: 33%;
  display: flex;
  flex-direction: column;

  .lc3-header {
    height: 20px;
    line-height: 20px;
    font-size: 22px;
    text-indent: 20px;
    margin-top: 10px;
  }

  .lc3-details {
    height: 40px;
    font-size: 16px;
    display: flex;
    align-items: center;
    text-indent: 20px;

    span {
      color: #096dd9;
      font-weight: bold;
      font-size: 35px;
      margin-left: 20px;
    }
  }

  .lc3-chart {
    flex: 1;
  }
  .ccmc-middle {
    width: 80%;
    height: 90%;

    .active-ring-name {
      font-size: 20px !important;
    }
  }
}
</style>
