<template>
    <div>
        <v-form @submit.prevent>

            <v-container fluid class="pa-0">
                <v-row no-gutters>

                    <v-col cols="12" class="px-3">
                        <h2>Ajouter une entreprise</h2>
                        <v-divider class="my-3"></v-divider>
                    </v-col>

                    <v-col lg="4" class="px-3">

                        <v-card class="mb-4">
                            <v-card-text>
                                <v-text-field flat clearable required outlined dense
                                    v-model.trim="$v.form.name.$model"
                                    name="name"
                                    label="Nom de l'entreprise"
                                    class="">
                                </v-text-field>

                                <v-select clearable required outlined dense
                                    v-model.trim="$v.form.organization_id.$model"
                                    name="organization_id"
                                    :items="organizations"
                                    item-text="organization"
                                    item-value="id"
                                    label="Type d'entreprise">
                                </v-select>

                                <v-select clearable required outlined dense
                                    v-model.trim="$v.form.activity_id.$model"
                                    name="activity_id"
                                    :items="activities"
                                    item-text="name"
                                    item-value="id"
                                    label="Secteur d'Activités">
                                </v-select>

                                <v-select clearable required outlined dense
                                    v-model.trim="$v.form.zone_id.$model"
                                    name="zone_id"
                                    :items="zones"
                                    item-text="name"
                                    item-value="id"
                                    label="Région géographique">
                                </v-select>

                                <v-select clearable required outlined dense
                                    v-model.trim="$v.form.country_id.$model"
                                    name="country_id"
                                    :items="countries"
                                    item-text="name"
                                    item-value="id"
                                    label="Pays">
                                </v-select>

                            </v-card-text>

                        </v-card>

                        <v-card>
                            <v-card-text>

                                <div id="contact">

                                    <v-btn block @click="form.contacts.push('')" tile class="mb-3 mr-2" depressed color="primary" x-small>
                                        Ajouter un contact
                                    </v-btn>

                                    <v-container fluid class="pa-0">
                                        <v-row no-gutters>
                                            <v-col class="ma-0" v-for="(v, i) in $v.form.contacts.$each.$iter" :key="i" cols="6">
                                                <v-text-field flat required outlined dense
                                                    v-model.trim="v.$model"
                                                    label="Numéro"
                                                    type="number"
                                                    class="mb-0 mr-2"
                                                    append-icon="mdi-close"
                                                    height="35"
                                                    @click:append="remove(form.contacts, v.$model)">
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>

                                </div>

                                <v-divider class="my-2"></v-divider>

                                <div id="website">

                                    <v-btn block @click="form.websites.push('')" tile class="mb-3 mr-2" depressed color="primary" x-small>
                                        Ajouter un site internet
                                    </v-btn>

                                    <v-container fluid class="pa-0">
                                        <v-row no-gutters>
                                            <v-col class="ma-0" v-for="(v, i) in $v.form.websites.$each.$iter" :key="i" cols="6">
                                                <v-text-field flat required outlined dense
                                                    v-model.trim="v.$model"
                                                    label="Site internet"
                                                    type="url"
                                                    hint="Ex.: http://www.afrikaklub.ci"
                                                    class="mb-0 mr-2"
                                                    append-icon="mdi-close"
                                                    @click:append="remove(form.websites, v.$model)">
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>

                                </div>

                                <v-divider class="my-2"></v-divider>

                                <div id="website">

                                    <v-btn block @click="form.emails.push('')" tile class="mb-3 mr-2" depressed color="primary" x-small>
                                        Ajouter un email
                                    </v-btn>

                                    <v-container fluid class="pa-0">
                                        <v-row no-gutters>
                                            <v-col class="ma-0" v-for="(v, i) in $v.form.emails.$each.$iter" :key="i" cols="6">
                                                <v-text-field flat required outlined dense
                                                    v-model.trim="v.$model"
                                                    label="Email"
                                                    type="email"
                                                    hint="Ex.: info@afrikaklub.ci"
                                                    class="mb-0 mr-2"
                                                    append-icon="mdi-close"
                                                    @click:append="remove(form.emails, v.$model)">
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>

                                </div>

                            </v-card-text>
                        </v-card>

                    </v-col>

                    <v-col lg="4" class="px-3">
                        <v-card>
                            <v-card-text>

                                <v-text-field flat clearable required outlined dense
                                    v-model.trim="$v.form.address.$model"
                                    name="address"
                                    label="Adresse"
                                    class="mb-0">
                                </v-text-field>

                                <v-menu offset-y
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    min-width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field readonly flat clearable required outlined dense
                                            v-model="$v.form.creation_date.$model"
                                            name="creation_date"
                                            label="Date de création"
                                            v-bind="attrs"
                                            v-on="on">
                                        </v-text-field>
                                    </template>
                                    <v-date-picker locale="fr-fr" v-model="$v.form.creation_date.$model"></v-date-picker>
                                </v-menu>

                                <v-text-field flat clearable required outlined dense
                                    v-model.trim="$v.form.reference_num.$model"
                                    name="reference_num"
                                    label="Numéro d'enregistrement"
                                    class="mb-0">
                                </v-text-field>

                                <v-text-field flat clearable required outlined dense
                                    v-model.trim="$v.form.employees.$model"
                                    name="employees"
                                    type="number"
                                    label="Effectif"
                                    class="mb-0">
                                </v-text-field>

                                <v-text-field flat clearable required outlined dense
                                    v-model.trim="$v.form.turnover.$model"
                                    name="turnover"
                                    type="number"
                                    label="Capital"
                                    class="mb-0">
                                </v-text-field>

                            </v-card-text>
                        </v-card>

                        <v-card class="mt-4">

                            <v-card-text>
                                <p class="body-1 mb-0">Logotype</p>
                                <v-sheet class="d-flex mt-1">

                                    <v-img v-if="!$v.form.file_id.$model" aspect-ratio="1" max-height="100" max-width="100" src="@/assets/media/afrikaklub_default_logo.png" fluid class="thumbnail elevation-2"></v-img>
                                    <v-img v-else aspect-ratio="1" max-height="100" max-width="100" :src="'http://api.afrikaklub.com/api/v1/admin/files/' + $v.form.file_id.$model" fluid class="thumbnail elevation-2"></v-img>

                                    <div class="px-2">

                                        <v-btn @click.stop="browse(true)" block depressed class="" tile color="primary" x-small>Choisir une image</v-btn>
                                        <v-btn :disabled="!$v.form.file_id.$model" @click="unPickFile" block depressed class="mt-2" tile color="secondary" x-small>Supprimer</v-btn>

                                        <v-dialog :retain-focus="false" v-model="filebrowser" scrollable persistent max-width="1024" min-width="1024">

                                            <v-card class="mx-auto">
                                                <v-card-title class="grey lighten-2 subtitle-1">Gestionnaire de fichier</v-card-title>

                                                <Skeleton v-if="skeleton"></Skeleton>
                                                <FileBrowser v-else @picked="pickFile" :files="files" :filebrowser="filebrowser"></FileBrowser>

                                                <v-divider></v-divider>
                                                <v-card-actions>
                                                    <v-btn @click.stop="browse(false)" depressed class="ma-2" tile color="secondary" small>Annuler</v-btn>
                                                </v-card-actions>
                                            </v-card>

                                        </v-dialog>

                                    </div>
                                </v-sheet>
                            </v-card-text>

                        </v-card>

                    </v-col>

                    <v-col lg="4" class="px-3">
                        <v-card>

                            <v-card-text>
                                <p class="body-1 mb-0">Nos offres</p>
                                <v-sheet class="grey lighten-4 mt-1">
                                    <tiptap-vuetify
                                    v-model.trim="$v.form.offers.$model"
                                    :extensions="editor.config.extensions">
                                    </tiptap-vuetify>
                                </v-sheet>
                            </v-card-text>

                            <v-card-text>
                                <p class="body-1 mb-0">Nos besoins</p>
                                <v-sheet class="grey lighten-4 mt-1">
                                    <tiptap-vuetify
                                    v-model.trim="$v.form.needs.$model"
                                    :extensions="editor.config.extensions">
                                    </tiptap-vuetify>
                                </v-sheet>
                            </v-card-text>

                            <v-divider class="my-3"></v-divider>

                        </v-card>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="12">
                        <v-divider class="my-4"></v-divider>
                    </v-col>
                    <v-col cols="12">
                        <v-btn type="submit" :disabled="$v.form.$invalid" depressed color="primary" @click.prevent="store">Enregistrer</v-btn>
                    </v-col>
                </v-row>
            </v-container>

        </v-form>

    </div>
