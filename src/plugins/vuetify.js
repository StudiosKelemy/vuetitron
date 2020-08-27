import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#EF6C00', // orange darken-3
                secondary: '#5D4037', // brown darken-2
                accent: '#00C853', // green accent-4
            },
        },
    },
})
