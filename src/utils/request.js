import axios from 'axios';
import qs from 'qs';
import Vue from 'vue';
import store from '../store'
import router from '../router'
import { warningAlert } from '../utils/alert'


let baseUrl = '/api';
Vue.prototype.http = 'http://localhost:3000';

// let baseUrl = '';
// Vue.prototype.http = '';

axios.interceptors.response.use(res => {
    console.group('请求接口为:' + res.config.url)
    console.log(res);
    console.groupEnd();
    if (res.data.msg == '登录已过期或访问权限受限') {
        warningAlert('登录已过期或访问权限受限');
        router.push('/login')
    }

    return res;
})


axios.interceptors.request.use(req => {
    if (req.url != '/api/userLogin') {
        req.headers.authorization = store.state.userInfo.token;
    }
    return req;
})

//**************菜单管理***************/
//添加菜单
export const reqMenuAdd = (params) => {
    return axios({
        url: baseUrl + '/api/menuadd',
        method: 'post',
        data: qs.stringify(params),
    })
}
//获取菜单
export const reqMenuList = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        params: {
            istree: true
        }
    })
}

//删除菜单

export const reqDelMenu = (id) => {
    return axios({
        url: baseUrl + '/api/menudelete',
        method: 'post',
        data: {
            id,
        }
    })
}


//获取一条菜单信息

export const reqMenuDetail = (id) => {
    return axios({
        url: baseUrl + '/api/menuinfo',
        params: {
            id,
        }
    })
}


//菜单编辑

export const reqMenuEdit = (params) => {
    return axios({
        url: baseUrl + '/api/menuedit',
        method: 'post',
        data: qs.stringify(params),
    })
}


//**************角色管理***************/

//添加角色
export const reqRoleAdd = (params) => {
    return axios({
        url: baseUrl + '/api/roleadd',
        method: 'post',
        data: qs.stringify(params),
    })
}
//获取角色列表
export const reqRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
    })
}

//删除角色

export const reqDelRole = (id) => {
    return axios({
        url: baseUrl + '/api/roledelete',
        method: 'post',
        data: qs.stringify({
            id,
        })
    })
}


//获取一条角色信息

export const reqRoleDetail = (id) => {
    return axios({
        url: baseUrl + '/api/roleinfo',
        params: {
            id,
        }
    })
}


//角色修改

export const reqRoleEdit = (params) => {
    return axios({
        url: baseUrl + '/api/roleedit',
        method: 'post',
        data: qs.stringify(params),
    })
}




//**************管理员管理***************/

//添加管理员
export const reqUserAdd = (params) => {
    return axios({
        url: baseUrl + '/api/useradd',
        method: 'post',
        data: qs.stringify(params),
    })
}
//获取管理员列表
export const reqUserList = (params) => {
    return axios({
        url: baseUrl + "/api/userlist",
        params: params
    })
}

// 获取管理员列表总数
export const reqUserCount = () => {
    return axios({
        url: baseUrl + '/api/usercount'
    })
}
//删除管理员

export const reqDelUser = (uid) => {
    return axios({
        url: baseUrl + '/api/userdelete',
        method: 'post',
        data: qs.stringify({
            uid,
        })
    })
}


//获取一条管理员信息

export const reqUserDetail = (uid) => {
    return axios({
        url: baseUrl + '/api/userinfo',
        params: {
            uid,
        }
    })
}


//管理员修改

export const reqUserEdit = (params) => {
    return axios({
        url: baseUrl + '/api/useredit',
        method: 'post',
        data: qs.stringify(params),
    })
}

//管理员登录

export const reqUserLogin = (params) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: 'post',
        data: params,
    })
}


//**************商品分类管理***************/

//添加商品分类
export const reqCateAdd = (params) => {
    let data = new FormData();
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + '/api/cateadd',
        method: 'post',
        data: data,
    })
}
//获取商品分类列表
export const reqCateList = (pid) => {
    return axios({
        url: baseUrl + "/api/catelist",
        params:
        {
            pid,
            istree: true,
        }
    })
}




//获取一条商品分类信息

export const reqCateDetail = (id) => {
    return axios({
        url: baseUrl + '/api/cateinfo',
        params: {
            id,
        }
    })
}


//商品分类修改

export const reqCateEdit = (params) => {
    let data = new FormData();
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + '/api/cateedit',
        method: 'post',
        data: data,
    })
}

//删除商品分类

export const reqDelCate = (id) => {
    return axios({
        url: baseUrl + '/api/catedelete',
        method: 'post',
        data: qs.stringify({
            id,
        })
    })
}



