<template>
<el-dialog title="编辑员工信息" :visible.sync="showDeatailUser" :show-close="false">
    <el-form :model="queryDetailData">
        <el-form-item label="昵称" :label-width="formLabelWidth">
            <el-input v-model="queryDetailData.nickName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="queryDetailData.gender" placeholder="请选择性别">
                <el-option label="男士" value="man"></el-option>
                <el-option label="女士" value="woman"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="queryDetailData.phone" autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="closeDeatailUser(false)">取 消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
    </div>
</el-dialog>
</template>

<script>
export default {
    props: {
        showDeatailUser: Boolean,
        queryDetailData: Object
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
        closeDeatailUser(isUpdate) {
            this.$emit('closeDeatailUser', isUpdate)
        },
        async submit() {
            console.log("提交数据获取数据", this.queryDetailData);
            const res = await this.$api.modifyStaff(this.queryDetailData);
            if (res.code === 200) {
                this.$message({
                    message: "更新用户数据成功",
                    type: "success",
                });
                this.closeDeatailUser(true);
            }
        },
    }
};
</script>
