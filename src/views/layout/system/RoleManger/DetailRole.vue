<template>
<el-dialog :title="queryDetailData.title" :visible.sync="showDeatailRole" :before-close="closeDialog">
    <el-form :model="queryDetailData" :rules="rules" ref="rowData">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
            <el-input v-model="queryDetailData.roleName"></el-input>
        </el-form-item>

        <el-form-item label="角色权限码" :label-width="formLabelWidth">
            <el-input v-model="queryDetailData.roleCode"></el-input>
        </el-form-item>
        <el-form-item label="授权菜单" :label-width="formLabelWidth">
            <el-tree :data="menuAll" show-checkbox default-expand-all node-key="menuId" ref="tree" highlight-current :props="defaultProps">
            </el-tree>
        </el-form-item>
        <el-form-item label="状态" prop="status">
            <el-radio-group v-model="queryDetailData.status">
                <el-radio label="NORMAL">正常</el-radio>
                <el-radio label="FREEZE">停用</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="closeDeatailRole(false)">取 消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
    </div>
</el-dialog>
</template>

<script>
export default {
    created() {
        this.queryAllMenu();
    },
    props: {
        showDeatailRole: Boolean,
        queryDetailData: Object
    },
    data() {
        return {
            formLabelWidth: '120px',
            menuAll: [],
            defaultProps: {
                children: 'children',
                label: 'menuName'
            },
            rules: {
                roleName: [{
                    required: true,
                    message: '角色名称不能为空',
                    trigger: 'blur'
                }],
                status: [{
                        required: true,
                        message: '请选择角色状态',
                        trigger: 'blur'
                    },

                ],
            }
        };

    },
    methods: {
        /**
         * 关闭弹窗 是否通知更新视图
         * @param {true|false} isUpdate true 通知父组件更新视图 false 不更新
         */
        closeDeatailRole(isUpdate) {
            this.resetChecked();
            this.$emit('closeDeatailRole', isUpdate)
        },
        submit() {

            this.$refs.rowData.validate((valid) => {
                if (valid) {
                    let submitFormData = Object.assign({}, this.queryDetailData);
                    delete submitFormData.submitType;
                    delete submitFormData.title;
                    let selectAuthorizeMenus = this.$refs.tree.getCheckedKeys()
                    console.log("提交的数据", submitFormData);
                    console.log("提交菜单授权勾选", selectAuthorizeMenus);
                    if (this.queryDetailData.submitType === 'modifyRole') {
                        this.modifyRole(submitFormData).then(() => {
                            this.authorizeMenus(selectAuthorizeMenus, submitFormData.roleId);
                            this.$message({
                                message: "修改成功",
                                type: "success",
                            });
                            this.closeDeatailRole(true);
                        });

                    }
                    if (this.queryDetailData.submitType === 'addRole') {
                        this.addRole(submitFormData).then(roleId => {
                            if (selectAuthorizeMenus && selectAuthorizeMenus.length > 0) {
                                this.authorizeMenus(selectAuthorizeMenus, roleId);
                            }
                            this.$message({
                                message: "新增成功",
                                type: "success",
                            });
                            this.closeDeatailRole(true);
                        });

                    }

                }

            });

        },
        //关闭前回调
        closeDialog() {
            this.closeDeatailRole(false);
        },
        //所有菜单Tree
        async queryAllMenu() {
            const res = await this.$api.queryTree()
            this.menuAll = res.content;
        },
        //设置回显
        setCheckedKey(selectMenu) {
            this.$refs.tree.setCheckedKeys(selectMenu)
        },
        //清空勾选
        resetChecked() {
            this.$refs.tree.setCheckedKeys([]);
        },
        //修改角色
        async modifyRole(submitFormData) {
            await this.$api.modifyRole(submitFormData);
        },
        //授权菜单数据
        async authorizeMenus(authorizeMenusData, roleId) {
            let authorizeMenusParam = {
                roleId: roleId,
                menuIds: authorizeMenusData
            }
            await this.$api.authorizeMenus(authorizeMenusParam);

        },
        //新增角色
        async addRole(submitFormData) {
            const res = await this.$api.addRole(submitFormData);
            return res.content.roleId;
        }
    }
};
</script>
