import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import { state, mutations, getters } from './mutations'
import actions from './actions'

import menu from './modules/menu'
import role from './modules/role'
import manage from './modules/manage'
import cate from './modules/cate'
import specs from './modules/specs'
import goods from './modules/goods'
import member from './modules/member'
import banner from './modules/Banner'
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules: {
        menu,
        role,
        manage,
        cate,
        specs,
        goods,
        member,
        banner,
    }
})