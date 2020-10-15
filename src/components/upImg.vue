<template>
  <div class="file_img">
    <i>+</i>
    <img class="img" :src="imgUrl" alt="" />
    <input v-if="info.isShow" class="up_img" type="file" @change="getFile" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info", "imgUrl"],
  methods: {
    getFile(e) {
      this.$emit("getFile",e)
    },
  },
};
</script>
<style>
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