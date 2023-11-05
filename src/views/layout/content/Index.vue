<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <div class="open">
        <span
          v-if="!isCollapse"
          class="el-icon-s-fold"
          @click="closeFold"
        ></span>
        <span v-else class="el-icon-s-unfold" @click="openFold"></span>
      </div>
    </div>
    <!-- 内容 -->
    <div></div>
    <!-- 路由 -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  methods: {
    closeFold() {
      this.$emit("closeMenu", true);
    },
    openFold() {
      this.$emit("closeMenu", false);
    },
  },
  props: ["isCollapse"],
};
</script>
<style lang="less" scoped>
.header {
  height: 50px;
  background: #1e78bf;
  color: #fff;
  line-height: 50px;
  .open {
    font-size: 25px;
  }
}
</style>