<template>
  <el-button type="danger" @click="del()">删除</el-button>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    del() {
      this.$confirm("是否删除此菜单?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonClass:'el-button el-button--danger',
        type: "warning",
      })
        .then(() => {
          this.$emit("del");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style scoped>
</style>