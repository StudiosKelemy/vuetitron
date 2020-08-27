<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            Lorems ipsum dolor sit amet consectetur adipisicing elit. Recusandae rem ipsa nemo impedit atque animi, laborum architecto eum, consequuntur, facilis sint vel beatae est error sapiente quibusdam unde minus iste.
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'App',
    components: {},
    data: () => ({
        //
    })
}
</script>
