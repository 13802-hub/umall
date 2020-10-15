<template>
  <div>
    <el-button type="primary" @click="show()">添加</el-button>
    <v-add :info="info" ref="add"></v-add>
    <v-list @edit="edit"></v-list>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  props: [],
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info: {
        isShow: false,
        isAdd: true,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    // 添加控制显示
    show() {
      this.info.isShow = true;
      this.info.isAdd = true;
    },

    //编辑
    edit(e) {
      this.info.isAdd = false;
      this.info.isShow = true;
      this.$refs.add.oneDetail(e);
    },
  },
};
</script>
<style scoped>
</style>