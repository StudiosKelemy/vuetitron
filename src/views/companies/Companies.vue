<template>

    <!-- content -->
    <v-card class="pb-3 datatable">
        <v-card-title>
            Toutes les entreprises
            <v-spacer></v-spacer>
            <v-text-field
                v-model="datatable.search"
                append-icon="mdi-magnify"
                label="Recherchez une entreprise"
                single-line
                clearable
                hide-details>
            </v-text-field>
            <v-spacer></v-spacer>
            <v-btn to="/companies/store" depressed class="ma-1" tile color="primary" dark>
                <v-icon small left>mdi-plus-thick</v-icon> Ajouter
            </v-btn>
        </v-card-title>

        <v-pagination v-model="datatable.pagination.page" :length="pageCount"></v-pagination>

        <v-data-table
            :loading="datatable.isLoading"
            loading-text="Chargement des données en cours..."
            :headers="datatable.headers"
            :items="companies"
            :sort-desc="[true, false]"
            :fixed-header="true"
            :page.sync="datatable.pagination.page"
            :items-per-page.sync="datatable.pagination.itemsPerPage"
            :page-count.sync="pageCount"
            :search.sync="datatable.search"
            multi-sort>

            <template v-slot:item.menu="company" class="datatable-menu">
                <v-btn :to="{ name: 'Company', params: { id: company.item.id } }" depressed class="ma-1" tile color="secondary" x-small>Afficher</v-btn>
                <v-btn :to="{ name: 'UpdateCompany', params: { id: company.item.id } }" depressed class="ma-1" tile color="accent" x-small>Modifier</v-btn>

                <v-dialog v-model="datatable.isDialogOpen[company.item.id]" :key="company.item.id" persistent max-width="300">
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
                            <p class="text-center font-weight-medium">Etes-vous sûr de vouloir supprimer <br> <span class="font-weight-bold orange--text text--darken-3">{{ company.item.name }}</span></p>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-btn @click="destroy(company.item)" depressed class="ma-2" tile color="primary" x-small>Confirmer et supprimer</v-btn>
                            <v-btn @click.stop="$set(datatable.isDialogOpen, company.item.id, false)" depressed class="ma-2" tile color="secondary" x-small>Annuler</v-btn>
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

export default {
    name: 'Companies',
    components: {},
    data () {
        return {
            datatable: {
                headers: [
                    { value: 'name', text: 'Entreprise', sortable: true },
                    { value: 'organization.organization', text: 'Type', sortable: true },
                    { value: 'zone.name', text: 'Zone', sortable: true },
                    { value: 'country.name', text: 'Pays', sortable: true },
                    { value: 'activity.name', text: 'Activité', sortable: true },
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
                isDialogOpen: {},
                isLoading: true,
            },
        }
    },
    computed: {
        ...mapGetters({
            companies: 'companies/companies'
        }),
        // data table pagination page count
        pageCount () {
            const totalItems = this.companies.length
            if (this.datatable.pagination.itemsPerPage == null || totalItems == null) { return 0 }
            return Math.ceil(totalItems / this.datatable.pagination.itemsPerPage)
        }
    },
    methods: {
        // remove the specified resource from storage
        destroy (item) {
            this.$store
                .dispatch('companies/destroy', item)
                .then(() => {
                    this.$set(this.datatable.isDialogOpen, item.id, false)
                    // this.datatable.isDialogOpen = false
                })
        },
    },
    created () {
        // get a listing of the resource
        this.$store.dispatch('companies/index')
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
