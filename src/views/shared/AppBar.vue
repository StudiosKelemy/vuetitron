<template>

    <v-app-bar app color="primary" flat dark>
        <div color="primary">
            <v-img
                max-width="150"
                src="@/assets/media/logotype_afrikaklub_white.svg">
            </v-img>
        </div>
        <v-divider vertical class="mx-5"></v-divider>
        <v-toolbar-title>

            <div class="d-flex align-center">
                <!--
                <div class="d-flex justify-center">
                    <v-btn @click.stop="back" tile icon color="white" depressed light>
                        <v-icon color="">mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-btn @click.stop="forward" tile icon class="mx-1" color="white" depressed light>
                        <v-icon color="">mdi-arrow-right</v-icon>
                    </v-btn>
                </div>
                -->
                <div class="d-flex justify-center">
                    <h3 class="ml-3" v-text="toolbarTitle"></h3>
                </div>
            </div>

        </v-toolbar-title>
    </v-app-bar>

</template>

<script>
export default {
    name: 'AppBar',
    props: ['toolbarTitle'],
    components: {},
    data () {
        return {
            //
        }
    },
    methods: {
        // go back
        back () {
            history.back()
        },
        forward () {
            console.log(this.$router)
            this.$router.go(1)
        }
    }
}
</script>
