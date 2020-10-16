<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加管理员' : '编辑管理员'"
      :visible.sync="info.isShow"
      width="60%"
      @closed="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属角色">
          <el-select v-model="form.roleid">
            <el-option label="请选择" :value="0" disabled></el-option>
            <el-option
              v-for="item in listRole"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
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
        <el-button type="danger" @click="cancle()">取 消</el-button>
        <el-button type="primary" v-if="this.info.isAdd" @click="add()"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="editDetail()">编 辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqUserAdd, reqUserDetail, reqUserEdit } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        roleid: 0,
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      listRole: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      aListRole: "role/aList",
      aListUser: "manage/aList",
      aTotal: "manage/aTotal",
    }),
    //清空弹框
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },

    checkedData() {
      if (this.form.roleid == 0) {
        warningAlert("请选择管理员角色");
        return false;
      }

      return true;
    },
    //添加管理员
    add() {
      if (!this.checkedData()) {
        return;
      }
      if (this.form.username == "" || this.form.password == "") {
        warningAlert("账户或密码不能为空");
        return false;
      }
      reqUserAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancle();
          this.aListUser();
          this.aTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //修改一条管理员数据
    editDetail() {
      if (!this.checkedData()) {
        return;
      }
      if (this.form.username == "") {
        warningAlert("账户不能为空");
        return false;
      }
      reqUserEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancle();
          this.aListUser();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //查询一条管理员数据
    oneDetail(uid) {
      reqUserDetail(uid).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.password = "";
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //弹框消失
    cancle() {
      this.info.isShow = false;
    },
    //判断是否清空弹框
    close() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
  },
  mounted() {
    if (this.listRole.length == 0) {
      this.aListRole();
    }
  },
};
</script>
<style scoped>
</style>