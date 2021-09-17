<template>
  <div class="bottom-charts">
    <div class="bcci-header">
      报警信息
      <dv-scroll-board :config="config" style="ccmc-middle" />
    </div>
  </div>
</template>

<script>
import LabelTag from "./LabelTag";

export default {
  name: "BottomCharts",
  components: {
    LabelTag,
  },
  data() {
    return {
      alarmRecordData: [],
      config: {
        header: ["设备ID", "时间", "地点", "报警方式"],
        data: [],
        oddRowBGC: "#003B51",
        index: true,
        columnWidth: [80, 150, 200, 600, 150],
        align: ["center"],
      },
    };
  },
  created() {
    this.getalarmRecord();
    new Date(parseInt(1631611815) * 1000)
      .toLocaleString()
      .replace(/:\d{1,2}$/, " ");
  },
  methods: {
    getalarmRecord() {
      this.$http
        .post("/apiindex.php?ctl=task&act=get_sos_list", {
          admin_id: window.sessionStorage.admin_id,
          p: 1,
        })
        .then((res) => {
          this.config.data = [];
          console.log(res);
          let b = [];
          this.alarmRecordData = res.data.data;
          this.alarmRecordData.forEach((element) => {
            // tobdMap(element.x_point, element.y_point)
            element.c_time = new Date(
              parseInt(element.c_time * 1000)
            ).toLocaleString();

            if (element.sos_type == 0) {
              element.sos_type = "主动报警";
            } else if (element.sos_type == 1) {
              element.sos_type = "穿戴报警";
            } else if (element.sos_type == 2) {
              element.sos_type = "出围栏报警";
            } else if (element.sos_type == 3) {
              element.sos_type = "温度报警";
            } else if (element.sos_type == 4) {
              element.sos_type = "跌落报警";
            } else if (element.sos_type == 5) {
              element.sos_type = "进入围栏报警";
            } else if (element.sos_type == 6) {
              element.sos_type = "静默报警";
            } else {
              element.sos_type = "未知";
            }
            if (element.status == 0) {
              element.status = "未处理";
            }
            if (element.status == 1) {
              element.status = "已处理";
            }

            this.$http
              .get(
                "/Hm?key=a3ecbe84a959593c159e9faada502c8c&s=rsv3&language=zh_cn&location=" +
                  element.y_point +
                  "," +
                  element.x_point
              )
              .then((res) => {
                let a = [];
                a[0] = element.device_id;
                a[1] = element.c_time;
                a[2] = res.data.regeocode.formatted_address;
                a[3] = element.sos_type;
                b.push(a);
                //  console.log(a);
                this.config = {
              header: ["设备ID", "时间", "地点", "报警方式"],
              data: b,
              oddRowBGC: "#003B51",
              index: true,
              columnWidth: [80, 150, 200, 600, 150],
              align: ["center"],
            };
              });
            
            console.log(this.config);
          });
        });
    },
  },
};
</script>

<style lang="less">
.bottom-charts {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;

  .bcci-header {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
  }

  .dv-active-ring-chart {
    height: calc(~"100% - 80px");
  }

  .label-tag {
    height: 30px;
  }

  .active-ring-name {
    font-size: 18px !important;
  }

  .decoration-1,
  .decoration-2,
  .decoration-3 {
    display: absolute;
    left: 0%;
  }
}
</style>
