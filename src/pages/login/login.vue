<template>
  <div class="login-wrap">
    <div class="form">
      <h2 class="center">登录</h2>
      <div class="line">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </div>
      <div class="line">
        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
      </div>
      <div class="line center">
        <el-button type="primary" @click="login()">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../utils/alert";
import { reqUserLogin } from "../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      aUserInfo: "aUserInfo",
    }),
    login() {
      reqUserLogin(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.aUserInfo(res.data.list);
          this.$router.push('/')
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.login-wrap {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553443, #303d60);
  position: relative;
}
.form {
  width: 400px;
  height: 250px;
  padding: 20px 30px;
  border-radius: 20px;
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 50%;
  background: #fff;
  transform: translate(-50%, -50%);
}
.el-button {
  width: 300px;
}
.center {
  text-align: center;
}
.line {
  margin: 30px auto;
}
</style>