// imports
import http from '@/app/config/http'

// states
const state = {
    files: [],
    file: [],
}

// getters
const getters = {

    // get a listing of the resource
    files: state => state.files,

}

const mutations = {

    // mutate listing of the resource
    FILES (state, data) {
        state.files = data
    },

}

const actions = {

    // get a listing of the resource
    async index ({ commit }) {
        await http
            .get('/files')
            .then(response => {
                commit('FILES', response.data)
            })
            .catch(() => {
                commit('FILES', [])
            })
    },
}

const files = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

export default files
