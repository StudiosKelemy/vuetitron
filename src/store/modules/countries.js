// imports
import http from '@/app/config/http'

// states
const state = {
    countries: [],
    country: [],
}

// getters
const getters = {

    // get a listing of the resource
    countries: state => state.countries,

}

const mutations = {

    // mutate listing of the resource
    COUNTRIES (state, data) {
        state.countries = data
    },

}

const actions = {

    // get a listing of the resource
    async index ({ commit }) {
        await http
            .get('/countries')
            .then(response => {
                commit('COUNTRIES', response.data)
            })
            .catch(() => {
                commit('COUNTRIES', [])
            })
    },
}

const countries = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

export default countries
