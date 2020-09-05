<template>

    <!-- content -->
    <v-card class="pb-3 datatable">
        <v-card-title>
            Tous les secteurs
            <v-spacer></v-spacer>
            <v-text-field
                v-model="datatable.search"
                append-icon="mdi-magnify"
                label="Recherchez un secteur d'activités"
                single-line
                clearable
                hide-details>
            </v-text-field>
            <v-spacer></v-spacer>
            <v-btn @click.stop="storeDialog = true" depressed class="ma-1" tile color="primary" dark>
                <v-icon small left>mdi-plus-thick</v-icon> Ajouter un secteur
            </v-btn>
        </v-card-title>

        <v-dialog
            v-model="storeDialog"
            max-width="450px">
                <v-card>
                    <v-card-title class="grey lighten-3">
                    </v-card-title>
                    <v-card-text class="pa-4">

                        <v-text-field flat clearable required outlined dense
                            v-model.trim="$v.form.name.$model"
                            name="name"
                            label="Nom du secteur"
                            class="">
                        </v-text-field>

                        <v-textarea flat clearable required outlined dense
                            :auto-grow="true"
                            v-model.trim="$v.form.desc.$model"
                            name="desc"
                            label="Description du secteur">
                        </v-textarea>

                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn type="submit" :disabled="$v.form.$invalid" @click.prevent="store" depressed class="ma-2" tile color="primary">Enregistrer</v-btn>
                        <v-btn @click.stop="storeDialog = false" depressed class="ma-2" tile color="secondary">Annuler</v-btn>
                    </v-card-actions>
                </v-card>
        </v-dialog>

        <v-pagination v-model="datatable.pagination.page" :length="pageCount"></v-pagination>

        <v-data-table
            :loading="datatable.isLoading"
            loading-text="Chargement des données en cours..."
            :headers="datatable.headers"
            :items="sectors"
            :sort-desc="[true, false]"
            :fixed-header="true"
            :page.sync="datatable.pagination.page"
            :items-per-page.sync="datatable.pagination.itemsPerPage"
            :page-count.sync="pageCount"
            :search.sync="datatable.search"
            multi-sort>

            <template v-slot:item.name="sector">

                <v-edit-dialog persistent large :return-value.sync="sector.item.name"
                @save="save(sector.item)" @cancel="cancel" @open="open" @close="close"
                cancel-text="Annuler" save-text="Mettre à jour">

                    <span v-if="sector.item.name != null" v-text="sector.item.name"></span>
                    <span v-else>n/a</span>

                    <template v-slot:input>
                        <v-text-field v-model="sector.item.name"
                        label="Modifier" autofocus
                        single-line>
                        </v-text-field>
                    </template>
                </v-edit-dialog>

            </template>

            <template v-slot:item.desc="sector">

                <v-edit-dialog persistent large :return-value.sync="sector.item.desc"
                @save="save(sector.item)" @cancel="cancel" @open="open" @close="close"
                cancel-text="Annuler" save-text="Mettre à jour">

                    <span v-if="sector.item.desc != null" v-text="sector.item.desc"></span>
                    <span v-else>n/a</span>

                    <template v-slot:input>
                        <v-text-field v-model="sector.item.desc"
                        label="Modifier" autofocus
                        single-line>
                        </v-text-field>
                    </template>
                </v-edit-dialog>

            </template>

            <template v-slot:item.menu="sector" class="datatable-menu">

                <v-btn :to="{ name: 'Sector', params: { id: sector.item.id } }" depressed class="ma-1" tile color="secondary" x-small>Afficher</v-btn>

                <v-dialog v-model="datatable.deleteDialog[sector.item.id]" :key="sector.item.id" persistent max-width="300">
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
                            <p class="text-center font-weight-medium">Etes-vous sûr de vouloir supprimer <br> <span class="font-weight-bold orange--text text--darken-3">{{ sector.item.name }}</span></p>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-btn @click="destroy(sector.item)" depressed class="ma-2" tile color="primary" x-small>Confirmer et supprimer</v-btn>
                            <v-btn @click.stop="$set(datatable.deleteDialog, sector.item.id, false)" depressed class="ma-2" tile color="secondary" x-small>Annuler</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </template>

        </v-data-table>

        <v-divider></v-divider>

        <v-pagination elevation-0 v-model="datatable.pagination.page" :length="pageCount"></v-pagination>

    </v-card>

</template>

<script>
// vuex
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
    name: 'Sectors',
    components: {},
    data () {
        return {
            datatable: {
                headers: [
                    { value: 'name', text: 'Secteur', sortable: true },
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
            storeDialog: false,
            form: {
                name: null,
                desc: null,
            },
        }
    },
    validations: { // validation form
        form: {
            name: { required },
            desc: {},
        }
    },
    computed: {
        ...mapGetters({
            sectors: 'sectors/sectors'
        }),
        // data table pagination page count
        pageCount () {
            const totalItems = this.sectors.length
            if (this.datatable.pagination.itemsPerPage == null || totalItems == null) { return 0 }
            return Math.ceil(totalItems / this.datatable.pagination.itemsPerPage)
        }
    },
    methods: {
        // update the specified resource in storage
        save (item) {
            this.$store.dispatch('sectors/update', item)
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
        // store a newly created resource in storage
        store () {
            this.$store
                .dispatch('sectors/store', this.$v.form.$model)
                .then(() => {
                    this.form.name = ''
                    this.form.desc = ''
                    this.storeDialog = false
                })
        },
        // remove the specified resource from storage
        destroy (item) {
            this.$store
                .dispatch('sectors/destroy', item)
                .then(() => {
                    this.$set(this.datatable.deleteDialog, item.id, false)
                })
        },
    },
    created () {
        // get a listing of the resource
        this.$store.dispatch('sectors/index')
            .then(() => {
                // init loader
                this.datatable.isLoading = false
            })
    }
}
</script>

<style lang="scss" scope>
    // scss
    .datatable tr {
        .v-btn {
            visibility: hidden;
        }
        &:hover .v-btn {
            visibility: visible;
        }
    }
</style>
