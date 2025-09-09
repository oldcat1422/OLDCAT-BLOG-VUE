<template>
    <div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="100" />
            <el-table-column prop="title" label="标题" width="100" />
            <el-table-column prop="neirong" label="正文" width="200">
                内容暂不展示
            </el-table-column>
            <el-table-column prop="time" label="最后修改时间" width="180" />
            <el-table-column prop="state" label="状态" width="90" />
            <el-table-column prop="description" label="摘要" width="200" />
            <el-table-column prop="tag" label="标签" width="100">
                <template v-slot:default="scope">
                    <el-tag type="error" v-if="scope.row.tag === null">未设置</el-tag>
                    <el-tag type="primary" v-else>{{ scope.row.tag }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="image" label="图片" width="200">
                <template v-slot:default="scope">
                    <el-image :src="tidaiURL" alt="文章图片" v-if="scope.row.image === null"
                        style="height: 54px;width: 100px; object-fit: cover" />
                    <el-image :src="scope.row.image" alt="文章图片" v-else
                        style="height: 54px;width: 100px; object-fit: cover" />
                </template>
            </el-table-column>
            <el-table-column prop="pageViews" label="浏览量" width="110" />
            <el-table-column label="操作">
                <template v-slot:default="scope">
                    <el-button type="success" @click="getOneArticle(scope.row.id)" circle><el-icon>
                            <EditPen />
                        </el-icon></el-button>
                    <el-button type="danger" @click="openDelete(scope.row.id)" circle><el-icon>
                            <Close />
                        </el-icon></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <!-- 分页 -->
    <div class="fenpage">
        <el-pagination :page-size="10" :background=true layout="total, prev, pager, next, jumper"
            :total="parseInt(total)" @current-change="handleCurrentChange" />
    </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import request from '../../utils/request'
export default {
    components: {

    },
    data() {
        return {
            tidaiURL: 'https://oldcatdata.oss-cn-hangzhou.aliyuncs.com/tidai.png',
            total: '',
            tableData:'',
        }
    },
    mounted() {
        this.recycle();

    },
    methods: {
        //改变当前页数  第几页
        handleCurrentChange(val) {
            console.log(`current page: ${val}`)
            const that = this
            request({
                url: '/article/recycle?pageNo=' + val,
                method: 'get'
            }).then(function (res) {
                that.tableData = res.data.records
            })
        },
        recycle() {
            const that = this
            request({
                url: '/article/recycle',
                method: 'post'
            }).then(function (res) {
                console.log(res);
                that.tableData = res.data.records
                that.total = res.data.total
            })
        },
    },

}
</script>

<style scoped></style>