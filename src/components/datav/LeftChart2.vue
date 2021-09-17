<template>
  <div class="left-chart-2">
    <div class="lc2-header">近一周报警情况</div>
   <dv-active-ring-chart class="ccmc-middle" :config="config" />
  </div>
</template>

<script>
import LabelTag from './LabelTag'
export default {
   components: {
    LabelTag
  },
  name: 'LeftChart2',
  data () {
    return {
       config: {
        data: [
          {
            name: 'sos报警',
            value: 415
          },
          {
            name: '静默报警',
            value: 2200
          },
          {
            name: '围栏报警',
            value: 90
          },
          {
            name: '近电报警',
            value: 317
          }
        ],
        color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
        lineWidth: 40,
        radius: '70%',
        activeRadius: '80%'
      },
    }
  }
}
</script>

<style lang="less">
.left-chart-2 {
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;

  .lc2-header {
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    text-indent: 20px;
    margin-top: 10px;
  }

  .lc2-details {
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
   .ccmc-middle {
      width: 80%;
      height: 90%;

      .active-ring-name {
        font-size: 20px !important;
      }
    }

  .lc2-chart {
    height: calc(~"100% - 80px");
  }
}
</style>
