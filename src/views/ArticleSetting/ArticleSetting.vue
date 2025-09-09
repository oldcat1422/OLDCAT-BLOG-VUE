<template>
    <div>
        <h4>状态：0已删除。1未设置。2已上架。</h4>
        <div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="id" label="ID" width="100" />
                <el-table-column prop="title" label="标题" width="200" />
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
        <!-- 编辑按钮 -->
        <div>
            <el-drawer v-model="drawer" title="文章设置" :direction="direction" :before-close="handleClose">
                <el-form :model="form" label-width="auto" style="max-width: 600px">
                    <el-form-item label="ID">
                        <el-popover class="box-item" content="该项暂不支持修改" placement="top">
                            <template #reference>
                                <el-input v-model="form.id" disabled />
                            </template>
                        </el-popover>
                    </el-form-item>
                    <el-form-item label="标题">
                        <el-input v-model="form.title" />
                    </el-form-item>
                    <el-form-item label="最后修改时间">
                        <el-popover class="box-item" content="该项暂不支持修改" placement="top">
                            <template #reference>
                                <el-input v-model="form.time" disabled />
                            </template>
                        </el-popover>
                    </el-form-item>
                    <el-form-item label="当前状态">
                        <el-select v-model="form.state" placeholder="please select your zone">
                            <el-option label="未设置" value="1" />
                            <el-option label="已上架" value="2" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="摘要">
                        <el-input v-model="form.description" />
                    </el-form-item>
                    <el-form-item label="标签">
                        <el-select v-model="form.tag" placeholder="please select your zone">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="配图">
                        <el-input v-model="form.description" />
                    </el-form-item>
                    <el-form-item label="浏览量">
                        <el-input v-model="form.pageViews" disabled />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-drawer>
        </div>
    </div>
</template>

<script>
import request from '../../utils/request'
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
    name: 'ArticleSetting',
    data() {
        return {
            total: '',
            tableData: '',
            tidaiURL: 'https://oldcatdata.oss-cn-hangzhou.aliyuncs.com/tidai.png',
            drawer: false,
            form: {},
        }
    },
    mounted() {
        this.getAllArticlePage();
    },
    methods: {
        //改变当前页数  第几页
        handleCurrentChange(val) {
            console.log(`current page: ${val}`)
            const that = this
            request({
                url: '/article/getAllArticle?pageNo=' + val,
                method: 'get'
            }).then(function (res) {
                that.tableData = res.data.records
            })
        },
        getAllArticlePage() {
            const that = this
            request({
                url: '/article/getAllArticle',
                method: 'get'
            }).then(function (res) {
                that.tableData = res.data.records
                that.total = res.data.total
            })
        },
        getOneArticle(id) {
            this.drawer = true
            const that = this
            request({
                url: '/public/article/getOneArticle?articleId=' + id,
                method: 'post',
            }).then(function (res) {
                console.log(res);
                that.form = res.data
            })
        }
    }
}
</script>

<style scoped></style>
