<template>
  <div>
      <template v-for="(item, index) in dyMenuList">
        <el-submenu v-if="item.children && item.children.length>0 &&isChildrenNavigation(item)" :key="index" :index="item.menuUri">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.menuName}}</span>
        </template>
        
        
        <el-menu-item-group>
          <dyMenu :dyMenuList="item.children"></dyMenu>
        </el-menu-item-group>
      </el-submenu> 
       

        <el-menu-item v-else-if="item.menuType==='navigation'"  :key="index" :index="item.menuUri">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.menuName}}</span>
        </el-menu-item>
      </template>
      

  </div>
</template>

<script>

export default {
  name: "dyMenu",
  props:{
    dyMenuList:Array
  },
  created() {
    console.log("------------------",this.dyMenuList);
  },
  methods:{
    /**
     * 遍历Children 是否包含navigation
     */
    isChildrenNavigation(params){
      let result=false;
      Object.values(params.children).forEach(value=>{
	      if(value.menuType==='navigation'){
          result=true;
        }
      })
      return result;
    },
    // pushMenuPath(params){
    //  this.$router.push({name:params})
    // }
  }
}
</script>

<style>

</style>