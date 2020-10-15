<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="商品编号"> </el-table-column>
      <el-table-column prop="goodsname" label="商品名称"> </el-table-column>
      <el-table-column label="商品价格">
        <template slot-scope="scope">
          <span>${{ scope.row.price | filterPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="市场价格">
        <template slot-scope="scope">
          <span>${{ scope.row.market_price | filterPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="http + scope.row.img" alt="" />
        </template>
      </el-table-column>

      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew == 1">是</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot == 1">是</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)"
            >编 辑</el-button
          >
          <del-btn @del="del(scope.row.id)"></del-btn>
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
import { reqDelGoods } from "../../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
      total: "goods/total",
      size: "goods/size",
    }),
  },
  methods: {
    ...mapActions({
      aList: "goods/aList",
      aTotal: "goods/aTotal",
      aPage: "goods/aPage",
    }),
    //编辑 子传父
    edit(id) {
      this.$emit("edit", id);
    },
    //删除一条管理员数据
    del(id) {
      reqDelGoods(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.aList();
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
    this.aList();
    this.aTotal();
  },
};
</script>
<style >
.right {
  position: absolute;
  right: 0;
}

img {
  width: 80px;
  height: 80px;
}
</style>