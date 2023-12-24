<template>
<div>
    <div class="header">
        <!-- 表头搜索框 -->
        <div class="from">
            <el-form :inline="true" :model="formData" class="demo-form-inline">
                <el-form-item label="员工姓名">
                    <el-input v-model="formData.staffName" placeholder="员工姓名" size="small"></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker v-model="formData.createTime" type="date" placeholder="选择日期" size="small" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary" @click="onQuerySubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 按钮 -->
        <div class="groupButton">
            <el-row>
                <el-button size="small" type="warning" icon="el-icon-plus" @click="addUserSubmit">添加用户</el-button>
                <el-button size="small" icon="el-icon-delete" type="danger" @click="deleteBatch">批量删除</el-button>
            </el-row>
        </div>

        <!-- 列表 -->
        <div class="content">
            <el-table border :data="accountUserData" tooltip-effect="dark" style="width: 100%" header-row-class-name="headerRowClass" cell-class-name="cellClass" header-cell-class-name="headerCellClass" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column prop="staffName" label="员工姓名" show-overflow-tooltip />
                <el-table-column label="状态" show-overflow-tooltip>
                    <template slot-scope="scope">{{scope.row.status === "NORMAL"? "正常": scope.row.status === "FREEZE"? "冻结": "删除"}}</template>
                </el-table-column>
                <el-table-column prop="nickName" label="昵称" show-overflow-tooltip />
                <el-table-column prop="roleName" label="角色" show-overflow-tooltip />
                <el-table-column label="创建日期" width="180">
                    <template slot-scope="scope">{{scope.row.createTime | fmtDataTime}}</template>
                </el-table-column>
                <el-table-column prop="lastLoginTime" label="登录日期" width="180">
                    <template slot-scope="scope">{{scope.row.lastLoginTime | fmtDataTime}}</template>
                </el-table-column>
                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-dropdown @command="handleCommand">
                            <span class="el-dropdown-link">
                                操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item :command="beforeHandleCommand(scope.row,'modifyUser')">编辑</el-dropdown-item>
                                <el-dropdown-item :command="beforeHandleCommand(scope.row,'authorizeRole')">授权角色</el-dropdown-item>
                                <el-dropdown-item :command="beforeHandleCommand(scope.row,'freezeUser')">冻结用户</el-dropdown-item>
                                <el-dropdown-item :command="beforeHandleCommand(scope.row,'deleteUser')" divided>删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>

            </el-table>
        </div>

        <!-- 分页视图 -->
        <div>
            <PaginationPage :pageNum="formData.pageNum" :pageSize="formData.pageSize" :total="total" @changePageNum="changePageNum"></PaginationPage>
        </div>
    </div>
    <detailUser :showDeatailUser="showDeatailUser" :queryDetailData="queryDetailData" @closeDeatailUser="closeDeatailUser"></detailUser>
    <authorizeRole :showAuthorizeRole="showAuthorizeRole" :userRoleInfo="userRoleInfo" @closeAuthorizeRole="closeAuthorizeRole"></authorizeRole>
    <freezeUser :showFreezeUser="showFreezeUser" :accountId="accountId" @closeFreezeUser="closeFreezeUser"></freezeUser>
</div>
</template>

<script>
import PaginationPage from "@/components/PaginationPage.vue";
import detailUser from "@/views/layout/system/users/detailUser.vue";
import authorizeRole from "@/views/layout/system/users/authorizeRole.vue";
import freezeUser from "@/views/layout/system/users/freezeUser.vue";

export default {
    components: {
        PaginationPage,
        detailUser,
        authorizeRole,
        freezeUser
    },
    data() {
        return {
            formData: {
                staffName: "",
                createTime: "",
                status: "",
                pageNum: 1,
                pageSize: 5,
            },
            accountUserData: [],
            total: 0,
            deleteParam: {
                emailList: [],
            },
            multipleSelection: [], //多选保存
            showDeatailUser: false,
            queryDetailData: {},
            showAuthorizeRole: false,
            userRoleInfo: {},
            showFreezeUser: false,
            accountId:""
        };
    },
    methods: {
        //查询用户信息列表分页查询
        async onQuerySubmit() {
            console.log(this.formData);
            const res = await this.$api.accountUserQueryPage(this.formData);
            if (res.data.code === 200) {
                this.accountUserData = res.data.content.list;
                this.setPageChange(res.data.content);
            }
        },
        //跳转新增用户视图
        addUserSubmit() {
            this.$router.push({
                name: "AddUser",
                replace: true
            });
        },
        //修改分页视图（总页数、页数）
        setPageChange(accountUserData) {
            this.total = accountUserData.pages;
            this.pageNum = accountUserData.startRow;
        },
        //跳转页数
        changePageNum(val) {
            this.formData.pageNum = val;
            this.onQuerySubmit();
        },
        //单个删除
        async handleDelete(row) {
            console.log("请求前", this.deleteParam);
            this.deleteParam.emailList.push(row.email);
            this.requestDeleteUser();
            console.log("请求后", this.deleteParam);
        },
        //批量删除
        deleteBatch() {
            console.log("选择多行", this.multipleSelection);
            if (this.multipleSelection.length > 0) {
                this.multipleSelection.forEach((item) => {
                    this.deleteParam.emailList.push(item.email);
                });
                this.requestDeleteUser();
            }
        },
        //多选-选择一个select触发保存选择select行
        handleSelectionChange(row) {
            this.multipleSelection = row;
        },
        //请求删除
        async requestDeleteUser() {
            const res = await this.$api.deleteUser(this.deleteParam);
            if (res.data.code === 200) {
                //重新查询
                this.onQuerySubmit();
                this.deleteParam.emailList = [];
            }
        },
        //编辑
        async handleEdit(row) {
            const params = {
                staffId: row.staffId
            };
            const res = await this.$api.queryDetail(params);
            if (res.data.code === 200) {
                this.queryDetailData = res.data.content;
                console.log(this.queryDetailData);
                this.showDeatailUser = true;
            }
        },
        closeDeatailUser(val) {
            console.log("关闭详细用户弹窗,是否更新视图", val);
            if (val) {
                this.onQuerySubmit();
            }
            this.showDeatailUser = false;
        },
        handleCommand(command) {
            switch (command.command) {
                case "modifyUser":
                    this.handleEdit(command.row);
                    break;
                case "deleteUser":
                    this.handleDelete(command.row);
                    break;
                case "authorizeRole":
                    this.handleAuthorizeRole(command.row);
                    break;
                case "freezeUser":
                    this.handleFreezeUser(command.row);
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
                this.onQuerySubmit();
            }
            this.showAuthorizeRole = false;
        },
        async handleAuthorizeRole(row) {
            const res = await this.$api.queryRoles();
            if (res.data.code === 200) {
                this.userRoleInfo = {
                    nickName: row.nickName,
                    roleName: row.roleName,
                    roleInfos: res.data.content,
                    staffId: row.staffId
                }
                this.showAuthorizeRole = true;
            }

        },
        closeFreezeUser(val) {
            console.log("关闭冻结用户窗口，是否更新视图", val);
            if (val) {
                this.onQuerySubmit();
            }
            this.showFreezeUser = false;
        },
        handleFreezeUser(row) {
            this.accountId = row.accountId;
            this.showFreezeUser = true;
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
