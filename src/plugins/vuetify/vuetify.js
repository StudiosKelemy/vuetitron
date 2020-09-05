import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import fr from 'vuetify/es5/locale/fr'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#EF6C00', // orange darken-3
                secondary: '#5D4037', // brown darken-2
                accent: '#00C853', // green accent-4
                danger: '#C62828', // red darken-3
            }
        }
    },
    lang: {
        locales: { fr },
        current: 'fr',
    },
})
