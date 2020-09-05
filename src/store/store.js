import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

// modules
import modules from './modules/modules'

// init vuex
Vue.use(Vuex)

// vuex persist
const vuexLocalStorage = new VuexPersist({
    key: 'vuex', // The key to store the state on in the storage provider.
    storage: window.localStorage, // or window.sessionStorage or localForage
    // Function that passes the state and returns the state with only the objects you want to store.
    // reducer: state => state,
    // Function that passes a mutation and lets you decide if it should update the state in localStorage.
    // filter: mutation => (true)
})

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
        vuexLocalStorage.plugin
        // tips: enable on production
        // createPersistedState(),
        // createSharedMutations()
    ],
    strict: process.env.NODE_ENV !== 'development'
})
