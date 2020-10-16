<template>
  <div>
    <el-dialog title="编辑会员" :visible.sync="info.isShow" width="60%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
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
        <el-button @click="cancle()">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="edit()" v-else>修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqMemberInfo, reqMemberEdit } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        nikcname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "member/list",
    }),
  },
  methods: {
    ...mapActions({
      aList: "member/aList",
    }),

    checkedData() {
      if (
        this.form.nickname == "" ||
        this.form.phone == "" ||
        this.form.password == ""
      ) {
        warningAlert("信息不能为空");
        return false;
      }
      let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      if (!reg.test(this.form.phone)) {
        warningAlert("请填写正确手机号码");
        return false;
      }
      if (!(/^[a-zA-Z0-9_]{3,16}$/).test(this.form.nickname)) {
        warningAlert("请输入3到16位字符");
        return false;
      }
      return true;
    },
    edit() {
      if (!this.checkedData()) {
        return;
      }
      reqMemberEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancle();
          this.aList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    oneDetail(uid) {
      reqMemberInfo(uid).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
        this.form.uid = uid;
      });
    },
    cancle() {
      this.info.isShow = false;
    },
  },
  mounted() {
    this.aList();
  },
};
</script>
<style scoped>
.file_img {
  width: 150px;
  height: 150px;
  border: 1px black dashed;
  position: relative;
}
.file_img i {
  font-size: 40px;
  font-weight: 100;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.file_img .up_img {
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: absolute;
  opacity: 0;
  left: 0;
  top: 0;
}
.file_img .img {
  width: 100%;
  height: 100%;
}
</style>