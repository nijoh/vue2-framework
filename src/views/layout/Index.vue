<template>
  <div class="layout">
    <!-- 左边导航栏 -->
    <div class="menu">
      <Menu :isCollapse="isCollapse"></Menu>
    </div>
    <!-- 右侧内容  -->
    <div class="content" :class="{ small: isCollapse }">
      <Content @closeMenu="closeMenu" :isCollapse="isCollapse"></Content>
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
    };
  },
  methods: {
    closeMenu(value) {
      this.isCollapse = value;
    },
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