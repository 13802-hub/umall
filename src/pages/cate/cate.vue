<template>
  <div>
    <el-button type="primary" @click="show()">添加</el-button>
    <v-list @edit="edit"> </v-list>
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";

import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {
    vList,
    vAdd,
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
    edit(id) {
      this.info.isShow = true;
      this.info.isAdd = false;
      this.$refs.add.oneDetail(id);
    },
    show() {
      this.info.isShow = true;
      this.info.isAdd = true;
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>