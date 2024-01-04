<template>
<el-dialog :title=rowData.title :visible.sync="showModifyMenu" :before-close="closeMenuDialog">
    <el-form :model="rowData" :rules="rules" ref="rowData">
        <el-form-item label="上级菜单" prop="parentMenuName">
            <el-select class="main-select-tree" ref="selectTree" :disabled="rowData.parentMenuName === '无'" v-model="rowData.parentMenuName" style="width: 500px;" name='上级菜单'>
                <!-- otion 1 -->
                <el-option v-for="item in optionData(treeAllMenu)" :label="item.menuName" :value="item.menuId" style="display: none;" :key="item.menuId" />
                <el-tree class="main-select-el-tree" ref="selectelTree" :data="treeAllMenu" :props='treeProps' highlight-current @node-click="handleNodeClick" :expand-on-click-node="expandOnClickNode" default-expand-all />
            </el-select>

        </el-form-item>

        <el-form-item label="菜单名称" prop="menuName">
            <el-input v-model="rowData.menuName" style="width: 50%;"></el-input>
        </el-form-item>

        <el-form-item label="菜单路径" prop="menuUrl">
            <el-input v-model="rowData.menuUrl" style="width: 50%;"></el-input>
        </el-form-item>

        <el-form-item label="菜单码" prop="menuCode">
            <el-input v-model="rowData.menuCode" style="width: 50%;"></el-input>
        </el-form-item>

        <el-form-item label="菜单描述" v-if="rowData.submitType === 'addMenu'">
            <el-input type="textarea" :rows="2"  style="width: 50%;"  autosize placeholder="请输入内容" v-model="rowData.menuDesc"></el-input>
        </el-form-item>

        <el-form-item label="菜单类型" prop="menuType">
            <el-radio-group v-model="rowData.menuType">
                <el-radio label="DIRECTORY">目录</el-radio>
                <el-radio label="MENU">资源</el-radio>
                <el-radio label="BUTTON">按钮</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="status">
            <el-radio-group v-model="rowData.status">
                <el-radio label="NORMAL">正常</el-radio>
                <el-radio label="FREEZE">停用</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="closeModiyMenu(false)">取 消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
    </div>
</el-dialog>
</template>

<script>
export default {
    props: {
        showModifyMenu: Boolean,
        treeAllMenu: Array,
        selectRowData: {
            type: Object,
            default: function () {
                return {
                    menuName: "",
                    menuUrl: "",
                    menuCode: "",
                    menuType: "",
                    status: "",
                    parentMenuName: "",
                    title: '新增菜单',
                    submitType: 'addMenu',
                    menuDesc:''
                };
            }
        }
    },
    data() {
        return {
            expandOnClickNode: true,
            options: [],
            treeProps: {
                children: 'children',
                label: 'menuName'
            },
            rowData: {},
            rules: {
                menuName: [{
                        required: true,
                        message: '请输入菜单名称',
                        trigger: 'blur'
                    },

                ],
                menuUrl: [{
                        required: true,
                        message: '请输入菜单路径',
                        trigger: 'blur'
                    },

                ],
                menuCode: [{
                        required: true,
                        message: '请输入菜单码',
                        trigger: 'blur'
                    },

                ],
                status: [{
                        required: true,
                        message: '请选择菜单状态',
                        trigger: 'blur'
                    },

                ],
                menuType: [{
                        required: true,
                        message: '请选择菜单资源',
                        trigger: 'blur'
                    },

                ],
                parentMenuName: [{
                        required: true,
                        message: '请选择上级菜单',
                        trigger: 'blur'
                    },

                ],
            }
        }
    },
    watch: {
        selectRowData: function (newValue) {
            this.rowData = newValue;
        }
    },
    methods: {
        /**
         * 树形转平面的迭代方法
         * option 1的el-option需要此方法绑定数据
         */
        optionData(array, result = []) {
            array.forEach(item => {
                result.push({
                    label: item.label,
                    value: item.id
                })
                if (item.children && item.children.length !== 0) {
                    this.optionData(item.children, result)
                }
            })
            return JSON.parse(JSON.stringify(result))
        },
        // 点击节点的响应
        handleNodeClick(node) {
            this.rowData.parentMenuName = node.menuName;
            this.rowData.parentId = node.menuId;
            this.$refs.selectTree.blur();
        },
        //关闭前回调
        closeMenuDialog() {
            this.closeModiyMenu(false);
        },
        /**
         * 关闭弹窗 是否通知更新视图
         * @param {true|false} isUpdate true 通知父组件更新视图 false 不更新
         */
        closeModiyMenu(isUpdate) {
            this.resetForm();
            this.$emit('closeModifyMenu', isUpdate)
        },
        submit() {
            this.$refs.rowData.validate((valid) => {
                if (valid) {
                    let submitFormData = Object.assign({}, this.rowData);
                    delete submitFormData.submitType;
                    delete submitFormData.title;
                    delete submitFormData.parentMenuName;
                    console.log("提交的数据", submitFormData);
                    if (this.rowData.submitType === 'modifyMenu') {
                        this.modifyMenu(submitFormData)
                    }
                    if (this.rowData.submitType === 'addMenu') {
                        this.addMenu(submitFormData);
                    }
                    this.closeModiyMenu(true);
                }

            });

        },
        async modifyMenu(params) {
            await this.$api.modifyMenu(params);
            this.$message({
                message: "更新菜单数据成功",
                type: "success",
            });
        },
        async addMenu(params) {
            await this.$api.addMenu(params);
            this.$message({
                message: "新增菜单数据成功",
                type: "success",
            });
        },
        //清空form数据
        resetForm() {
            this.rowData = {};
        },
    }
};
</script>

<style lang="less" scoped>
.main-select-el-tree .el-tree-node .is-current>.el-tree-node__content {
    font-weight: bold;
    color: #409eff;
}

.main-select-el-tree .el-tree-node.is-current>.el-tree-node__content {
    font-weight: bold;
    color: #409eff;
}
</style>
