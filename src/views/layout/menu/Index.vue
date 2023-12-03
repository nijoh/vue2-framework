<template>
  <div>
    <el-menu
      router
      :default-active="activePath"
      class="el-menu-vertical-demo"
      background-color="#112f50"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
    >
      <el-menu-item>
        <span slot="title">SASS后端管理系统</span>
      </el-menu-item>

      <dynamicMenu :dyMenuList="dyMenuList" ></dynamicMenu>
    </el-menu>
  </div>
</template>
<script>
import dynamicMenu from './dynamicMenu.vue'

export default {
  props: ["isCollapse", "activePath"],
  components: {
    dynamicMenu
  },
  data(){
    return {
      dyMenuList:[]
    }
  },
  created(){
    this.dyMenuList=this.$store.getters['menuStore/getMenus'];
  }
};
</script>
<style lang="less" scoped>
.el-menu {
  border-right: 0;
  /deep/ .is-active {
    background: #1e78bf !important;
    color: #fff !important;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>