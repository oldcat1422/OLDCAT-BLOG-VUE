<template>
    <div>
        <el-button type="primary" circle @click="adddialog = true"><el-icon>
                <Plus />
            </el-icon></el-button>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="200" />
            <el-table-column prop="tag" label="TAG名称" width="200" />
            <el-table-column label="操作">
                <template v-slot:default="scope">
                    <el-button type="success" @click="open(scope.row.id)" circle><el-icon>
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
    <!-- 修改弹窗 -->
    <div>
        <el-dialog v-model="dialogVisible" title="修改TAG" width="500" :before-close="handleClose">
            <el-input v-model="tag.tag" placeholder="请输入文字......" />
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="updateTag()">
                        提交
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
    <!-- 添加弹窗 -->
    <div>
        <el-dialog v-model="adddialog" title="添加TAG" width="500" :before-close="handleClose">
            <el-input v-model="newtag.tag" placeholder="请输入文字......" />
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="adddialog = false">取消</el-button>
                    <el-button type="primary" @click="addTag()">
                        提交
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import request from '../../utils/request'
import { ElMessage, ElMessageBox,ElNotification  } from 'element-plus'
export default {
    name: 'Tag',
    components: {

    },
    data() {
        return {
            total: '',
            tableData: '',
            dialogVisible: false,
            tag: '',
            deletedialog: false,
            newtag: {
                tag: ''
            },
            adddialog: false,
        }
    },
    mounted() {
        this.getAllTag()
    },
    methods: {
        //改变当前页数  第几页
        handleCurrentChange(val) {
            console.log(`current page: ${val}`)
            const that = this
            request({
                url: '/tag/getAllTag?pageNo=' + val,
                method: 'post'
            }).then(function (res) {
                console.log(res);
                that.tableData = res.data.records
            })
        },
        //打开时，获取tag内容
        openUpdate(id) {
            const that = this
            request({
                url: '/tag/getOneTag?id=' + id,
                method: 'post'
            }).then(function (res) {
                that.tag = res.data
            })
        },
        //挂载方法，获取页面信息
        getAllTag() {
            const that = this
            request({
                url: '/tag/getAllTag?pageNo=',
                method: 'post'
            }).then(function (res) {
                that.tableData = res.data.records
                that.total = res.data.total
            })
        },
        //点击修改按钮后发生
        open(id) {
            this.dialogVisible = true        //打开dialog
            this.openUpdate(id)              //获取tag内容
        },
        updateTag() {
            const that = this
            request({
                url: '/tag/updateTag',
                method: 'post',
                data: this.tag
            }).then(function (res) {
                if (res.code === 200) {
                    ElNotification({
                        title: '提示',
                        type:'success',
                        message: '修改成功',
                    })
                }
                that.dialogVisible = false
                that.getAllTag()
            })
        },
        openDelete(id) {
            ElMessageBox.confirm(
                '请再次确认是否删除',
                'Warning',
                {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'error',
                }
            ).then(() => {
                this.deleteTag(id)
            }).catch(() => {
                ElMessage({
                    type: 'info',
                    message: '删除操作取消',
                })
            })
        },
        deleteTag(id) {
            const that = this
            request({
                url: '/tag/deleteTag?id=' + id,
                method: 'post',
            }).then(function (res) {
                if (res.code === 200) {
                    ElMessage({
                        type: 'success',
                        message: '删除成功',
                    })
                }
                that.getAllTag()
            })
        },
        addTag() {
            const that = this
            request({
                url: '/tag/addTag',
                method: 'put',
                data: this.newtag
            }).then(function (res) {
                if (res.code === 200) {
                    ElMessage({
                        type: 'success',
                        message: '添加成功',
                    })
                }
                that.getAllTag()
                that.newtag.tag = ''
                that.adddialog = false
            })
        },
    }
}
</script>

<style scoped></style>
