<template>
  <div class="layout">
    <!-- 左边导航栏 -->
    <div class="menu">
      <Menu :isCollapse="isCollapse" :activePath="activePath"></Menu>
    </div>
    <!-- 右侧内容  -->
    <div class="content" :class="{ small: isCollapse }">
      <Content
        @closeMenu="closeMenu"
        :isCollapse="isCollapse"
        :username="username"
        @logOut="logOut"
      ></Content>
    </div>
  </div>
</template>
<script>
// 引入组件
import Menu from "./menu/Index.vue";
import Content from "./content/Index.vue";

export default {
  //注册主键
  components: {
    Menu,
    Content,
  },
  data() {
    return {
      isCollapse: false, //默认不折叠
      activePath: "/",
      username: "",
    };
  },
  methods: {
    //隐藏菜单事件
    closeMenu(value) {
      this.isCollapse = value;
    },
    //监听route并改变高亮到导航activePath属性
    watchChangeRoutePath(data) {
      //判断是否是子路径 通过设置meta判断 属于 哪个高亮path
      if (data.meta.activePath) {
        this.activePath = data.meta.activePath;
      } else {
        this.activePath = data.path;
      }
    },
    //登出
    logOut() {
      localStorage.removeItem("currentUser");
      this.$router.push({ name: "login" });
    },
  },
  watch: {
    //监听页面URL是否发生变化
    $route(to, from) {
      this.watchChangeRoutePath(to);
    },
  },
  //页面刷新后调用生命周期
  created() {
    this.watchChangeRoutePath(this.$route);
    //获取登录的username
    this.username = this.$store.getters.getCurrentUser.username;
  },
};
</script>
<style lang="less" scoped>
.layout {
  .menu {
    background: #112f50;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
  }
  .content {
    padding-left: 200px;
  }
  .small {
    padding-left: 64px;
  }
}
</style>