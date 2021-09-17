import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Welcome from '../components/Welcome.vue'
import UserList from '../components/user/UserList.vue'
import Rights from "../components/power/rights.vue"
import Roles from "../components/power/roles.vue"
import Helmet from "../components/product/helmet.vue"
import SafetyRope from "../components/product/safetyRope.vue"
import SafetyBelt from "../components/product/safetyBelt.vue"
import Signboard from "../components/product/signboard.vue"
import GroundLead from "../components/product/groundLead.vue"
import AttendanceSheet from "../components/function/attendanceSheet.vue"
import AlarmRecord from "../components/function/alarmRecord.vue"
import PhotoManagement from "../components/function/photoManagement.vue"
import Playback from "../components/function/playback.vue"
import SetGrouping from "../components/set/setGrouping.vue"
import SetTask from "../components/set/setTask.vue"
import index from "../components/datav/index.vue"
Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/index",
    },
    {
      path: "/index",
      component:index
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/home",
      component: Home,
      redirect: 'welcome',
      children: [
        {
          path: "/welcome",
          component: Welcome,
        }, {
          path: '/users',
          component: UserList
        }, {
          path: '/rights',
          component: Rights
        },
        {
          path: '/roles',
          component: Roles
        }, {
          path: '/helmet',
          component: Helmet
        }, {
          path: '/safetyRope',
          component: SafetyRope
        },
        , {
          path: '/safetyBelt',
          component: SafetyBelt
        },
        , {
          path: '/signboard',
          component: Signboard
        },
        , {
          path: '/groundLead',
          component: GroundLead
        },
        {
          path: '/attendanceSheet',
          component: AttendanceSheet
        },
        {
          path: '/alarmRecord',
          component: AlarmRecord
        },
        {
          path: '/photoManagement',
          component: PhotoManagement
        },
        {
          path: '/playback',
          component: Playback
        },
        {
          path: '/SetTask',
          component: SetTask
        },
        {
          path: '/SetGrouping',
          component: SetGrouping
        },
      ]
    },
  ],
});

router.beforeEach((to, from, next) => {
  //to表示要访问的路径
  //form代表从哪里跳转而来
  //next代表是否放行
  document.title = "森格后台管理系统"

  if (to.path === "/login"||to.path === "/index") return next();

  const sess = window.sessionStorage.getItem("token");
  if (!sess) {
    return next("/login");
  }
  next();
});

export default router;
