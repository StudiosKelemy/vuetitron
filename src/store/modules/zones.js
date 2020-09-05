// imports
import http from '@/app/config/http'

// states
const state = {
    zones: [],
    zone: [],
}

// getters
const getters = {

    // get a listing of the resource
    zones: state => state.zones,

}

const mutations = {

    // mutate listing of the resource
    ZONES (state, data) {
        state.zones = data
    },

}

const actions = {

    // get a listing of the resource
    async index ({ commit }) {
        await http
            .get('/zones')
            .then(response => {
                commit('ZONES', response.data)
            })
            .catch(() => {
                commit('ZONES', [])
            })
    },
}

const zones = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

export default zones
