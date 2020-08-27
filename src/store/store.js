import Vue from 'vue'
import Vuex from 'vuex'

// modules
import modules from '@/store/modules/modules'

Vue.use(Vuex)

// ----------------------------
// STORE
// ----------------------------

const state = {
    //
}

const getters = {
    //
}

const mutations = {
    //
}

const actions = {
    //
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules,
    plugins: [
        // vuexLocalStorage.plugin
    ],
    strict: process.env.NODE_ENV !== 'development'
})
