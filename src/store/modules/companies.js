// imports
import Vue from 'vue'
import http from '@/app/config/http'

// states
const state = {
    companies: [],
    company: [],
}

// getters
const getters = {

    // get a listing of the resource
    companies: state => state.companies,

    // get the specified resource
    company: (state) => (id) => {
        return state.companies.filter((company) => {
            return company.id === id
        }).shift()
    }

}

const mutations = {

    // mutate listing of the resource
    COMPANIES (state, data) {
        state.companies = data
    },

    // mutate the specified resource
    COMPANY (state, data) {
        state.company = data
    },

    // mutate by adding specified resource
    ADD_COMPANY (state, data) {
        state.companies.unshift(data)
    },

    // mutate by updating specified resource
    UPDATE_COMPANY (state, data) {
        //
    },

    // destroy specified resource
    DESTROY_COMPANY (state, data) {
        state.companies = state.companies.filter((item) => item !== data)
    },

}

const actions = {

    // get a listing of the resource
    async index ({ commit }) {
        await http
            .get('/companies')
            .then(response => {
                commit('COMPANIES', response.data)
            })
            .catch(error => {
                Vue.toasted.show(error.response.data.message)
            })
    },

    // get the specified resource
    async show ({ commit }, id) {
        await http
            .get('/companies/' + id)
            .then(response => {
                commit('COMPANY', response.data)
            })
            .catch(error => {
                Vue.toasted.show(error.response.data.message)
            })
    },

    // store a newly created resource in storage
    async store ({ commit }, data) {
        await http
            .post('/companies', data)
            .then(response => {
                commit('ADD_COMPANY', response.data)
                Vue.toasted.show('Crée avec succès')
            })
            .catch(error => {
                console.log(error.response)
            })
    },

    // get the specified resource
    async update ({ commit }, item) {
        await http
            .put('/companies/' + item.id, item)
            .then(response => {
                commit('COMPANY', response.data)
                Vue.toasted.show('Modifié avec succès')
            })
            .catch(error => {
                console.log(error.response)
            })
    },

    // remove the specified resource from storage
    async destroy ({ commit }, item) {
        await http
            .delete('/companies/' + item.id)
            .then(response => {
                commit('DESTROY_COMPANY', item)
                Vue.toasted.show('Supprimé avec succès')
            })
            .catch(error => {
                Vue.toasted.show(error.response.data.message)
            })
    },
}

const companies = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

export default companies
