<template>
  <!--地图容器-->
  <!-- <dv-border-box-1>dv-border-box-1</dv-border-box-1> -->

  <div id="map_box"></div>
</template>
<script>
import LivePlayer from "@liveqing/liveplayer";
export default {
  components: {
    LivePlayer,
  },
  name: "",
  data() {
    return {
      data: [
        // {
        //   location_info: {
        //     y_point: 110.589491,
        //     x_point: 22.321958,
        //   },
        //   user_info: {
        //     device_id: 15645489415,
        //     user_name: 2323232,
        //   },
        // },
        // {
        //   location_info: {
        //     y_point: 110.599491,
        //     x_point: 22.320958,
        //   },
        //   user_info: {
        //     device_id: 15645489415,
        //   },
        // },
      ],
      login:
        '{"act":"ma_login","user_name":' +
        '"' +
        window.sessionStorage.username +
        '"' +
        ',"access_token":' +
        '"' +
        window.sessionStorage.token +
        '"' +
        "}",
      name: 1212,
      map: null,
      infoBox: null,
    };
  },
  created() {
    this.initSocket();
    //动态添加的dom 调用vue事件
  },
  mounted() {
    this.a();
    this.showMap();
    let _this = this;
    window.imageClick = function () {
      _this.vueImageClick();
    };
  },
  methods: {
    /**
     * 地图展示
     */
    showMap() {
      this.map = new BMap.Map("map_box"); //对应地图容器id
      let centerPoint = new BMap.Point(
        "114.3313004858209",
        "22.679368007498603"
      );
      this.map.centerAndZoom(centerPoint, 14);
      this.map.enableScrollWheelZoom(true);
      this.map.enableDoubleClickZoom(true);
      /*
			//地图样式
			this.map.setMapStyle({
			  styleJson: []
			})*/
    },
    /**
     * 添加地图marker
     */
    markerPoint() {
      let _this = this;
      this.map.clearOverlays();
      let iconImage = new BMap.Icon(
        require("../assets/img/2.png"),
        new BMap.Size(48, 48)
      );
      for (let i = 0; i < this.data.length; i++) {
        console.log(this.data);
        let point = new BMap.Point(
          this.data[i].location_info.y_point,
          this.data[i].location_info.x_point
        );
        let marker = new BMap.Marker(point, { icon: iconImage }); // 创建标注
        marker.addEventListener("click", () => {
          //关闭其他标记点的弹框
          if (_this.infoBox != null) {
            _this.infoBox.close();
          }
          _this.markerPointClick(
            this.data[i].location_info.y_point,
            this.data[i].location_info.x_point,
            this.data[i]
          );
        });
        _this.map.addOverlay(marker);
      }
    },
    /**
     * 点击marker弹出信息框
     */
    markerPointClick(lat, lng, data) {
      // this.getLive(data.user_info.device_id);

      let _this = this;

      let html =
        '<div class= "infoBoxContent">' +
        "<div>" +
        "<p>用户名：" +
        data.user_info.user_name +
        "</p>" +
        "<p>手机号：" +
        data.user_info.mobile +
        "</p>" +
        "<p>所在位置：" +
        this.name +
        "</p>" +
        "<p>坐标：" +
        this.name +
        "</p>" +
        "<p>设备id：" +
        data.user_info.device_id +
        "</p>" +
        "</div>" +
        '<img src="' +
        data.user_info.user_img +
        '" style="width: 40%">' +
        "</div>" +
        "<button onclick='"+this.getLive(
        data.user_info.device_id 
        )+"'>直播</button>";

      let opts = {
        boxStyle: {
          width: "435px",
          height: "233px",

          // margin: '30px 0',
        },
        title: "安全帽信息",
        closeIconMargin: "20px 5px 0 0",
        closeIconUrl: require("../assets/img/1.png"),
        enableAutoPan: true,
        align: INFOBOX_AT_TOP,
      };
        this.infoBox = new BMapLib.InfoBox(this.map, html, opts);
        let point = new BMap.Point(lat, lng);
        let marker = new BMap.Marker(point);
        this.infoBox.open(marker);

      /*this.infoBox._getCloseIcon = function() {
			return ''
			}*/

      // this.webSocket.send('{"act":"ma_open_rtsp","device_id":'+data.user_info.device_id+'}');
    },
    vueImageClick() {
      console.log("弹框中按钮的点击事件");
    },
    getLive(data) {
      this.webSocket.send('{"act":"ma_open_rtsp","device_id":' + data + "}");
      // this.webSocket.send('{"act":"ma_stop_rtsp","device_id":' + data + "}");
    },
    //获取经纬度
    // 建立连接
    initSocket() {
      // 有参数的情况下：
      // let url = `ws://${this.url}/${this.types}`
      // 没有参数的情况:接口
      //   let url = "wss://caps.runde.pro/wss";
      let url = "wss://caps.runde.pro/wss";
      this.webSocket = new WebSocket(url);
      this.webSocket.onopen = this.webSocketOnOpen;
      this.webSocket.onclose = this.webSocketOnClose;
      this.webSocket.onmessage = this.webSocketOnMessage;
      this.webSocket.onerror = this.webSocketOnError;
    },
    // 建立连接成功后的状态
    webSocketOnOpen() {
      this.webSocket.send(this.login);
    },

    a() {
      setInterval(this.b, 20000);
    },
    b() {
      this.webSocket.send('{"act":"ma_get_active_devices"}');
    },

    // 获取到后台消息的事件，操作数据的代码在onmessage中书写
    webSocketOnMessage(res) {
      var a = JSON.parse(res.data);
      if (a.cmd == "ma_open_rtsp") {
        //  this.markerPoint();
        // return;
      }
      if (a.cmd == "ma_login") {
        window.sessionStorage.setItem("admin_id", a.admin_info.admin_id);
        this.webSocket.send('{"act":"ma_get_active_devices"}');
      }

      if ((a.cmd = "ma_get_active_devices")) {
        var b = JSON.parse(res.data);
        this.data = b.data;
        console.log(b);
        this.markerPoint();
        // this.webSocket.send('{"act":"ma_open_rtsp","device_id":'+data+'}');
      } else {
        console.log(a);
      }
      //  setTimeout(this.webSocket.send('{"act":"ma_get_active_devices"}'),3000)
      // res就是后台实时传过来的数据
      //给后台发送数据
      //   setTimeout(this.webSocket.send('{"act":"ma_get_active_devices"}'),10000)
    },
    // 关闭连接
    webSocketOnClose() {
      this.webSocket.close();
      console.log("websocket连接已关闭");
    },
    //连接失败的事件
    webSocketOnError(res) {
      console.log("websocket连接失败");
      // 打印失败的数据
      console.log(res);
    },
  },
};
</script>
<style scoped>
#map_box {
  width: 100%;
  height: 100%;
}
</style>
