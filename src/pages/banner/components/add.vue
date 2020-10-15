<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加轮播图' : '编辑轮播图'"
      :visible.sync="info.isShow"
      width="60%"
      @closed="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <up-img :info="info" :imgUrl="imgUrl" @getFile="getFile"></up-img>
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
        <el-button type="primary" @click="edit()" v-else>编 辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqBannerAdd,
  reqBannerInfo,
  reqBannerEdit,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        title: "",
        img: null,
        status: 1,
      },
      imgUrl: "",
    };
  },
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    ...mapActions({
      aList:'banner/aList'
    }),

    checkedData() {
      if (this.form.title == "") {
        warningAlert("分类名称不能为空");
        return false;
      }

      if (this.form.img === null) {
        warningAlert("图片不能为空");
        return false;
      }
      return true;
    },
    edit() {
      if (!this.checkedData()) {
        return;
      }
      console.log(this.form);
      reqBannerEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancle();
          this.empty();
          this.aList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    oneDetail(id) {
      reqBannerInfo(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imgUrl = this.http + this.form.img;
      });
    },
    close() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },

    add() {
      if (!this.checkedData()) {
        return;
      }
      reqBannerAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancle();
          this.aList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    empty() {
      this.form = { title: "", img: null, status: 1 };
      this.imgUrl = "";
    },
    cancle() {
      this.info.isShow = false;
    },
    getFile(e) {
      let file = e.target.files[0];
      let imgExtArr = [".jpg", ".png", ".jpeg", ".gif"];
      let extName = file.name.slice(file.name.lastIndexOf("."));
      if (!imgExtArr.some((item) => extName == item)) {
        warningAlert("请上传正确格式的图片");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        warningAlert("上传图片不能超过2M");
        return;
      }

      this.form.img = file;
      this.imgUrl = URL.createObjectURL(file);
    },
  },
  mounted() {
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