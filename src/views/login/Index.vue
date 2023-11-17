<template>
  <div class="login-wrap">
    <el-form class="login-container">
      <h1 class="title">用户登录</h1>
      <el-form-item label="">
        <el-input
          type="text"
          v-model="loginFromData.email"
          placeholder="登录注册电子邮箱"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input
          type="password"
          v-model="loginFromData.passWord"
          placeholder="登录密码"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="loginSubmit()"
          >提交</el-button
        >
      </el-form-item>
      <el-row style="text-align: center; margin-top: -10px">
        <el-link type="primary">忘记密码</el-link>
        <el-link type="primary" @click="gotoRegister()">用户注册</el-link>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginFromData: {
        email: "",
        passWord: "",
      },
    };
  },
  methods: {
    async loginSubmit() {
      console.log(
        "用户名:",
        this.loginFromData.email,
        "密码:",
        this.loginFromData.passWord
      );
      const rsult = await this.$api.authLogin(this.loginFromData);
      console.log(rsult);
      if (rsult.data.code === 200) {
        console.log("登录成功，跳转首页");
        this.$store.commit("loginUserInfo", rsult.data.content);
        //查询是否有跳转的path
        const url = this.$route.query.redirect;
        if (url) {
          return this.$router.push({
            path: decodeURIComponent(url),
          });
        }
        //跳首页
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
.login-wrap {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 10%;
  /* background-color: #112346; */
  background-repeat: no-repeat;
  background-position: center right;
  background-size: 100%;
}

.login-container {
  border-radius: 10px;
  margin: 0px auto;
  width: 350px;
  padding: 30px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}

.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>