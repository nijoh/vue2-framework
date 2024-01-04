<template>
<div>
    <template v-for="(item, index) in dyMenuList">
        <el-submenu v-if="item.children && item.children.length>0 &&isChildrenNavigation(item)" :key="index" :index="item.menuUrl">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.menuName}}</span>
            </template>

            <el-menu-item-group>
                <dyMenu :dyMenuList="item.children"></dyMenu>
            </el-menu-item-group>
        </el-submenu>

        <el-menu-item v-else-if="item.menuType==='DIRECTORY'" :key="index" :index="item.menuUrl">
            <i class="el-icon-menu"></i>
            <span slot="title">{{item.menuName}}</span>
        </el-menu-item>

        <el-menu-item v-else-if="item.menuType==='MENU'" :key="index" :index="item.menuUrl">
            <i class="el-icon-menu"></i>
            <span slot="title">{{item.menuName}}</span>
        </el-menu-item>
    </template>

</div>
</template>

<script>
export default {
    name: "dyMenu",
    props: {
        dyMenuList: Array
    },
    created() {
        console.log("------------------", this.dyMenuList);
    },
    methods: {
        /**
         * 遍历Children 是否包含MENU
         */
        isChildrenNavigation(params) {

            let result = false;
            Object.values(params.children).forEach(value => {
                if (value.menuType === 'MENU') {
                    result = true;
                }
            })
            return result;
        }
    }
}
</script>

<style>

</style>
