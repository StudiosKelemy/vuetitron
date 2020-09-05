// imports
import http from '@/app/config/http'

// states
const state = {
    organizations: [],
    organization: [],
}

// getters
const getters = {

    // get a listing of the resource
    organizations: state => state.organizations,

}

const mutations = {

    // mutate listing of the resource
    ORGANIZATIONS (state, data) {
        state.organizations = data
    },

}

const actions = {

    // get a listing of the resource
    async index ({ commit }) {
        await http
            .get('/organizations')
            .then(response => {
                commit('ORGANIZATIONS', response.data)
            })
            .catch(() => {
                commit('ORGANIZATIONS', [])
            })
    },
}

const organizations = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

export default organizations
