<template>
    <div v-if="company">

        <v-container fluid class="pa-0">
            <v-row no-gutters>

                <v-col sm="6" class="px-3">
                    <v-card>
                        <v-card-text>

                            <div class="d-flex">
                                <v-img v-if="company.file" :src="'http://api.afrikaklub.com/api/v1/admin/files/' + company.file.id" fluid max-height="50" max-width="50" class="thumbnail elevation-2"></v-img>
                                <v-img v-else src="@/assets/media/afrikaklub_default_logo.png" fluid max-height="50" max-width="50" class="thumbnail elevation-2"></v-img>
                                <h1 class="orange--text text--darken-3 pa-4">{{ company.name }}</h1>
                            </div>

                            <v-divider class="my-2"></v-divider>

                            <v-simple-table>
                                <template v-slot:default>
                                    <tbody>
                                        <tr>
                                            <td><v-icon>mdi-folder-outline</v-icon></td>
                                            <td>Type</td>
                                            <td v-if="company.organization != null">{{ company.organization.organization }}</td>
                                            <td v-else>n/a</td>
                                        </tr>
                                        <tr>
                                            <td><v-icon>mdi-shape-plus</v-icon></td>
                                            <td>Secteur</td>
                                            <td v-if="company.activity != null && company.activity.sector">{{ company.activity.sector.name }}</td>
                                            <td v-else>n/a</td>
                                        </tr>
                                        <tr>
                                            <td><v-icon>mdi-shape-outline</v-icon></td>
                                            <td>Activité</td>
                                            <td v-if="company.activity != null">{{ company.activity.name }}</td>
                                            <td v-else>n/a</td>
                                        </tr>
                                        <tr>
                                            <td><v-icon>mdi-earth</v-icon></td>
                                            <td>Région</td>
                                            <td v-if="company.zone != null">{{ company.zone.name }}</td>
                                            <td v-else>n/a</td>
                                        </tr>
                                        <tr>
                                            <td><v-icon>mdi-map-marker-radius</v-icon></td>
                                            <td>Pays</td>
                                            <td v-if="company.country != null">{{ company.country.name }}</td>
                                            <td v-else>n/a</td>
                                        </tr>
                                        <tr>
                                            <td><v-icon>mdi-home</v-icon></td>
                                            <td>Adresse</td>
                                            <td>{{ company.address | n_a }}</td>
                                        </tr>
                                        <tr>
                                            <td><v-icon>mdi-deskphone</v-icon></td>
                                            <td>Contact</td>
                                            <td v-if="company.contacts.length != 0">
                                                <v-chip small color="secondary" class="ma-1" v-for="(item, i) in company.contacts" :key="i">{{ company.contacts[i] }}</v-chip>
                                            </td>
                                            <td v-else>n/a</td>
                                        </tr>
                                        <tr>
                                            <td><v-icon>mdi-at</v-icon></td>
                                            <td>Email</td>
                                            <td v-if="company.emails.length != 0">
                                                <v-chip small color="secondary" class="ma-1" v-for="(item, i) in company.emails" :key="i">{{ company.emails[i] }}</v-chip>
                                            </td>
                                            <td v-else>n/a</td>
                                        </tr>
                                        <tr>
                                            <td><v-icon>mdi-web</v-icon></td>
                                            <td>Site internet</td>
                                            <td v-if="company.websites.length != 0">
                                                <v-chip small color="secondary" class="ma-1" v-for="(item, i) in company.websites" :key="i">{{ company.websites[i] }}</v-chip>
                                            </td>
                                            <td v-else>n/a</td>
                                        </tr>
                                        <tr>
                                            <td><v-icon>mdi-calendar</v-icon></td>
                                            <td>Date de création</td>
                                            <td>{{ datetimeIso(company.creation_date) }}</td>
                                        </tr>
                                        <tr>
                                            <td><v-icon>mdi-folder-open</v-icon></td>
                                            <td>N° d'enregistrement</td>
                                            <td>{{ company.reference_num | n_a }}</td>
                                        </tr>
                                        <tr>
                                            <td><v-icon>mdi-account-group</v-icon></td>
                                            <td>Employés</td>
                                            <td>{{ company.employees | n_a }}</td>
                                        </tr>
                                        <tr>
                                            <td><v-icon>mdi-cash-multiple</v-icon></td>
                                            <td>Capital</td>
                                            <td>{{ company.turnover | n_a }}</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col sm="6" class="px-3">
                    <v-card>
                        <v-card-text>

                            <v-sheet color="grey lighten-5" class="pa-3">

                                <h3 class="my-2"><v-icon>mdi-cube</v-icon> Nos offres</h3>
                                <v-divider class="my-2"></v-divider>

                                <p :inner-html.prop="company.offers | n_a" class="text-justify"></p>

                            </v-sheet>

                            <v-sheet color="white" class="pa-3">

                                <h3 class="my-2"><v-icon>mdi-cube-outline</v-icon> Nos besoins</h3>
                                <v-divider class="my-2"></v-divider>

                                <p :inner-html.prop="company.needs | n_a" class="text-justify"></p>

                            </v-sheet>

                            <v-divider class="mb-3"></v-divider>

                            <div class="d-flex">

                                <v-btn :to="{ name: 'UpdateCompany', params: { id: company.id } }" depressed class="ma-2" tile color="secondary" small>Modifier</v-btn>

                                <v-dialog v-model="isDialogOpen" persistent max-width="300">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn depressed small tile
                                            v-bind="attrs"
                                            v-on="on"
                                            class="ma-2"
                                            color="primary">
                                            Supprimer
                                        </v-btn>
                                    </template>

                                    <v-card>
                                        <v-card-title class="grey lighten-3">
                                        </v-card-title>
                                        <v-card-text class="pa-4 mt-6">
                                            <p class="text-center font-weight-medium">Etes-vous sûr de vouloir supprimer <br> <span class="font-weight-bold orange--text text--darken-3">{{ company.name }}</span></p>
                                        </v-card-text>
                                        <v-divider></v-divider>
                                        <v-card-actions >
                                            <v-btn @click="destroy(company)" depressed class="ma-2" tile color="primary" x-small>Confirmer et supprimer</v-btn>
                                            <v-btn @click="isDialogOpen = false" depressed class="ma-2" tile color="secondary" x-small>Annuler</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>

                            </div>
                        </v-card-text>

                    </v-card>
                </v-col>
            </v-row>
        </v-container>

    </div>
</template>

<script>
// vuex
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: 'Company',
    components: {},
    data () {
        return {
            isDialogOpen: false,
        }
    },
    computed: {
        ...mapGetters({
            //
        }),
        // get the specified resource
        company () {
            return this.$store.getters['companies/company'](this.$route.params.id)
        }
    },
    methods: {
        ...mapMutations({
            //
        }),
        // datetime
        datetimeIso (datetime) {
            if (datetime === null) {
                return 'n/a'
            }
            return datetime
        },
        // remove the specified resource from storage
        destroy (item) {
            this.$store.dispatch('companies/destroy', item)
                .then(() => {
                    this.$router.push({ name: 'Companies' })
                })
        },
    },
    created () {
        // get the specified resource
        this.$store.dispatch('companies/show', this.$route.params.id)
    }
}
</script>
