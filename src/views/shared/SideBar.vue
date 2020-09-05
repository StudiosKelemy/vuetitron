<template>

    <v-sheet id="sidebar" class="brown darken-2 white--text px-3">

        <v-sheet>

            <v-list elevation="5">

                <v-list-item-group mandatory color="primary">

                    <v-list-item :ripple="false" to="/dashboard">
                        <v-list-item-icon>
                            <v-icon>mdi-monitor-dashboard</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Tableau de Bord</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item :ripple="false" to="/sectors">
                        <v-list-item-icon>
                            <v-icon>mdi-shape-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Secteurs d'Activités</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item :ripple="false" to="/activities">
                        <v-list-item-icon>
                            <v-icon>mdi-shape</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Sous-secteurs d'Activités</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item :ripple="false">
                        <v-list-item-icon>
                            <v-icon>mdi-folder</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Gestion des Fichiers</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item :ripple="false" to="/companies">
                        <v-list-item-icon>
                            <v-icon>mdi-city</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Gestion des Entreprises</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item :ripple="false">
                        <v-list-item-icon>
                            <v-icon>mdi-alpha-e-box</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Gestion des Evènements</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item :ripple="false">
                        <v-list-item-icon>
                            <v-icon>mdi-account-tie</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Gestion des Personnes</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item :ripple="false">
                        <v-list-item-icon>
                            <v-icon>mdi-account-circle</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Gestion des Membres</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item :ripple="false">
                        <v-list-item-icon>
                            <v-icon>mdi-cog-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Paramètres Application</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                </v-list-item-group>

            </v-list>

        </v-sheet>

    </v-sheet>

</template>

<script>
export default {
    name: 'SideBar',
    props: [],
    components: {},
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