</template>

<script>
// vuex
import { mapGetters } from 'vuex'
import Skeleton from '@/views/shared/Skeleton'
import FileBrowser from '@/views/shared/FileBrowser'
import { required, numeric, url, email } from 'vuelidate/lib/validators'
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Paragraph, BulletList, OrderedList, ListItem, Link, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'

export default {
    name: 'StoreCompany',
    components: { TiptapVuetify, FileBrowser, Skeleton },
    data () {
        return {
            form: {
                name: null,
                organization_id: null,
                activity_id: null,
                zone_id: null,
                country_id: null,
                file_id: null,
                contacts: [],
                websites: [],
                emails: [],
                address: null,
                creation_date: null,
                reference_num: null,
                employees: null,
                turnover: null,
                offers: null,
                needs: null,
            },
            editor: {
                config: {
                    extensions: [
                        History,
                        Link,
                        Underline,
                        Strike,
                        Italic,
                        ListItem,
                        BulletList,
                        OrderedList,
                        [Heading, {
                            options: {
                                levels: [1, 2, 3, 4, 5, 6],
                            },
                        }],
                        Bold,
                        HorizontalRule,
                        Paragraph,
                        HardBreak,
                    ],
                },
            },
            products: [],
            filebrowser: false,
            skeleton: false,
        }
    },
    validations: { // validation form
        form: {
            name: { required },
            organization_id: { numeric },
            activity_id: { numeric },
            zone_id: { numeric },
            country_id: { numeric },
            file_id: { numeric },
            contacts: {
                $each: { numeric },
            },
            websites: {
                $each: { url },
            },
            emails: {
                $each: { email },
            },
            address: {},
            creation_date: {},
            reference_num: {},
            employees: { numeric },
            turnover: { numeric },
            offers: {},
            needs: {},
        }
    },
    computed: {
        ...mapGetters({
            organizations: 'organizations/organizations',
            activities: 'activities/activities',
            zones: 'zones/zones',
            countries: 'countries/countries',
            files: 'files/files',
        })
    },
    methods: {
        // remove array items by value
        remove (arr, value) {
            const index = arr.indexOf(value)
            if (index > -1) { arr.splice(index, 1) }
            return arr
        },
        // store a newly created resource in storage
        store () {
            this.$store
                .dispatch('companies/store', this.$v.form.$model)
                .then(() => {
                    this.$router.push({ name: 'Companies' })
                })
        },
        // browse file
        browse (value) {
            this.filebrowser = value
        },
        // pick a file
        pickFile (value) {
            this.form.file_id = value.id
            this.filebrowser = false
        },
        unPickFile () {
            this.form.file_id = null
        },
    },
    created () {
        // get a listing of the resource
        this.$store.dispatch('organizations/index')
        this.$store.dispatch('activities/index')
        this.$store.dispatch('zones/index')
        this.$store.dispatch('countries/index')
        this.$store
            .dispatch('files/index')
            .then(() => {
                this.skeleton = false
            })
    }
}
</script>

<style lang="scss" scope>
    // scss
    .products-wrapper {
        max-height: 15rem;
        overflow: scroll;
        overflow-x: auto;
    }
</style>
