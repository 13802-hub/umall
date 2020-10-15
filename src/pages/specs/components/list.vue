<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column label="规格属性">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.attrs" :key="item">{{
            item
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary" disabled
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
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqDelMenu, reqDelSpecs } from "../../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "specs/list",
      total: "specs/total",
      size: "specs/size",
    }),
  },
  methods: {
    ...mapActions({
      aList: "specs/aList",
      aTotal: "specs/aTotal",
      aPage: "specs/aPage",
    }),

    changePage(e) {
      this.aPage(e);
    },

    //编辑菜单,子传父
    edit(id) {
      this.$emit("edit", id);
    },

    //删除菜单
    del(id) {
      reqDelSpecs(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.aList();
          this.aTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.aList();
    this.aTotal();
  },
};
</script>
<style scoped>
</style>