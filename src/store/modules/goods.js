import { reqGoodsList, reqGoodsCount } from '../../utils/request'

const state = {
    list: [],
    total: 0,
    size: 2,
    page: 1,
}

const mutations = {
    mList(state, arr) {
        state.list = arr;
    },
    mPage(state, num) {
        state.page = num;
    },
    mTotal(state, num) {
        state.total = num;
    }
}

const actions = {
    aList(context) {
        reqGoodsList({ size: context.state.size, page: context.state.page }).then(res => {
            let list = res.data.list ? res.data.list : [];
            if (context.state.page > 1 && list.length == 0) {
                context.commit("mPage", context.state.page - 1)
                context.dispatch("aList")
                return;
            }
            context.commit('mList', list)
        })
    },
    aPage(context, num) {
        context.commit('mPage', num)
        context.dispatch('aList')
    },
    aTotal(context) {
        reqGoodsCount().then(res => {
            context.commit('mTotal', res.data.list[0].total)
        })
    }
}

const getters = {
    list(state) {
        return state.list;
    },
    total(state) {
        return state.total;
    },
    size(state) {
        return state.size;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true,
}