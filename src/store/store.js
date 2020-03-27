//本页面用来实现vuex的使用
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    // ...
    state: {
        username: '',
        usericon: '',
    },
    mutations: {
        setinfo: function (state, playload) {
            state.username = playload.username
            state.avatar = playload.avatar
        }
    }
})
export default store