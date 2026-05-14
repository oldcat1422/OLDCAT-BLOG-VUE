<template>
    <div class="main-container">
        <div class="header-container">
            <IndexHead />
        </div>
        <div class="content-container">
            <routerView></routerView>
        </div>
        <div class="footer-container">
            <IndexFooter />
        </div>
    </div>
</template>

<script>
import IndexHead from "@/components/IndexHead.vue";
import IndexFooter from "@/components/IndexFooter/IndexFooter.vue";
export default {
    name: 'Main',
    components: {
        IndexHead,
        IndexFooter
    },
    data() {
        return {

        }
    },
}
</script>

<style scoped>
.main-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.content-container {
    flex: 1;
}
</style>
