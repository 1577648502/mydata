<template>
  <el-container class="top">
    <el-header>
      <div>
        <img src="../assets/img/log1.png" style="width:5%"/>
        <span style="margin: 0 20px;">广西水利电力职业技术学院</span>
       
     
      </div>
      <div>
        <!-- <el-avatar icon="el-icon-user-solid"></el-avatar>
        <span style="margin: 0px 10px">欢迎您{{ username }}</span> -->
           <span style="margin: 0 20px;">广西森格科技股份有限公司</span>
         <img src="../assets/img/log.png" alt="" />
        <el-button type="info" @click="loginout" style="margin: 0 20px;">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse="this.isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePuth"
        >
          <div class="button" @click="logg">| | |</div>

          <el-submenu :index="i.id + ''" v-for="i in lists" :key="i.id">
            <template slot="title">
              <i :class="iconObj[i.id]"></i>
              <span>{{ i.authName }}</span>
            </template>
            <el-menu-item
              :index="'/' + index.path"
              v-for="index in i.children"
              :key="index.id"
              @click="activePuths('/' + index.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ index.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      lists: [
        {
          id: 125,
          authName: "用户管理",
          path: "users",
          children: [
            {
              id: 110,
              authName: "用户列表",
              path: "users",
              children: [],
              order: null,
            },
          ],
          order: 1,
        },
        // {
        //   id: 103,
        //   authName: "权限管理",
        //   path: "rights",
        //   children: [
        //     {
        //       id: 111,
        //       authName: "角色列表",
        //       path: "roles",
        //       children: [],
        //       order: null,
        //     },
        //     {
        //       id: 112,
        //       authName: "权限列表",
        //       path: "rights",
        //       children: [],
        //       order: null,
        //     },
        //   ],
        //   order: 2,
        // },
        {
          id: 102,
          authName: "产品管理",
          path: "product",
          children: [
            {
              id: 104,
              authName: "安全帽",
              path: "helmet",
              children: [],
              order: 1,
            },
            {
              id: 105,
              authName: "安全绳",
              path: "safetyRope",
              children: [],
              order: 1,
            },
            {
              id: 106,
              authName: "安全带",
              path: "safetyBelt",
              children: [],
              order: 1,
            },
            {
              id: 107,
              authName: "标识牌",
              path: "signboard",
              children: [],
              order: 1,
            },
            {
              id: 108,
              authName: "接地线",
              path: "groundLead",
              children: [],
              order: 1,
            },
          ],
          order: 3,
        },
        {
          id: 101,
          authName: "功能区域",
          path: "function",
          children: [
            {
              id: 204,
              authName: "考勤记录",
              path: "attendanceSheet",
              children: [],
              order: 1,
            },
            {
              id: 205,
              authName: "报警记录",
              path: "alarmRecord",
              children: [],
              order: 1,
            },
            {
              id: 206,
              authName: "照片管理",
              path: "photoManagement",
              children: [],
              order: 1,
            },
            {
              id: 207,
              authName: "视频回放",
              path: "playback",
              children: [],
              order: 1,
            },
          ],
          order: 4,
        },
        {
          id: 155,
          authName: "设置管理",
          path: "set",
          children: [
            {
              id: 146,
              authName: "任务设置",
              path: "setTask",
              children: [],
              order: null,
            },
            {
              id: 146,
              authName: "分组设置",
              path: "setGrouping",
              children: [],
              order: null,
            },
          ],
          order: 5,
        },
      ],
      iconObj: {
        125: "el-icon-user-solid",
        103: "el-icon-coin",
        101: "el-icon-s-cooperation",
        102: "el-icon-s-order",
        145: "el-icon-s-marketing",
        155: "el-icon-setting",
      },
      isCollapse: false,
      activePuth: "",
      username: window.sessionStorage.getItem("username"),
    };
  },
  created() {
    this.getNavLists();
    this.activePuth = window.sessionStorage.getItem("activePuth");
  },
  methods: {
    loginout() {
      window.sessionStorage.clear();
      this.$router.push("/index");
    },
    getNavLists() {
      this.$http
        .get("menus")
        .then((res) => {
          this.lists = res.data.data;
          console.log(this.lists);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    logg() {
      this.isCollapse = !this.isCollapse;
    },
    activePuths(activePuth) {
      window.sessionStorage.setItem("activePuth", activePuth);
      this.activePuth = activePuth;
    },
    app() {
      console.log(this.terr);
    },
  },
};
</script>
<style lang="less" scoped>
.top {
  height: 100%;
}
.el-header {
  background-color: rgb(66, 66, 66);
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    align-items: center;

    img {
      width: 40px;
    }
  }
  span {
    color: #fff;
    margin-left: 10px;
    font-size: 18px;
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
    .button {
      background-color: #4a5064;
      color: #fff;
      line-height: 24px;
      cursor: pointer;
      text-align: center;
    }
  }
}
.el-main {
  background-color: rgb(233, 237, 240);
 
}
</style>
