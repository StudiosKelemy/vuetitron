<template>
    <div class="dashboard">
        <v-app class="">

            <AppBar toolbarTitle="Tableau de Bord" ></AppBar>

            <v-main id="main">
                <v-container fluid class="brown--text text--darken-2">
                    <v-row align="center" class="">

                        <!-- sidebar -->
                        <SideBar></SideBar>

                        <!-- content -->
                        <v-sheet id="content" class="grey lighten-4">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate dolor ea in quia voluptatibus perspiciatis dignissimos, sint, veniam odit quae vel reiciendis officiis dolorem itaque, tempore voluptatum? Alias, velit maxime.
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
    name: 'Dashboard',
    components: { AppBar, SideBar },
    data () {
        return {
            //
        }
    },
    methods: {
        //
    }
}
</script>
