<template>
  <div>
    <div id="main"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      alist: "cate/aList",
    }),
  },
  mounted() {
    this.alist();
  },
  watch: {
    list: {
      handler() {
        if (this.list.length > 0) {
          var echarts = require("echarts");
          var myChart = echarts.init(document.getElementById("main"));
          myChart.setOption({
            title: {
              text: "商品分类",
            },
            tooltip: {},
            legend: {
              data: ["下级分类数量"],
            },
            xAxis: {
              data: this.list.map((item) => item.catename),
            },
            yAxis: {},
            series: [
              {
                name: "商品分类",
                type: "line",
                data: this.list.map((item) =>
                  item.children ? item.children.length : 0
                ),
              },
            ],
          });
        }
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
#main {
  width: 800px;
  height: 400px;
  margin: 0 auto;
}
</style>