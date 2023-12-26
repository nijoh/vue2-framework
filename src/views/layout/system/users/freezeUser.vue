<template>
<el-dialog title="冻结用户" :visible.sync="showFreezeUser" width="30%" :show-close="false">
    <el-alert title="冻结用户将限制登录,请谨慎操作" type="warning" center show-icon :closable="false">
    </el-alert>
    <!-- <span>冻结用户将限制登录,请谨慎操作</span> -->
    <span slot="footer" class="dialog-footer">
        <el-button @click="closeFreezeUser(false)">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
    </span>
</el-dialog>
</template>

<script>
export default {
    props: {
        showFreezeUser: Boolean,
        accountId:String
    },
    methods: {
        /**
         * 关闭弹窗 是否通知更新视图
         * @param {true|false} isUpdate true 通知父组件更新视图 false 不更新
         */
        closeFreezeUser(isUpdate) {
            this.$emit('closeFreezeUser', isUpdate)
        },
        async submit() {
            debugger;
            const params = {
                accountId:this.accountId
            }
            const res = await this.$api.freezeStaff(params);
            if (res.code === 200) {
                this.$message({
                    message: "操作成功",
                    type: "success",
                });
                //关闭并更新视图
                this.closeFreezeUser(true);
            }
        }
    }
};
</script>
