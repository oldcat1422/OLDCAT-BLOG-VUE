<template>
    <div>
        <IndexHead />
    </div>
    <div>
        <routerView></routerView>
    </div>
</template>

<script>
import IndexHead from "../../components/IndexHead/IndexHead.vue";
export default {
    name: 'Main',
    components: {
        IndexHead,
    },
    data() {
        return {

        }
    },
}
</script>

<style scoped></style>
