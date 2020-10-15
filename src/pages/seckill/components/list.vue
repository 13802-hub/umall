<template>
  <div style="">
    <el-table
      :data="list"
      style="width: auto; display: inline-block"
      row-key="id"
      border
      lazy
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="title" label="活动名称" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="success" disabled
            >启用</el-button
          >
          <el-button v-else type="info" disabled>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @del="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqSeckDel } from "../../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "seckill/list",
    }),
  },
  methods: {
    ...mapActions({
      aList: "seckill/aList",
    }),

    //编辑菜单,子传父
    edit(id) {
      this.$emit("edit", id);
    },

    //删除菜单
    del(id) {
      reqSeckDel(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.aList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.aList();
  },
};
</script>
<style scoped>
</style>