//**************商品规格管理***************/

//添加商品规格
export const reqSpecsAdd = (params) => {
    return axios({
        url: baseUrl + '/api/specsadd',
        method: 'post',
        data: qs.stringify(params),
    })
}
//获取规格列表
export const reqSpecsList = (params) => {
    return axios({
        url: baseUrl + "/api/specslist",
        params: params
    })
}

// 获取规格列表总数
export const reqSpecsCount = () => {
    return axios({
        url: baseUrl + '/api/specscount'
    })
}
//删除规格

export const reqDelSpecs = (id) => {
    return axios({
        url: baseUrl + '/api/specsdelete',
        method: 'post',
        data: qs.stringify({
            id,
        })
    })
}


//获取一条规格信息

export const reqSpecsDetail = (id) => {
    return axios({
        url: baseUrl + '/api/specsinfo',
        params: {
            id,
        }
    })
}


//规格修改

export const reqSpecsEdit = (params) => {
    return axios({
        url: baseUrl + '/api/specsedit',
        method: 'post',
        data: qs.stringify(params),
    })
}



/*****************商品管理******************/


//商品添加
export const reqGoodsAdd = (params) => {
    let data = new FormData();
    for (let i in params) {
        data.append(i, params[i]);
    }
    return axios({
        url: baseUrl + '/api/goodsadd',
        method: 'post',
        data: data,
    })
}

//商品总数 分页

export const reqGoodsCount = (params) => {
    return axios({
        url: baseUrl + '/api/goodscount',
        params: params,
    })
}
//商品列表

export const reqGoodsList = (params) => {
    return axios({
        url: baseUrl + '/api/goodslist',
        params: params
    })
}


//商品获取 一条

export const reqGoodsInfo = (id) => {
    return axios({
        url: baseUrl + '/api/goodsinfo',
        params: {
            id,
        }
    })
}


//商品修改

export const reqGoodsEdit = (params) => {
    let data = new FormData;
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + '/api/goodsedit',
        method: 'post',
        data: data,
    })
}

//商品删除

export const reqDelGoods = (id) => {
    return axios({
        url: baseUrl + '/api/goodsdelete',
        method: 'post',
        data: {
            id,
        }
    })
}




/*****************会员管理******************/


//会员列表

export const reqMemberList = () => {
    return axios({
        url: baseUrl + '/api/memberlist',
    })
}


//获取获取 一条

export const reqMemberInfo = (uid) => {
    return axios({
        url: baseUrl + '/api/memberinfo',
        params: {
            uid,
        }
    })
}


//会员修改

export const reqMemberEdit = (params) => {
    return axios({
        url: baseUrl + '/api/memberedit',
        method: 'post',
        data: params,
    })
}




/****************轮播图管理*******************/


//轮播图添加 

export const reqBannerAdd = (params) => {
    let data = new FormData();
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/banneradd",
        method: 'post',
        data: data,
    })
}

//轮播图列表

export const reqBannerList = () => {
    return axios({
        url: baseUrl + '/api/bannerlist',
    })
}


//轮播图信息一条

export const reqBannerInfo = (id) => {
    return axios({
        url: baseUrl + '/api/bannerinfo',
        params: {
            id,
        }
    })
}


//轮播图修改 

export const reqBannerEdit = (params) => {
    let data = new FormData();
    for (let i in params) {
        data.append(i, params[i]);
    };
    return axios({
        url: baseUrl + '/api/banneredit',
        method: 'post',
        data: data,
    })
}


export const reqBannerDel = (id) => {
    return axios({
        url: baseUrl + '/api/bannerdelete',
        method: 'post',
        data: {
            id,
        }
    })
}



/*********************秒杀管理**********************/

// 限时秒杀添加

export const reqSeckAdd = (params) => {
    return axios({
        url: baseUrl + '/api/seckadd',
        method: 'post',
        data: params,
    })
}


// 限时秒杀列表 

export const reqSeckList = () => {
    return axios({
        url: baseUrl + '/api/secklist',
    })
}


// 限时秒杀获取一条
export const reqSeckInfo = (id) => {
    return axios({
        url: baseUrl + '/api/seckinfo',
        params: {
            id,
        }
    })
}

// 限时秒杀修改 

export const reqSeckEdit = (params) => {
    return axios({
        url: baseUrl + '/api/seckedit',
        method: 'post',
        data: params,
    })
}


export const reqSeckDel = (id) => {
    return axios({
        url: baseUrl + '/api/seckdelete',
        method: 'post',
        data: {
            id,
        }
    })
}