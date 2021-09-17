<template>
  <div class="box">
    <div class="box-conner">
      <div class="box-head">
        <img src="../assets/img/log.png" alt="" />
      </div>
      <!-- //:rules=表单验证规则属性 -->
      <el-form
        label-width="0px"
        :rules="formRules"
        ref="fronRef"
        class="form-box"
        :model="formData"
      >
        <el-form-item prop="user_name">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="formData.user_name"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            prefix-icon="el-icon-unlock"
            v-model="formData.pwd"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reom">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        user_name: "CSDL",
        pwd: "123456",
      },
      //设置表单验证规则
      formRules: {
        //用户名验证规则
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        //密码验证规则
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    reom() {
      this.$refs.fronRef.resetFields();
    },
    login() {
      this.$refs.fronRef.validate((v) => {
        if (!v) return;
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
              window.sessionStorage.setItem("username", this.formData.user_name);
              this.$router.push("/home");
               });
            } else {
              this.$message.error("登录失败");
            }
          });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  background-color: #2b4b6b;
  height: 100%;
  .box-conner {
    width: 450px;
    height: 350px;
    background-color: #ccc;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .box-head {
      width: 150px;
      height: 150px;
      border: 1px solid #fff;
      border-radius: 50%;
      position: relative;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        width: 100%;
        height: 100%;
        border: 1px solid #fff;
        border-radius: 50%;
      }
    }
  }
}
.form-box {
  position: absolute;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  bottom: 15px;
}
.el-form-item {
  text-align: center;
}
</style>
