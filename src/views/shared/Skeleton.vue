<template>

    <v-container fluid>
        <v-row>
            <v-col lg="4">
                <v-skeleton-loader type="card" class="mx-auto"></v-skeleton-loader>
                <v-skeleton-loader type="list-item-avatar-three-line" class="mx-auto mt-3"></v-skeleton-loader>
            </v-col>
            <v-col lg="4">
                <v-skeleton-loader type="card" class="mx-auto"></v-skeleton-loader>
                <v-skeleton-loader type="list-item-avatar-three-line" class="mx-auto mt-3"></v-skeleton-loader>
            </v-col>
            <v-col lg="4">
                <v-skeleton-loader type="card" class="mx-auto"></v-skeleton-loader>
                <v-skeleton-loader type="list-item-avatar-three-line" class="mx-auto mt-3"></v-skeleton-loader>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
export default {
    name: 'Skeleton',
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
