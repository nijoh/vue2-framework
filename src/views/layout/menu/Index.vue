<template>
  <div>
    <el-menu
      :default-active="activePath"
      router
      class="el-menu-vertical-demo"
      background-color="#112f50"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
    >
      <el-menu-item>
        <span slot="title">SASS后端管理系统</span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="/system">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/system/users">
            <i class="el-icon-user-solid"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item>
            <i class="el-icon-user"></i>
            <span slot="title">角色管理</span>
          </el-menu-item>
          <el-menu-item>
            <i class="el-icon-menu"></i>
            <span slot="title">菜单管理</span>
          </el-menu-item>
          <el-menu-item index="/login">登录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <!-- <dynamicMenu :dyMenuList="dyMenuList"></dynamicMenu> -->
    </el-menu>
  </div>
</template>
<script>
import dynamicMenu from './dynamicMenu.vue'

export default {
  props: ["isCollapse", "activePath"],
  // components: {
  //   dynamicMenu
  // },
  // data(){
  //   return {
  //     dyMenuList:[]
  //   }
  // },
  // created(){
  //   this.dyMenuList=this.$store.getters['menuStore/getMenus'];
  // }
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