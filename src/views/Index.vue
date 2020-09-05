<template>
    <div class="index">
        <v-app class="orange darken-3">
            <v-main>
                <v-container fluid class="white--text">
                    <v-row align="center" justify="center" class="pa-16">

                        <!-- Connexion form -->
                        <v-col cols="12" sm="12">
                            <h1 class="text-center">Console d'Administration</h1>
                            <h3 class="text-center">Release 1.0.0 - Afrikaklub App</h3>
                        </v-col>

                        <!-- Connexion form -->
                        <v-col cols="12" sm="6" md="6" lg="4" xl="3" class="white">
                            <v-form class="orange--text text--darken-3">
                                <v-text-field label="Administrateur" type="email" required outlined flat clearable class="mb-0"></v-text-field>
                                <v-text-field label="Mot de passe" type="password" required outlined flat clearable class="mb-0"></v-text-field>

                                <v-btn depressed color="primary" block large @click.prevent="login">Connexion</v-btn>

                            </v-form>
                        </v-col>

                    </v-row>
                </v-container>
            </v-main>
        </v-app>
    </div>
</template>

<script>
export default {
    name: 'Index',
    components: {},
    data () {
        return {
            //
        }
    },
    methods: {

        // login
        login () {
            this.$router.push('/dashboard')
        }
    }
}
</script>
