<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加商品规格' : '编辑商品规格'"
      :visible.sync="info.isShow"
      @closed="close"
      width="60%"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="规格名称">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>

        <el-form-item
          label="规格属性"
          v-for="(item, index) in attrArr"
          :key="index"
        >
          <div class="input_wrap">
            <el-input v-model="item.value"></el-input>
            <el-button type="primary" v-if="index == 0" @click="addInput()"
              >新增规格属性</el-button
            >
            <el-button type="danger" v-else @click="delInput(index)"
              >删除</el-button
            >
          </div>
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
import { successAlert, warningAlert } from "../../../utils/alert";
import {
  reqSpecsAdd,
  reqSpecsDetail,
  reqSpecsEdit,
} from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      attrArr: [{ value: "" }, { value: "" }],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      aList: "specs/aList",
      aTotal: "specs/aTotal",
    }),
    close() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },

    addInput() {
      this.attrArr.push({ value: "" });
    },
    delInput(index) {
      this.attrArr.splice(index, 1);
    },

    checkedData() {
      if (this.form.specsname == "") {
        warningAlert("规格名称不能为空");
        return false;
      }

      if (this.attrArr.some((item) => item.value == "")) {
        warningAlert("规格属性不能为空");
        return false;
      }
      return true;
    },
    //添加数据
    add() {
      if (!this.checkedData()) {
        return;
      }
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      reqSpecsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.aList();
          this.aTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //弹框消失
    cancel() {
      this.info.isShow = false;
    },

    //初始化添加列表
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.attrArr = [{ value: "" }, { value: "" }];
    },
    //获取一条数据,使其在编辑菜单显示
    oneDetail(id) {
      reqSpecsDetail(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list[0];
          this.attrArr = JSON.parse(this.form.attrs).map((item) => ({
            value: item,
          }));
          this.form.id = id;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //修改一条数据
    editDetail() {
      if (!this.checkedData()) {
        return;
      }
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      reqSpecsEdit(this.form).then((res) => {
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
};
</script>
<style scoped>
.input_wrap {
  display: flex;
}

.input_wrap button {
  flex: 1;
}
</style>