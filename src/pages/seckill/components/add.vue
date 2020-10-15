<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加活动' : '编辑活动'"
      :visible.sync="info.isShow"
      @closed="close"
      width="60%"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="时间期限">
          <div class="block">
            <el-date-picker
              v-model="time"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="getTime"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="一级分类">
          <el-select v-model="form.first_cateid" @change="getSecondList">
            <el-option label="请选择分类" value="" disabled></el-option>
            <el-option
              v-for="item in listCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" @change="getGoodsList">
            <el-option label="请选择分类" value="" disabled></el-option>
            <el-option
              v-for="item in secondList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品">
          <el-select v-model="form.goodsid">
            <el-option label="请选择商品" value="" disabled></el-option>
            <el-option
              v-for="item in goodsList"
              :key="item.path"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
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
import { successAlert, warningAlert } from "../../../utils/alert";
import {
  reqSeckAdd,
  reqSeckInfo,
  reqSeckEdit,
  reqCateList,
  reqGoodsList,
} from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      time: [],
      secondList: [],
      goodsList: [],
    };
  },
  computed: {
    ...mapGetters({
      list: "seckill/list",
      listCate: "cate/list",
      listGoods: "goods/list",
    }),
  },
  methods: {
    ...mapActions({
      aList: "seckill/aList",
      aListCate: "cate/aList",
      aListGoods: "goods/aList",
    }),
    close() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },

    //````````````````````````````````````````````

    getTime() {
      this.form.begintime = this.time[0].getTime();
      this.form.endtime = this.time[1].getTime();
    },

    getCate() {
      reqCateList(this.form.first_cateid).then((res) => {
        this.secondList = res.data.list;
      });
    },

    getSecondList() {
      this.form.second_cateid = "";
      this.secondList = [];
      this.getCate();
    },

    getGoods() {
      reqGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        this.goodsList = res.data.list;
      });
    },

    getGoodsList() {
      this.form.goodsid = "";
      this.goodsList = [];
      this.getGoods();
    },
    //`````````````````````````````````````
    checkedData() {
      return true;
    },
    //添加数据
    add() {
      if (!this.checkedData()) {
        return;
      }
      reqSeckAdd(this.form).then((res) => {
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

    //初始化添加列表
    empty() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.time = "";
      this.secondList = [];
      this.goodsList = [];
    },
    //获取一条数据,使其在编辑菜单显示
    oneDetail(id) {
      reqSeckInfo(id).then((res) => {
        this.form = res.data.list;
        this.getCate();
        this.getGoods();
        this.time = [
          new Date(parseInt(this.form.begintime)),
          new Date(parseInt(this.form.endtime)),
        ];
        this.form.id = id;
      });
    },
    //修改一条数据
    editDetail() {
      if (!this.checkedData()) {
        return;
      }
      if (this.time.length != 0) {
        this.getTime();
      }
      console.log(this.form);
      reqSeckEdit(this.form).then((res) => {
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
  mounted() {
    if (this.listCate.length == 0) {
      this.aListCate();
    }
  },
};
</script>
<style scoped>
</style>