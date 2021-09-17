import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "./assets/app.css";
import axios from "axios";
import TreeTable from 'vue-table-with-tree-grid'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
Vue.config.productionTip = false;
Vue.use(VueVideoPlayer)
import BaiduMap from 'vue-baidu-map'
import dataV from '@jiaminghi/data-view'
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'lpvgkZac25du6YsnbGoczMbicZosh85Z'
})
import './assets/common.less'
Vue.use(dataV)
//设置请求的 根路径
// axios.defaults.baseURL = "http://139.198.124.16:8888/api/private/v1/";
// axios.defaults.baseURL = "https://kjy.gywulian.cn:8383/";
// axios.defaults.baseURL = "http://127.0.0.1:8081/svg/img/";
// axios.defaults.baseURL = "https://caps.runde.pro/api/index.php";
//拦截请求添加 token
axios.interceptors.request.use(config => {
// Do something before request is sent
//  通过congig获取token添加到请求头
var token="Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJibHhtIiwicm9sZSI6IueuoeeQhuWRmCIsInBob25lIjoiIiwiY3JlYXRlZCI6MTYzMDQ4ODU1Njg3NCwiaWQiOjI1LCJ1c2VyLWFnZW50IjoiQlJPV1NFUiJ9.7xZjJHYAfKKg5ebqZUZGO5doRKcQokF3l-eLVxkH5WaGn7YwkGqbtTrXeK5efqQQD3xjC_1NywpAziicbVIAqg";
config.headers.Authorization=token
return config;
},error => {
// Do something with request error
return Promise.reject(error);
});
Vue.component("tree-table",TreeTable)
//设置Vue的可以直接访问axios

Vue.prototype.$http = axios;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
