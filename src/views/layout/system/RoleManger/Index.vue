<template>
<div>
    <div class="header">
        <!-- 表头搜索框 -->
        <div class="from">
            <el-form :inline="true" :model="formData" class="demo-form-inline">
                <el-form-item label="角色名称">
                    <el-input v-model="formData.roleName" placeholder="角色名称" size="small"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="formData.status" placeholder="角色状态">
                        <el-option label="正常" value="NORMAL"></el-option>
                        <el-option label="冻结" value="FREEZE"></el-option>
                        <el-option label="删除" value="DELETED"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色权限码">
                    <el-input  placeholder="权限码" size="small" v-model="formData.roleCode"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary" @click="queryRoleSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 按钮 -->
        <div class="groupButton">
            <el-row>
                <el-button size="small" type="warning" icon="el-icon-plus" @click="addRole">新增角色</el-button>
            </el-row>
        </div>

        <!-- 列表 -->
        <div class="content">
            <el-table border :data="roleDatas" tooltip-effect="dark" style="width: 100%" header-row-class-name="headerRowClass" cell-class-name="cellClass" header-cell-class-name="headerCellClass">
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column prop="roleName" label="角色名称" show-overflow-tooltip />
                <el-table-column label="状态" show-overflow-tooltip>
                    <template slot-scope="scope">{{scope.row.status === "NORMAL"? "正常": scope.row.status === "FREEZE"? "冻结": "删除"}}</template>
                </el-table-column>
                <el-table-column prop="roleCode" label="权限码" show-overflow-tooltip />
                <el-table-column label="创建日期" width="180">
                    <template slot-scope="scope">{{scope.row.createTime | fmtDataTime}}</template>
                </el-table-column>
                <el-table-column fixed="right">
                    <template slot-scope="scope">
                        <el-dropdown @command="handleCommand">
                            <span class="el-dropdown-link">
                                操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item :command="beforeHandleCommand(scope.row,'modifyRole')">编辑</el-dropdown-item>
                                <el-dropdown-item :command="beforeHandleCommand(scope.row,'deleteRole')" divided>删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>

            </el-table>
        </div>
    </div>
    <DetailRole ref="DetailRole" :showDeatailRole="showDeatailRole" :queryDetailData="queryDetailData" @closeDeatailRole="closeDeatailRole"></DetailRole>
</div>
</template>

<script>
import DetailRole from '@/views/layout/system/RoleManger/DetailRole.vue';

export default {
    created() {
        this.queryRoleSubmit();
    },
    components: {
        DetailRole
    },
    data() {
        return {
            formData: {
                roleName: "",
                status: "",
                roleCode:""
            },
            createTime: [],
            roleDatas: [],
            showDeatailRole: false,
            queryDetailData: {},
            showAuthorizeRole: false,
            seletMenus: []
        };
    },
    methods: {
        //查询用户信息列表分页查询
        async queryRoleSubmit() {
            const res = await this.$api.queryRole(this.formData);
            this.roleDatas = res.content;
        },
        //单个删除
        async handleDelete(row) {
            let deleteParam = {
                roleId: row.roleId
            }
            await this.$api.deleteRole(deleteParam);
            this.queryRoleSubmit();
            this.$message({
                message: "删除成功",
                type: "success",
            });

        },
        //编辑
        async handleEdit(row) {
            this.showDeatailRole = true;
            let queryAuthorizeParam = {
                roleId: row.roleId
            };
            //已授权菜单
            const res = await this.$api.queryAuthorize(queryAuthorizeParam);
            this.queryDetailData = JSON.parse(JSON.stringify(row));
            this.queryDetailData.title = "编辑角色信息";
            this.queryDetailData.submitType = "modifyRole";

            this.seletMenus = res.content.map(({
                menuId
            }) => menuId);
            this.$refs.DetailRole.setCheckedKey(this.seletMenus);

        },

        closeDeatailRole(val) {
            console.log("关闭详细用户弹窗,是否更新视图", val);
            this.queryDetailData = {};
            this.seletMenus = [];
            if (val) {
                this.queryRoleSubmit();
            }
            this.showDeatailRole = false;
        },
        handleCommand(command) {
            switch (command.command) {
                case "modifyRole":
                    this.handleEdit(command.row);
                    break;
                case "deleteRole":
                    this.handleDelete(command.row);
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
        closeAuthorizeRole(val) {
            console.log("关闭授权弹窗，是否更新视图", val);
            if (val) {
                this.queryRoleSubmit();
            }
            this.showAuthorizeRole = false;
        },
        addRole() {
            this.showDeatailRole = true;
            this.queryDetailData.title = "新增角色信息";
            this.queryDetailData.submitType = "addRole";
        }
    },
};
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
