import Vue from 'vue'

// format null value
Vue.filter('n_a', function (value) {
    if (value == null) {
        return 'n/a'
    }
    return value
})

// format raw html content
Vue.filter('html', function (value) {
    return value.toString().replace(/[&<>"']/g, function onReplace (match) {
        return '&#' + match.charCodeAt(0) + ';'
    })
})
