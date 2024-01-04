<template>
<div class="header">
    <div class="groupButton">
        <el-row>
            <el-button size="small" type="warning" icon="el-icon-plus" @click="handleAdd">新增菜单</el-button>
        </el-row>
    </div>
    <div class="content">
        <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="menuId" border default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column prop="menuName" label="菜单名称" width="180">
            </el-table-column>
            <el-table-column prop="menuUrl" label="菜单路径" width="180">
            </el-table-column>
            <el-table-column prop="menuCode" label="菜单码">
            </el-table-column>
            <el-table-column prop="menuType" label="菜单类型">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.menuType === 'DIRECTORY' ? 'success' : scope.row.menuType === 'MENU' ? 'primary':'danger'" disable-transitions>{{scope.row.menuType === "DIRECTORY"? "目录": scope.row.menuType === "MENU"?"菜单":"按钮"}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column fixed="right">
                <template slot-scope="scope">
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="beforeHandleCommand(scope.row,'modifyMenu')">编辑</el-dropdown-item>
                            <el-dropdown-item divided :command="beforeHandleCommand(scope.row,'deleteMenu')">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <ModifyMenu :showModifyMenu="showModifyMenu" :treeAllMenu="treeAllMenu" :selectRowData="selectRowData" @closeModifyMenu="closeModifyMenu"></ModifyMenu>
</div>
</template>

<script>
import ModifyMenu from '@/views/layout/system/menusManger/ModifyMenu.vue';
export default {
    components: {
        ModifyMenu
    },
    created() {
        this.queryAllMenu();
    },
    data() {
        return {
            tableData: [],
            showModifyMenu: false,
            treeAllMenu: [],
            selectRowData: {}
        }
    },
    methods: {
        queryAllMenu() {
            this.$api.queryTree().then(res => {
                this.tableData = res.content;
            });

        },
        handleCommand(command) {
            switch (command.command) {
                case "modifyMenu":
                    this.handleEdit(command.row);
                    break;
                case "deleteMenu":
                    this.deleteMenu(command.row);
                    break;
            }
            console.log(command);
        },
        beforeHandleCommand(row, command) {
            return {
                'row': row,
                'command': command
            }
        },
        //编辑菜单
        handleEdit(row) {
            this.treeAllMenu = this.tableData;
            this.findParentMenu(row,this.treeAllMenu);
            //没有上级菜单
            row.parentMenuName === undefined ? row.parentMenuName = '无' : row.parentMenuName;
            this.selectRowData = JSON.parse(JSON.stringify(row));
            this.selectRowData.title = '菜单编辑';
            this.selectRowData.submitType = "modifyMenu";
            this.showModifyMenu = true;
        },
        //查找上级菜单
        findParentMenu(row,menus) {
            menus.forEach(item => {
                if (item.children != null && item.children.length > 0) {
                    this.findParentMenu(row,item.children);
                }
                if (item.menuId === row.parentId) {
                    row.parentMenuName = item.menuName;
                    return;
                }
                return;
            })
        },
        //关闭菜单弹框
        closeModifyMenu(val) {
            console.log("关闭修复菜单弹窗,是否更新视图", val);
            if (val) {
                this.queryAllMenu();
            }
            this.showModifyMenu = false;
        },
        //新增菜单
        handleAdd() {
            this.treeAllMenu = this.tableData;
            this.selectRowData = undefined;
            this.showModifyMenu = true;
        },
        //删除菜单
        async deleteMenu(row) {
            let deleteParams = {
                menuId:[row.menuId]
            }
            await this.$api.deleteMenu(deleteParams);
            this.$message({
                message: "删除菜单数据成功",
                type: "success",
            });
            this.queryAllMenu();
        }
    },
}
</script>

<style lang="less" scoped>
.header {
    padding: 20px;
    background: #fff;
    margin-bottom: 20px;

    .el-form-item {
        margin-bottom: 16px;
    }

    .groupButton {
        border: 1px solid #eee;
        padding: 10px;
    }

    .content {
        background: #fff;

        /deep/.headerRowClass {
            color: #333;
        }

        /deep/.cellClass {
            text-align: center;
            font-size: 16px;
        }

        /deep/.headerCellClass {
            text-align: center;
        }
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }
}
</style>
