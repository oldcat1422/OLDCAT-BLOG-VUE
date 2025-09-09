<template>
    <div class="bacmain">
        <el-container class="wai">
            <el-container class="xia">
                <el-aside width="200px">
                    <BacAside />
                </el-aside>
                <el-main><div class="edit"><router-view></router-view></div></el-main>
            </el-container>
        </el-container>
    </div>

</template>

<script>
import BacAside from "../../components/BacAside/BacAside.vue";
export default {
    name: 'Bac',
    components: {
        BacAside,
    },
    data() {
        return {

        }
    },
}
</script>

<style scoped>
.bachead{
    /* 暂时填充颜色 */
    background-color: #2D3748;
}
.wai{
    height: 100%;
}
.bacmain {
    height: 100vh;
    width: 100vw;
    /* background-color: aqua; */
}
.xia{
    height: 100%;
}
/* .edit{
    height: 90%;
} */
</style>
