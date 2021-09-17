<template>
  <!-- <div id="a">
    <counter></counter>
  </div> -->
 
  <div class="socket1">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>WebSocket</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="webSocketSend(textarea)"
          >发送token</el-button
        >
      </div>
      <!-- {{ msgData.realTimeData.project }} -->
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea"
      >
      </el-input>
    </el-card>


    <el-table
      :data="msgData"
      style="width: 100%; margin-bottom: 20px"
      row-key="o"
      border
      slot=""
    >
      <el-table-column prop="projectName" label="镇" sortable width="180">
      </el-table-column>
      
      <el-table-column prop="indicatorTitle" label="姓名" sortable width="180">

         <template slot-scope="scope" width="170px">
          {{scope.row}}
        </template>

      </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column label="操作" width="180px">
       
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      webSock: null,
      reconnectData: null,
      lockReconnect: false, //避免重复连接，因为onerror之后会立即触发 onclose
      timeout: 100000, //心跳时间参数  1小时一次心跳检测
      timeoutObj: null, //心跳检测函数执行后的参数 1代表执行成功
      serverTimeoutObj: null, //等待服务端响应函数执行后的参数 1代表执行成功
      textarea: "Subscribe project={1,2,3,4,5,6,7,8}", //输入框 文字
      token:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MSIsInJvbGUiOiLnrqHnkIblkZgiLCJwaG9uZSI6IjE1Mjc3NDM3NDY2IiwiY3JlYXRlZCI6MTYyODEyNDk4MzQ2MiwiaWQiOjIzLCJ1c2VyLWFnZW50IjoiQlJPV1NFUiJ9.emPJaV4ctROkEBI9fc-zAy2azIUlgqQKbNq1wH-4vx9xhQCInEReUbOI9z16Ut2mLOOK-peWODmEHIqVMEqb9A",
      msgData: [],
    };
  },
  created() {
    if (typeof WebSocket === "undefined") {
      console.log("您的浏览器不支持WebSocket");
    } else {
      // console.log('您的浏览器支持WebSocket')
      this.initWebSocket();
    }
    // this.add()
    // var url = "/api/svg/img/index.svg";
    // const xhr = new XMLHttpRequest();
    // xhr.open("GET", url, true);
    // xhr.send();
    // /* 监听xhr对象 */
    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState == 4 && xhr.status == 200) {
    //   }
    // };
    // xhr.addEventListener("load", () => {
    //   const resXML = stringToXml(xhr.response);
    //   this.svgDom = resXML.documentElement.cloneNode(true);
    //   //this.svgDom = resXML
    //   /* 添加事件（点击事件，鼠标滚轮事件,全屏事件） */
    //   console.log(xhr.responseXML);
    //   this.addEvents();
    //   /* dom重置 */
    //   /* 将svgDom对象转换成vue的虚拟dom */
    //   var oSerializer = new XMLSerializer();
    //   var sXML = oSerializer.serializeToString(this.svgDom);
    //   Vue.component("counter",{
    //     template: "<div id='svgTemplate'>" + sXML + "</div>",
    //   });
    //   this.resetDom()
    // })
    // function stringToXml(xmlString) {
    //   var xmlDoc;
    //   if (typeof xmlString == "string") {
    //     //FF
    //     if (document.implementation.createDocument) {
    //       var parser = new DOMParser();
    //       xmlDoc = parser.parseFromString(xmlString, "text/xml");
    //     } else if (window.ActiveXObject) {
    //       xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    //       xmlDoc.async = false;
    //       xmlDoc.loadXML(xmlString);
    //     }
    //   } else {
    //     xmlDoc = xmlString;
    //   }
    //   return xmlDoc;
    // }
  },
  mounted() {},
  methods: {
    gatadd(){
 this.$http
        .gat("https://kjy.gywulian.cn:8383/organization/GetOrgStructure?ownerId=1")
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    },


    
    // WebSockets参数初始化
    initWebSocket() {
      console.log("WebSocket启动中......");
      // let wsurl = 'ws://121.40.165.18:8800';
      //WebSocket服务器地址
      let wsurl = "wss://kjy.gywulian.cn:8383/AllInOneRTP";
      // let wsurl = 'ws://123.207.136.134:9010/ajaxchattest';
      this.webSock = new WebSocket(wsurl);
  
      this.webSock.onopen = this.webSocketOpen; //连接成功
      this.webSock.onmessage = this.webSocketAcceptMessage; //广播成功
      this.webSock.onerror = this.webSocketError; //连接断开，失败
      this.webSock.onclose = this.webSocketClose; //连接关闭
    },
    //初始化WebSocket
    webSocketOpen() {
      console.log("连接成功");
      // this.heartBeat();
      this.webSock.send(this.token);
    }, //连接成功
    webSocketError() {
      console.log("连接失败");
      this.reconnect();
    }, //连接失败
    webSocketClose() {
      console.log("断开连接");
      this.reconnect();
    },
    //接受webSocket消息
    webSocketAcceptMessage(evt) {
      this.heartBeat(); //收到消息会刷新心跳检测，如果一直收到消息，就推迟心跳发送
      // let msgData = JSON.parse(data);
      // console.log("收到消息" + evt.data);
      this.msgData= JSON.parse(evt.data).realTimeData.project
      console.log(this.msgData);
    
        // this.msgData = evt.data;
        // console.log(this.msgData);
      
    },
    //发送数据到服务端
    webSocketSend(data) {
      this.webSock.send(data);
    },
    //重新连接 WebSocket服务
    reconnect() {
      if (this.lockReconnect) {
        //连接失败和关闭之后都会触发，通过lockReconnect控制只连接了一个webSocket
        return;
      }
      this.lockReconnect = true;
      //clearTimeout() 方法可取消由 setTimeout() 方法设置的定时操作。
      // clearTimeout() 方法的参数必须是由 setTimeout() 返回的 ID 值。
      this.reconnectData && clearTimeout(this.reconnectData);
      // setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式
      //5s后调用initWebSocket()
      //这个函数执行成功 reconnectData会变为1 也就是true
      this.reconnectData = setTimeout(() => {
        this.initWebSocket();
        this.lockReconnect = false;
      }, 5000);
    },
    //心跳检测
    heartBeat() {
      this.timeoutObj && clearTimeout(this.timeoutObj);
      this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
      this.timeoutObj = setTimeout(() => {
        this.webSocketSend({ type: "心跳检测" }); //根据后台要求发送
        this.serverTimeoutObj = setTimeout(() => {
          this.webSock.close(); //如果10秒之后我们没有收到 后台返回的心跳检测数据 断开socket，断开后会启动重连机制
        }, 10000);
      }, this.timeout);
    },
    // addEvents() {
    //   console.log("这里自己写处理代码哈");
    // },
    // resetDom() {
    //   document.querySelector("#AJ_x5F_TJB1_x5F_DL_1_").innerHTML = 888;
    //   console.log("这里写需要改变的节点的id对应的值喽");
    // },
  },
  destroyed() {
    this.lockReconnect = true;
    this.webSock.close(); //离开路由之后断开websocket连接
    clearTimeout(this.reconnectData); //离开清除 timeout
    clearTimeout(this.timeoutObj); //离开清除 timeout
    clearTimeout(this.serverTimeoutObj); //离开清除 timeout
  },
};
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
/* @import url("../assets/css.css"); */
</style>

