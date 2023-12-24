<template>
<el-dialog title="授权角色" :visible.sync="showAuthorizeRole" :show-close="false">
    <el-form :model="userRoleInfo">
        <el-form-item label="用户" :label-width="formLabelWidth">
            <el-input v-model="userRoleInfo.nickName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前角色" :label-width="formLabelWidth">
            <el-input v-model="userRoleInfo.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="授权角色" :label-width="formLabelWidth">
            <el-select v-model="userRoleInfo.selectRoleId" placeholder="请选择角色">
                <el-option v-for="(item, index) in userRoleInfo.roleInfos" :key="index" :label="item.roleName" :value="item.roleId"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="closeAuthorizeRole(false)">取 消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
    </div>
</el-dialog>
</template>

<script>
export default {
    props: {
        showAuthorizeRole: Boolean,
        userRoleInfo: Object
    },
    data() {
        return {
            formLabelWidth: '120px'
        };
    },
    methods: {
        /**
         * 关闭弹窗 是否通知更新视图
         * @param {true|false} isUpdate true 通知父组件更新视图 false 不更新
         */
        closeAuthorizeRole(isUpdate) {
            this.$emit('closeAuthorizeRole', isUpdate)
        },
        async submit() {
            console.log("提交数据获取数据", this.userRoleInfo);
            const params = {
                roleId: this.userRoleInfo.selectRoleId,
                staffId: this.userRoleInfo.staffId
            }
            const res = await this.$api.authorizeRole(params);
            if (res.data.code === 200) {
                this.$message({
                    message: "角色授权成功",
                    type: "success",
                });
                //关闭并更新视图
                this.closeAuthorizeRole(true);
            }
        },
    }
};
</script>
