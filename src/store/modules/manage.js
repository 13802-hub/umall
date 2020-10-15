
import { reqUserList, reqUserCount } from '../../utils/request'
const state = {
    list: [],
    page: 1,    //页码
    total: 0,    //总数
    size: 2,    //一页页数
};

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
};

const actions = {
    aList(context) {
        reqUserList({ size: context.state.size, page: context.state.page }).then(res => {
            let list = res.data.list ? res.data.list : [];
            if (context.state.page > 1 && list.length == 0) {
                context.commit('mPage', context.state.page - 1);
                context.dispatch('aList');
                return;
            }
            context.commit('mList', list)
        })
    },
    aTotal(context) {
        reqUserCount().then(res => {
            // console.log(res.data.list[0].total);
            context.commit('mTotal', res.data.list[0].total)
        })
    },
    aPage(context, page) {
        context.commit('mPage', page)
        context.dispatch('aList')
    }
};

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
};

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true,
}