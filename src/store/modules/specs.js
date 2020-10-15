
import { reqSpecsCount, reqSpecsList } from '../../utils/request'

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
    mTotal(state, num) {
        state.total = num;
    },
    mPage(state, num) {
        state.page = num;
    }
}

const actions = {
    aList(context, bool) {
        let params = bool ? {} : { page: context.state.page, size: context.state.size }
        reqSpecsList(params).then(res => {
            let list = res.data.list ? res.data.list : []
            if (context.state.page > 1 && list.length == 0) {
                context.commit('mPage', context.state.page - 1);
                context.dispatch('aList');
                return;
            }
            list.forEach(item => item.attrs = JSON.parse(item.attrs))
            context.commit('mList', list)
        })
    },
    aPage(context, num) {
        context.commit('mPage', num)
        context.dispatch('aList')
    },
    aTotal(context) {
        reqSpecsCount().then(res => {
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