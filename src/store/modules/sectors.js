// imports
import Vue from 'vue'
import http from '@/app/config/http'

// states
const state = {
    sectors: [],
    sector: [],
}

// getters
const getters = {
    // get a listing of the resource
    sectors: state => state.sectors,

    // get the specified resource
    sector: state => id => {
        return state.sectors
            .filter(sector => {
                return sector.id === id
            })
            .shift()
    },
}

const mutations = {

    // mutate listing of the resource
    SECTORS (state, data) {
        state.sectors = data
    },

    // mutate the specified resource
    SECTOR (state, data) {
        state.sector = data
    },

    // mutate by adding specified resource
    ADD_SECTOR (state, data) {
        state.sectors.unshift(data)
    },

    // mutate by updating specified resource
    UPDATE_SECTOR (state, data) {
        //
    },

    // destroy specified resource
    DESTROY_SECTOR (state, data) {
        state.sectors = state.sectors.filter((item) => item !== data)
    },

}

const actions = {

    // get a listing of the resource
    async index ({ commit }) {
        await http
            .get('/sectors')
            .then(response => {
                commit('SECTORS', response.data)
            })
            .catch(error => {
                Vue.toasted.show(error.response.data.message)
            })
    },

    // get the specified resource
    async show ({ commit }, id) {
        await http
            .get('/sectors/' + id)
            .then(response => {
                commit('SECTOR', response.data)
            })
            .catch(error => {
                Vue.toasted.show(error.response.data.message)
            })
    },

    // store a newly created resource in storage
    async store ({ commit }, data) {
        await http
            .post('/sectors', data)
            .then(response => {
                commit('ADD_SECTOR', response.data)
                Vue.toasted.show('Crée avec succès')
            })
            .catch(error => {
                console.log(error.response)
            })
    },

    // get the specified resource
    async update ({ commit }, item) {
        await http
            .put('/sectors/' + item.id, item)
            .then(response => {
                commit('SECTOR', response.data)
                Vue.toasted.show('Modifié avec succès')
            })
            .catch(error => {
                console.log(error.response)
            })
    },

    // remove the specified resource from storage
    async destroy ({ commit }, item) {
        await http
            .delete('/sectors/' + item.id)
            .then(response => {
                commit('DESTROY_SECTOR', item)
                Vue.toasted.show('Supprimé avec succès')
            })
            .catch(error => {
                Vue.toasted.show(error.response.data.message)
            })
    },
}

const sectors = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

export default sectors
