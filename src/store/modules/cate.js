
import { reqCateList } from '../../utils/request'
const state = {
    list: [],
}

const mutations = {
    mList(state, arr) {
        state.list = arr
    }
}

const actions = {
    aList(context, pid) {
        reqCateList(pid).then(res => {
            let list = res.data.list ? res.data.list : []
            context.commit('mList', list)
        })
    }
}

const getters = {
    list(state) {
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true,
}