<template>
  <div>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPageNum"
      :page-size="currentPage"
      layout="total, prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    pageNum: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 5,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      currentPage: this.pageSize,
      currentPageNum: this.pageNum,
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit("changePageNum", val);
    },
  },
};
</script>

<style lang="less" scoped>
</style>