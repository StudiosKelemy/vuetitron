<template>
    <div v-if="sector">

        <v-container fluid>
            <v-row no-gutters>
                <v-col lg="4">
                    <v-card>
                        <v-card-text>
                            <v-row no-gutters>
                                <v-col lg="2">
                                    <v-icon color="primary" x-large>mdi-shape-outline</v-icon>
                                </v-col>
                                <v-col lg="9">
                                    <h2 v-text="sector.name"></h2>
                                    <p v-if="sector.desc != null" v-text="sector.desc" class="mt-3"></p>
                                    <p v-else>n/a</p>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <v-container fluid>
            <v-row no-gutters>
                <v-col>
                    <v-card>
                        <v-card-title>
                            Toutes les activités
                            <v-spacer></v-spacer>
                            <v-btn to="/activities" depressed class="ma-1" tile color="primary" dark>
                                <v-icon small left>mdi-plus-thick</v-icon> Ajouter une activité
                            </v-btn>
                        </v-card-title>

                        <v-card-text>

                            <v-data-table
                                :headers="datatable.headers"
                                :items="sector.activities"
                                :sort-desc="[true, false]"
                                :fixed-header="true"
                                :page.sync="datatable.pagination.page"
                                :items-per-page.sync="datatable.pagination.itemsPerPage"
                                :page-count.sync="pageCount"
                                :search.sync="datatable.search"
                                multi-sort>

                                <template v-slot:item.name="activity">

                                    <v-edit-dialog persistent large :return-value.sync="activity.item.name"
                                    @save="save(activity.item)" @cancel="cancel" @open="open" @close="close"
                                    cancel-text="Annuler" save-text="Mettre à jour">

                                        <span v-if="activity.item.name != null" v-text="activity.item.name"></span>
                                        <span v-else>n/a</span>

                                        <template v-slot:input>
                                            <v-text-field v-model="activity.item.name"
                                            label="Modifier" autofocus
                                            single-line>
                                            </v-text-field>
                                        </template>
                                    </v-edit-dialog>

                                </template>

                                <template v-slot:item.desc="activity">

                                    <v-edit-dialog persistent large :return-value.sync="activity.item.desc"
                                    @save="save(activity.item)" @cancel="cancel" @open="open" @close="close"
                                    cancel-text="Annuler" save-text="Mettre à jour">

                                        <span v-if="activity.item.desc != null" v-text="activity.item.desc"></span>
                                        <span v-else>n/a</span>

                                        <template v-slot:input>
                                            <v-text-field v-model="activity.item.desc"
                                            label="Modifier" autofocus
                                            single-line>
                                            </v-text-field>
                                        </template>
                                    </v-edit-dialog>

                                </template>

                                <template v-slot:item.menu="activity" class="datatable-menu">

                                    <v-dialog v-model="datatable.deleteDialog[activity.item.id]" :key="activity.item.id" max-width="300">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn depressed x-small tile
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
                                                <p class="text-center font-weight-medium">Etes-vous sûr de vouloir supprimer <br> <span class="font-weight-bold orange--text text--darken-3">{{ activity.item.name }}</span></p>
                                            </v-card-text>
                                            <v-divider></v-divider>
                                            <v-card-actions>
                                                <v-btn @click="remove(activity.item)" depressed class="ma-2" tile color="primary" x-small>Confirmer et supprimer</v-btn>
                                                <v-btn @click.stop="$set(datatable.deleteDialog, activity.item.id, false)" depressed class="ma-2" tile color="secondary" x-small>Annuler</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>

                                </template>

                            </v-data-table>

                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

    </div>
</template>

<script>
// vuex
import { mapGetters } from 'vuex'
import { required, numeric } from 'vuelidate/lib/validators'

export default {
    name: 'Sector',
    components: {},
    data () {
        return {
            datatable: {
                headers: [
                    { value: 'name', text: 'Activité', sortable: true },
                    { value: 'desc', text: 'Description', sortable: false },
                    { value: 'menu', text: 'Menu', sortable: false },
                ],
                search: null,
                pagination: {
                    page: 1,
                    itemsPerPage: 10,
                },
                footerProps: {
                    //
                },
                deleteDialog: {},
                isLoading: true,
            },
        }
    },
    validations: { // validation form
        form: {
            name: { required },
            desc: {},
            sector_id: { required, numeric },
        }
    },
    computed: {
        ...mapGetters({
            //
        }),
        // get the specified resource
        sector () {
            return this.$store.getters['sectors/sector'](this.$route.params.id)
        },
        // data table pagination page count
        pageCount () {
            if (this.sector.activities !== undefined) {
                const totalItems = this.sector.activities.length
                if (this.datatable.pagination.itemsPerPage == null || totalItems == null) { return 0 }
                return Math.ceil(totalItems / this.datatable.pagination.itemsPerPage)
            }
            return 0
        }
    },
    methods: {
        // update the specified resource in storage
        save (item) {
            this.$store.dispatch('activities/update', item)
        },
        // cancel
        cancel () {
            // console.log('cancelled')
        },
        // open
        open () {
            // console.log('opened')
        },
        // close
        close () {
            // console.log('closed')
        },
        // remove the specified resource from storage
        remove (item) {
            this.$store
                .dispatch('activities/destroy', item)
                .then(() => {
                    this.$set(this.datatable.deleteDialog, item.id, false)
                })
        },
        // remove the specified resource from storage
        destroy (item) {
            this.$store.dispatch('sectors/destroy', item)
                .then(() => {
                    this.$router.push({ name: 'Sectors' })
                })
        },
    },
    created () {
        // get the specified resource
        this.$store.dispatch('sectors/show', this.$route.params.id)
    }
}
</script>
