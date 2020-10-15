<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加角色' : '编辑角色'"
      :visible.sync="info.isShow"
      width="60%"
      @closed="close"
    >
      <el-form :model="form" ref="form" label-width="100px">
        <el-form-item label="角色名称">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
        <el-form-item label="权限管理">
          <el-tree
            ref="tree"
            :data="listMenu"
            show-checkbox
            node-key="id"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="this.info.isAdd"
          >确 定</el-button
        >
        <el-button type="primary" v-else @click="edit()">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqRoleAdd, reqRoleDetail, reqRoleEdit } from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        rolename: "",
        menus: "[]",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      listMenu: "menu/list",
      listRole: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      aListMenu: "menu/aList",
      alistRole: "role/aList",
    }),

    checkedData() {
      if (this.form.rolename == "") {
        warningAlert("角色名称不能为空");
        return false;
      }
      return true;
    },

    //修改
    edit() {
      if (!this.checkedData()) {
        return;
      }
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.alistRole();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取一条数据
    oneDetail(id) {
      reqRoleDetail(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
        console.log(this.form.menus);
      });
    },

    //清空form
    empty() {
      this.form = {
        rolename: "",
        menus: "[]",
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    //判断是否为修改清空添加
    close() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //弹框消失
    cancel() {
      this.info.isShow = false;
    },
    //添加角色
    add() {
      if (!this.checkedData()) {
        return;
      }
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.alistRole();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.aListMenu();
  },
};
</script>
<style scoped>
</style>