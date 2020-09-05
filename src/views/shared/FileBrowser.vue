<template>

    <v-card-text id="filebrowser" class="pa-4">

        <v-container fluid class="" v-if="files">
            <v-row no-gutters>
                <v-col class="d-flex child-flex" md="2" v-for="(file, i) in files" :key="i">
                    <div class="d-flex flex-column">
                        <v-img @click.stop="pick(file)" :src="'http://api.afrikaklub.com/api/v1/admin/files/' + file.id"
                            fluid
                            aspect-ratio="1"
                            class="thumbnail ma-2 elevation-2">
                            <template v-slot:placeholder>
                                <v-row class="fill-height ma-0" align="center" justify="center">
                                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                </v-row>
                            </template>
                        </v-img>
                    </div>
                </v-col>
            </v-row>
        </v-container>

    </v-card-text>

</template>

<script>
export default {
    name: 'FileBrowser',
    props: ['filebrowser', 'files'],
    components: {},
    data () {
        return {
            file_id: null
        }
    },
    methods: {
        // pick a file
        pick (file) {
            this.$emit('picked', file)
        },
    },
    watch: {
        //
    },
    created () {
        //
    }
}
</script>
