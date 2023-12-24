<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <!-- 左侧隐藏菜单图标 -->
      <div class="open">
        <span
          v-if="!isCollapse"
          class="iconfont el-icon-s-fold"
          @click="closeFold"
        ></span>
        <span v-else class="iconfont el-icon-s-unfold" @click="openFold"></span>
      </div>

      <div class="rightHeard">
        <span>欢迎  {{ staffName }}</span>  ｜ 
        <span class="iconfont el-icon-switch-button" @click="logOut"></span>
      </div>
    </div>
    
    <!-- 路由 -->
   <router-view></router-view>
    
  </div>
</template>
<script>
export default {
  methods: {
    //隐藏导航栏
    closeFold() {
      this.$emit("closeMenu", true);
    },
    //显示导航栏
    openFold() {
      this.$emit("closeMenu", false);
    },
    //登出
    logOut() {
      this.$emit("logOut");
    },
  },
  props: ["isCollapse", "staffName"],
};
</script>
<style lang="less" scoped>
.header {
  height: 50px;
  background: #1e78bf;
  color: #fff;
  line-height: 50px;
  display: flex;
  .open {
    flex: 1;
    .iconfont {
      font-size: 25px;
      cursor: pointer;
    }
  }
  .rightHeard {
    width: 320px;
    font-size: 16px;
    margin-right: 10px;
    text-align: right;
    .iconfont {
      font-size: 20px;
      cursor: pointer;
    }
  }
}
</style>