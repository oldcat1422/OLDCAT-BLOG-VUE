<template>
    <div class="mainbac">
        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            :background-color="'#FFFFFF'" :text-color="'#000000'" :active-text-color="'blue'" :router="true">
            <el-menu-item index="/">
                <el-icon>
                    <Back />
                </el-icon>
                <span>返回前台</span>
            </el-menu-item>
            <el-menu-item index="/bac/dashboard">
                <el-icon>
                    <House />
                </el-icon>
                <span>主页</span>
            </el-menu-item>
            <el-sub-menu index="2">
                <template #title>
                    <el-icon>
                        <location />
                    </el-icon>
                    <span>文章管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/bac/editor">
                        <el-icon>
                            <DocumentAdd />
                        </el-icon>
                        <span>写文章</span>
                    </el-menu-item>
                    <el-menu-item index="/bac/articlesetting"><el-icon>
                            <Connection />
                        </el-icon>文章设置</el-menu-item>
                    <el-menu-item index="/bac/recycle"><el-icon>
                            <Delete />
                        </el-icon>回收站</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
            <el-menu-item index="/bac/tag">
                <el-icon>
                    <setting />
                </el-icon>
                <span>Tag管理</span>
            </el-menu-item>
            <el-menu-item index="4">
                <el-icon>
                    <setting />
                </el-icon>
                <span>4Four</span>
            </el-menu-item>
        </el-menu>
    </div>

</template>


<script>
import router from '../../router';
import { House, DocumentAdd, Connection, Setting, Location } from '@element-plus/icons-vue';

export default {
    name: 'BacHead',
    components: {
        House,
        DocumentAdd,
        Connection,
        Setting,
        Location
    },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style scoped>
.mainbac {
    height: 100%;
}

.el-menu-vertical-demo {
    height: 100%;
}
</style>
