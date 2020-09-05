// imports
import Vue from 'vue'
import http from '@/app/config/http'

// states
const state = {
    activities: [],
    activity: [],
}

// getters
const getters = {

    // get a listing of the resource
    activities: state => state.activities,

    // get the specified resource
    activity: (state) => (id) => {
        return state.activities.filter((activity) => {
            return activity.id === id
        }).shift()
    }

}

const mutations = {

    // mutate listing of the resource
    ACTIVITIES (state, data) {
        state.activities = data
    },

    // mutate the specified resource
    ACTIVITY (state, data) {
        state.activity = data
    },

    // mutate by adding specified resource
    ADD_ACTIVITY (state, data) {
        state.activities.unshift(data)
    },

    // mutate by updating specified resource
    UPDATE_ACTIVITY (state, data) {
        //
    },

    // destroy specified resource
    DESTROY_ACTIVITY (state, data) {
        state.activities = state.activities.filter((item) => item !== data)
    },

}

const actions = {

    // get a listing of the resource
    async index ({ commit }) {
        await http
            .get('/activities')
            .then(response => {
                commit('ACTIVITIES', response.data)
            })
            .catch(error => {
                Vue.toasted.show(error.response.data.message)
            })
    },

    // get the specified resource
    async show ({ commit }, id) {
        await http
            .get('/activities/' + id)
            .then(response => {
                commit('ACTIVITY', response.data)
            })
            .catch(error => {
                Vue.toasted.show(error.response.data.message)
            })
    },

    // store a newly created resource in storage
    async store ({ commit }, data) {
        await http
            .post('/activities', data)
            .then(response => {
                commit('ADD_ACTIVITY', response.data)
                Vue.toasted.show('Crée avec succès')
            })
            .catch(error => {
                console.log(error.response)
            })
    },

    // get the specified resource
    async update ({ commit }, item) {
        await http
            .put('/activities/' + item.id, item)
            .then(response => {
                commit('ACTIVITY', response.data)
                Vue.toasted.show('Modifié avec succès')
            })
            .catch(error => {
                console.log(error.response)
            })
    },

    // remove the specified resource from storage
    async destroy ({ commit }, item) {
        await http
            .delete('/activities/' + item.id)
            .then(response => {
                commit('DESTROY_ACTIVITY', item)
                Vue.toasted.show('Supprimé avec succès')
            })
            .catch(error => {
                Vue.toasted.show(error.response.data.message)
            })
    },
}

const activities = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

export default activities
