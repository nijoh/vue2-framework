<template>

  <div class="content">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="aginPassword">
        <el-input type="password" v-model="ruleForm.aginPassword"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="gender">
        <el-select v-model="ruleForm.gender" placeholder="请选择性别">
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          :loading="!isSubmit"
          @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.password !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validateAaginPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        email: "",
        username: "",
        password: "",
        aginPassword: "",
        name: "",
        gender: "",
        phone: "",
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 15, message: "最大长度15", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          { max: 15, message: "最大长度15", trigger: "blur" },
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        aginPassword: [{ validator: validateAaginPass, trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "手机号输入有误", trigger: "blur" },
        ],
      },
      isSubmit: true,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        this.requestFrom();
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async requestFrom() {
      //禁用提交按钮
      this.isSubmit = false;
      //拷贝对象
      const fromData = Object.assign({}, this.ruleForm);
      //删除再次确认密码的属性
      delete fromData.aginPassword;
      console.log(fromData);
      const rsult = await this.$api.accountUserAddUser(fromData);
      if (rsult.data.code === 200) {
        this.$message({
          message: "新增用户保存成功",
          type: "success",
        });
        //清空表单
        this.resetForm("ruleForm");
      }
      //提交按钮可用
      this.isSubmit = true;
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
}
</style>