<template>
  <div>
    <el-button type="primary" @click="show()">添加</el-button>
    <v-add :info="info" ref="add"></v-add>
    <v-list @edit="edit"></v-list>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list";
import vAdd from "./components/add";
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
    show() {
      this.info.isAdd = true;
      this.info.isShow = true;
    },
    edit(id) {
      this.info.isShow = true;
      this.info.isAdd = false;
      this.$refs.add.oneDetail(id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>