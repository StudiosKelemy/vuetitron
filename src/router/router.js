import Vue from 'vue'
import VueRouter from 'vue-router'

// index
import Index from '../views/Index.vue'

// dashboard
import Dashboard from '../views/dashboard/Dashboard.vue'

// companies
import Companies from '../views/companies/Companies.vue'
import Company from '../views/companies/Company.vue'
import StoreCompany from '../views/companies/StoreCompany.vue'
import UpdateCompany from '../views/companies/UpdateCompany.vue'

// sectors
import Sectors from '../views/sectors/Sectors.vue'
import Sector from '../views/sectors/Sector.vue'

// sectors
import Activities from '../views/activities/Activities.vue'

Vue.use(VueRouter)

const routes = [
    // Index
    {
        path: '/',
        name: 'Index',
        component: Index
    },

    // Dashboard
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },

    // Companies
    {
        path: '/companies',
        component: () => import('@/views/companies/Index.vue'),
        children: [
            {
                path: '',
                name: 'Companies',
                component: Companies
            },
            {
                path: 'store',
                name: 'StoreCompany',
                component: StoreCompany
            },
            {
                path: 'update/:id',
                name: 'UpdateCompany',
                component: UpdateCompany
            },
            {
                path: ':id',
                name: 'Company',
                component: Company
            },
        ],
    },

    // Sectors
    {
        path: '/sectors',
        component: () => import('@/views/sectors/Index.vue'),
        children: [
            {
                path: '',
                name: 'Sectors',
                component: Sectors
            },
            {
                path: ':id',
                name: 'Sector',
                component: Sector
            },
        ],
    },

    // Activities
    {
        path: '/activities',
        component: () => import('@/views/activities/Index.vue'),
        children: [
            {
                path: '',
                name: 'Activities',
                component: Activities
            },
        ],
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
})

export default router
