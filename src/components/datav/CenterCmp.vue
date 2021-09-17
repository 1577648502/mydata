<template>
  <!--地图容器-->
  <!-- <dv-border-box-1>dv-border-box-1</dv-border-box-1> -->

  <div id="map_box">
        
    
  </div>
  
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
      formData: {
        user_name: "CS759Y",
        pwd: "123456",
      },
      data: [],
      login1:
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
    this.login();
    this.a();
    this.showMap();
    let _this = this;
    window.imageClick = function () {
      _this.vueImageClick();
    };
  },
  methods: {
        open4(data) {
          if(data==1){
            data='脱帽报警'
          }else if(data==2){
             data='围栏报警'
          }else if(data==3){
             data='温度报警'
          }else if(data==4){
             data='跌落（撞击）报警'
          }else if(data==5){
             data='围栏报警2 进入禁区'
          }else if(data==6){
             data='静默报警'
          }else if(data==7){
             data='SOS报警'
          }else if(data==11){
             data='近电报警'
          }else if(data==12){
             data='登高报警'
          }
      this.$notify.error({
        title: data,
        message: "",
        position: "top-left",
      });
    },
    tobdMap(x, y) {
      var x_pi = (3.14159265358979324 * 3000.0) / 180.0;
      var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
      var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
      var bd_lon = z * Math.cos(theta) + 0.0065;
      var bd_lat = z * Math.sin(theta) + 0.006;
      var pt = new BMap.Point(bd_lon, bd_lat);
      return pt;
    },
    login() {
      this.$http
        .post("/api?ctl=tool&act=get_pkey", this.formData)
        .then((res) => {
          console.log(res.data);
          if (res.data.status) {
            this.$http
              .post("/api?ctl=tool&act=get_token", {
                user_name: this.formData.user_name,
                pkey: res.data.data,
              })
              .then((r) => {
                console.log(r);

                this.$message.success("登录成功");
                console.log(r);
                window.sessionStorage.setItem("token", r.data.token);
                window.sessionStorage.setItem(
                  "username",
                  this.formData.user_name
                );
                // this.$router.push("/home");
              });
          } else {
            this.$message.error("登录失败");
          }
        });
    },
    /**
     * 地图展示
     */
    showMap() {
      this.map = new BMap.Map("map_box"); //对应地图容器id
      let centerPoint = new BMap.Point(
        "108.28510081204048",
        "22.877330138964606"
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
        require("../../assets/img/2.png"),
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

          _this.markerPointClick(this.data[i]);
        });
        marker.addEventListener("onmouseover", () => {
          //关闭其他标记点的弹框
          if (_this.infoBox != null) {
            _this.infoBox.close();
          }
          _this.onmouseover(
            this.data[i].location_info.y_point,
            this.data[i].location_info.x_point,
            this.data[i]
          );
        });
        marker.addEventListener("onmouseout", () => {
          //关闭其他标记点的弹框
          if (_this.infoBox != null) {
            _this.infoBox.close();
          }
        });

        _this.map.addOverlay(marker);
      }
    },
    /**
     * 点击marker弹出信息框
     */
    markerPointClick(data) {
      // console.log(this.$store.state.url);
      if (this.$store.state.url == "") {
        console.log(1);
        this.getLive(data.user_info.device_id);
      } else {
        this.getStop(data.user_info.device_id);
      }

      // this.getLive(data.user_info.user_id);
    },
    onmouseover(lat, lng, data) {
      let _this = this;

      let html =
        '<div class= "infoBoxContent">' +
        "<div>" +
        "<p>用户名：5号安全员" +
        "</p>" +
        "<p>手机号：18502585485" +
        "</p>" +
        "<p>坐标X：" +
        data.location_info.x_point +
        "</p>" +
        "<p>坐标Y：" +
        data.location_info.y_point +
        "</p>" +
        "<p>设备id：" +
        data.user_info.device_id +
        "</p>" +
        "</div>" +
        '<img src="' +
        data.user_info.user_img +
        '" style="width: 40%">' +
        "</div>";
      // "<button onclick='" +
      // this.getLive(data.user_info.device_id) +
      // "'>直播</button>";

      let opts = {
        boxStyle: {
          width: "435px",
          height: "233px",

          // margin: '30px 0',
        },
        title: "安全帽信息",
        closeIconMargin: "20px 5px 0 0",
        closeIconUrl: require("../../assets/img/1.png"),
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
      // this.webSocket.send('{"cmd":"server_push_sos"}');
      // this.webSocket.send('{"act":"server_push_sos"}');
      // this.webSocket.send('{"act":"ma_stop_rtsp","device_id":' + data + "}");
    },
    getStop(data) {
      this.webSocket.send('{"act":"ma_stop_rtsp","device_id":' + data + "}");
      this.$store.state.url = "";
      // this.webSocket.send('{"cmd":"server_push_sos"}');
      // this.webSocket.send('{"act":"server_push_sos"}');
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
      this.webSocket.send(this.login1);
    },

    a() {
      setInterval(this.b, 3000);
    },
    b() {
      this.webSocket.send('{"act":"ma_get_active_devices"}');
      // this.webSocket.send('{"cmd":"ma_get_active_devices","status":true,"msg":"获取成功","data":[{"user_info":{"user_id":"29251","device_id":"866652020828043","ca_ver":"rd_aqm3710-n0.66-L5.0Ah-vca5m-PV3-rdpv3-user-svn4019-v1.4.8-20210624_1141","mobile":"18535485658","sim":"898602b9192080029052","c_time":"1631254884","app_last_login_time":"0","ca_last_login_time":"1631782838","user_name":"5号测试仪","real_name":"828043","user_img":"https:\/\/mg.runde.pro\/public\/images\/default.jpeg","department":"111","role":"111","f_id":"0","cap_type":"2","b1":"","b2":"","sos_height":"10000.00","tk":"2","nearvolt":"2","health":"2","pressure":"2","account_id":"607","w_id":null,"acc_list":"607,3162","c_user_id":"3162","gas_volt":"0","new_low":"0","uwb_device_id":"","rtmp_open":"0","voice_pkg":null,"fb_id":null,"min_o2":"19.5","max_o2":"23.5","watch":"","local_record":"0","last_count_online_time":"1631782838","watch_mac":"","co":"10.0","app_version":"RD28","min_temp":null,"max_temp":null,"max_heartbeat":null,"min_heartbeat":null,"shrink":null,"diastolic":null,"video_pre":null,"push_sos_url":null,"electrostatic":null,"headset":"","upload_video_num":"7","notuploaded_video_count":"104","privacy_switch":"0","g_id":"5868","boot_broadcast":"0","sip_id":12925100},"location_info":{"CD4":"","Relative_altitude":"49.01","act":"ca_report_location","bat_l":"24","bat_v":"3857","body_info":"","body_simple_info":"","bt_signal_info":"","c_accuracy":"7.6","c_speed":"0.0","c_startcount":"5","c_trust":"1","charging":"0","gas_data":"","gps":"1","gps_level":"1","in_use":"2","is_weared":"1","net_strenth":"4","net_type":"2","notuploaded_video_count":"104","online_type":"-1","oxygen_data":"","phoneNumber":"898602b9192080029052","rail_status":"0","record_switch":"true","sim_data_num":"464","sim_status":"2","tcard_status":"2","tempdata":"mtktsbattery--25000;mtktscpu--65500;mtktspa---127000;mtktspmic--59324;mtktswmt--54000;mtktsAP--53800;mtktsbtsmdpa--51000;mtkts1--65400;mtkts2--65500;","user_id":"29251","x_point":"22.877169710963827","y_point":"108.28477046247215","ctime":1631783862,"Altitude":0}}],"msg_code":"GetSucc"}');
      // this.webSocket.send(
      //   '{"cmd":"server_push_ca_sip_sos","type":"0","room_id":"1631757210","ca_info":{"sos_type"},"x_point":"22.65154","y_point":"114.121426","time":1631760365}'
      // );
    },

    // 获取到后台消息的事件，操作数据的代码在onmessage中书写
    webSocketOnMessage(res) {
      var a = JSON.parse(res.data);
      console.log(a);
      if (a.cmd == "ma_open_rtsp") {
        //  this.markerPoint();
        // return;
        this.$store.state.url = a.play_url[2];
        console.log(this.$store.state.url);
      }
      if (a.cmd == "ma_login") {
        window.sessionStorage.setItem("admin_id", a.admin_info.admin_id);
        this.webSocket.send('{"act":"ma_get_active_devices"}');
      }

      if ((a.cmd == "ma_get_active_devices")) {

        var b = JSON.parse(res.data);
        this.$store.state.sum=b.data.length
        b.data.forEach((element) => {
          var a = this.tobdMap(
            element.location_info.x_point,
            element.location_info.y_point
          );
          // console.log(a);
          element.location_info.x_point = a.lng;
          element.location_info.y_point = a.lat;
        });
        this.data = b.data;
        this.markerPoint();
        // this.webSocket.send('{"act":"ma_open_rtsp","device_id":'+data+'}');
      }
      if ((a.cmd == "server_push_sos")) {
        this. open4(a.sos_type)
        // this.$store.state.visible=true
        // setTimeout(this.$store.state.visible=false,3000)
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
