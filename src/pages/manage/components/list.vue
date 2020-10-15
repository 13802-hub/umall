<template>
  <div>
    <el-table :data="listUser" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)"
            >编 辑</el-button
          >
          <del-btn @del="del(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    <div class="right">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="size"
        @current-change="changePage"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqDelUser } from "../../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      listUser: "manage/list",
      total: "manage/total",
      size: "manage/size",
    }),
  },
  methods: {
    ...mapActions({
      aListUser: "manage/aList",
      aTotal: "manage/aTotal",
      aPage: "manage/aPage",
    }),
    //编辑 子传父
    edit(uid) {
      this.$emit("edit", uid);
    },
    //删除一条管理员数据
    del(uid) {
      reqDelUser(uid).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.aListUser();
          this.aTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    changePage(e) {
      this.aPage(e);
    },
  },
  mounted() {
    this.aListUser();
    this.aTotal();
  },
};
</script>
<style >
.right {
  position: absolute;
  right: 0;
}
</style>