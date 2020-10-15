<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="info.isShow"
      @closed="close"
      width="60%"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select
            v-model="form.pid"
            @change="changePid()"
            placeholder="请选择上级菜单"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单地址" v-if="form.type == 2">
          <el-select v-model="form.url" placeholder="请选择菜单地址">
            <el-option
              v-for="item in listRouter"
              :key="item.path"
              :label="item.name"
              :value="'/' + item.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单图标" v-else>
          <el-select v-model="form.icon" placeholder="请选择图标">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
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
        <el-button type="primary" v-if="info.isAdd" @click="add()"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="editDetail()">编 辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { listRouter } from "../../../router/index";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqMenuAdd, reqMenuDetail, reqMenuEdit } from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      listRouter,
      icons: [
        "el-icon-setting",
        "el-icon-goods",
        "el-icon-user",
        "el-icon-star-off",
      ],
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      aList: "menu/aList",
    }),
    close() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },

    checkedData() {
      if (this.form.pid == 0 && this.form.icon == "") {
        warningAlert("菜单图标不能为空");
        return false;
      }

      if (this.form.pid != 0 && this.form.url == "") {
        warningAlert("菜单地址不能为空");
        return false;
      }
      return true;
    },
    //添加数据
    add() {
      if (!this.checkedData()) {
        return;
      }
      reqMenuAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.aList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //弹框消失
    cancel() {
      this.info.isShow = false;
    },
    //菜单类型
    changePid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    //初始化添加列表
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    //获取一条数据,使其在编辑菜单显示
    oneDetail(id) {
      reqMenuDetail(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    //修改一条数据
    editDetail() {
      if (!this.checkedData()) {
        return;
      }
      reqMenuEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.aList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>