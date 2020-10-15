<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加商品管理' : '编辑商品管理'"
      :visible.sync="info.isShow"
      width="60%"
      @closed="close"
      @opened="opened"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="一级分类">
          <el-select v-model="form.first_cateid" @change="changeFirst()">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in listCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>

        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <!-- <div class="file_img">
            <i>+</i>
            <img class="img" :src="imgUrl" alt="" />
            <input
              v-if="info.isShow"
              class="up_img"
              type="file"
              @change="getFile"
            />
          </div> -->
          <up-img :info="info" :imgUrl="imgUrl" @getFile="getFile"></up-img>
        </el-form-item>
        <el-form-item label="商品规格">
          <el-select v-model="form.specsid" @change="changeSpecs()">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in listSpecs"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品属性">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in secondSpecsArr"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品">
          <el-radio v-model="form.isnew" :label="1"> 是 </el-radio>
          <el-radio v-model="form.isnew" :label="2"> 否 </el-radio>
        </el-form-item>
        <el-form-item label="是否热卖">
          <el-radio v-model="form.ishot" :label="1"> 是 </el-radio>
          <el-radio v-model="form.ishot" :label="2"> 否 </el-radio>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item label="商品描述">
          <!-- <textarea v-model="form.description"></textarea> -->
          <div id="editor" v-if="info.isShow"></div>
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
import E from "wangeditor";
import { mapGetters, mapActions } from "vuex";
import {
  reqCateList,
  reqGoodsAdd,
  reqGoodsInfo,
  reqGoodsEdit,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      secondCateList: [],
      secondSpecsArr: [],
      imgUrl: "",
    };
  },
  computed: {
    ...mapGetters({
      listCate: "cate/list",
      listSpecs: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      aListCate: "cate/aList",
      aListSpecs: "specs/aList",
      aListGoods: "goods/aList",
      aTotal: "goods/aTotal",
      aPage: "goods/aPage",
    }),

    opened() {
      this.editor = new E("#editor");
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },
    //获取二级分类
    getSecondList() {
      reqCateList(this.form.first_cateid).then((res) => {
        this.secondCateList = res.data.list;
      });
    },
    //一级分类
    changeFirst() {
      this.form.second_cateid = "";
      this.getSecondList();
    },

    //商品规格
    changeSpecs() {
      this.form.specsattr = [];
      this.getSecondArr();
    },
    //规格属性
    getSecondArr() {
      this.secondSpecsArr = this.listSpecs.find(
        (item) => item.id == this.form.specsid
      ).attrs;
    },
    //清空弹框
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.secondCateList = [];
      this.secondSpecsArr = [];
      this.imgUrl = "";
    },

    checkedData() {
      if (this.form.first_cateid == "" || this.second_cateid == "") {
        warningAlert("商品分类不能为空");
        return false;
      }

      if (
        this.form.goodsname == "" ||
        this.form.price == "" ||
        this.form.market_price == ""
      ) {
        warningAlert("商品名称或价格不能为空");
        return false;
      }

      if (this.form.img == null) {
        warningAlert("图片不能为空");
        return false;
      }

      if (this.form.specsid == "" || this.form.specsattr == []) {
        warningAlert("商品规格不能为空");
        return false;
      }
      if (this.form.description == "") {
        warningAlert("商品描述不能为空");
        return false;
      }
      return true;
    },
    //添加商品
    add() {
      this.form.description = this.editor.txt.html();
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      if (!this.checkedData()) {
        return;
      }
      // console.log(data);
      reqGoodsAdd(data).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancle();
          this.aListGoods();
          this.aTotal();
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
      this.form.description = this.editor.txt.html();
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      reqGoodsEdit(data).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancle();
          this.aListGoods();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //查询一条数据
    oneDetail(id) {
      reqGoodsInfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.getSecondList();
          this.form.id = id;
          this.form.specsattr = JSON.parse(this.form.specsattr);
          this.imgUrl = this.http + this.form.img;
          this.getSecondArr();
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
    if (this.listCate.length == 0) {
      this.aListCate();
    }
    if (this.listCate.length == 0) {
      this.aListSpecs(true);
    }
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