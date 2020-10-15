import Vue from 'vue';

import delBtn from './delBtn.vue';
import upImg from './upImg.vue'
let obj = {
    delBtn,
    upImg,
}

for (let i in obj) {
    Vue.component(i, obj[i])
}