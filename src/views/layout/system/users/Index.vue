<template>
  <div class="header">
    <!-- 表头搜索框 -->
    <div class="from">
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input
            v-model="formData.username"
            placeholder="用户名"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="formData.createTime"
            type="date"
            placeholder="选择日期"
            size="small"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="onQuerySubmit"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <!-- 按钮 -->
    <div class="groupButton">
      <el-row>
        <el-button
          size="small"
          type="warning"
          icon="el-icon-plus"
          @click="addUserSubmit"
          >添加用户</el-button
        >
        <el-button size="small" icon="el-icon-delete" type="danger"
          >批量删除</el-button
        >
      </el-row>
    </div>

    <!-- 列表 -->
    <div class="content">
      <el-table
        border
        :data="accountUserData"
        tooltip-effect="dark"
        style="width: 100%"
        header-row-class-name="headerRowClass"
        cell-class-name="cellClass"
        header-cell-class-name="headerCellClass"
      >
        <el-table-column type="selection" width="55"> </el-table-column>

        <el-table-column fixed label="创建日期" width="180">
          <template slot-scope="scope">{{
            scope.row.createTime | fmtDataTime
          }}</template>
        </el-table-column>
        <el-table-column prop="lastLoginTime" label="登录日期" width="180">
          <template slot-scope="scope">{{
            scope.row.lastLoginTime | fmtDataTime
          }}</template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" show-overflow-tooltip />
        <el-table-column label="状态" show-overflow-tooltip>
          <template slot-scope="scope">{{
            scope.row.status === "NORMAL"
              ? "正常"
              : scope.row.status === "FREEZE"
              ? "冻结"
              : "删除"
          }}</template>
        </el-table-column>
        <el-table-column prop="email" label="注册邮箱" show-overflow-tooltip />
        <el-table-column prop="phone" label="手机号" show-overflow-tooltip />
        <el-table-column prop="loginIp" label="登录IP" show-overflow-tooltip />
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页视图 -->
    <div>
      <PaginationPage
        :pageNum="formData.pageNum"
        :pageSize="formData.pageSize"
        :total="total"
        @changePageNum="changePageNum"
      ></PaginationPage>
    </div>
  </div>
</template>

<script>
import PaginationPage from "@/components/PaginationPage.vue";

export default {
  components: {
    PaginationPage,
  },
  data() {
    return {
      formData: {
        username: "",
        createTime: "",
        pageNum: 1,
        pageSize: 1,
      },
      accountUserData: [],
      total: 0,
    };
  },
  methods: {
    async onQuerySubmit() {
      console.log(this.formData);
      const res = await this.$api.accountUserQueryPage(this.formData);
      if (res.data.code === 200) {
        this.accountUserData = res.data.content.list;
        this.setPageChange(res.data.content);
      }
    },
    addUserSubmit() {
      this.$router.push("addUser");
    },
    setPageChange(accountUserData) {
      this.total = accountUserData.pages;
      this.pageNum = accountUserData.startRow;
    },
    changePageNum(val) {
      this.formData.pageNum = val;
      this, this.onQuerySubmit();
    },
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
}
</style>