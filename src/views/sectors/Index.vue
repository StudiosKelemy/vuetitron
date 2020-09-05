<template>
    <div class="dashboard">
        <v-app class="">

            <AppBar toolbarTitle="Secteurs d'Activités" ></AppBar>

            <v-main id="main">
                <v-container fluid class="brown--text text--darken-2">
                    <v-row align="center" class="">

                        <!-- sidebar -->
                        <SideBar></SideBar>

                        <!-- content -->
                        <v-sheet id="content" class="grey lighten-4 pa-3">

                            <router-view></router-view>

                        </v-sheet>

                    </v-row>
                </v-container>
            </v-main>
            <v-footer app>
                <!-- -->
            </v-footer>
        </v-app>
    </div>
</template>

<script>
import AppBar from '@/views/shared/AppBar'
import SideBar from '@/views/shared/SideBar'

export default {
    name: 'Index',
    components: { AppBar, SideBar },
    data () {
        return {
            //
        }
    },
    computed: {
        //
    },
    methods: {
        //
    },
    created () {
        //
    }
}
</script>
