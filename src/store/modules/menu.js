
import { reqMenuList } from '../../utils/request'

const state = {
    list: [],
}

const mutations = {
    mList(state, arr) {
        state.list = arr;
    }
}

const actions = {
    aList(context) {
        reqMenuList().then((res) => {
            context.commit('mList', res.data.list)
        })
    }
}

const getters = {
    list(state) {
        return state.list;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true,
}