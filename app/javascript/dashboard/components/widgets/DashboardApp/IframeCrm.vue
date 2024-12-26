<!-- IframePage.vue -->
<template>
    <div class="iframe-container">
        <iframe
        :src="iframeURL"
        class="iframe-full"
        frameborder="0"
        @load="onIframeLoad"
        ></iframe>
        <LoadingState v-if="iframeLoading" message="Carregando..." />
    </div>
</template>

<script>
    import LoadingState from 'dashboard/components/widgets/LoadingState.vue';

    export default {
        components: {
            LoadingState,
        },
        data() {
            return {
            iframeLoading: true,
            };
        },
        computed: {
            // Alteração feita Conexão Azul
            iframeURL() {
            const accountId = this.$route.params.accountId;
            console.log('Account ID:', accountId); // Log para depuração
            return `https://app.conexaoazul.com/web`;
            },
            // Alteração feita Conexão Azul
        },
        methods: {
            onIframeLoad() {
            this.iframeLoading = false;
            },
        },
        // Alteração feita Conexão Azul
        mounted() {
            console.log('Route params:', this.$route.params); // Log para verificar os parâmetros da rota
        },
        // Alteração feita Conexão Azul
    };
</script>

<style scoped>
    .iframe-container {
        width: 100%;
        height: 100vh;
        position: relative;
    }
    .iframe-full {
        width: 100%;
        height: 100%;
        border: none;
    }
</style>