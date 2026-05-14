<template>
  <div class="settings-page">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>系统参数管理</span>
          <el-button type="primary" size="small" @click="showAddDialog">
            <el-icon>
              <Plus />
            </el-icon>
            添加参数
          </el-button>
        </div>
      </template>
      <div class="table-wrapper">
        <el-table :data="paraList" style="width: 100%" border stripe>
          <el-table-column prop="paraId" label="ID" width="80" align="center" />
          <el-table-column prop="paraName" label="参数名称" min-width="150" />
          <el-table-column prop="paraVal" label="参数值" min-width="200" />
          <el-table-column prop="paraDescription" label="描述" min-width="200" />
          <el-table-column label="操作" width="200" align="center">
            <template #default="scope">
              <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-container">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
          :total="total" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </el-card>

    <!-- 添加/编辑参数对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px" :fullscreen="isMobile">
      <el-form :model="paraForm" label-width="80px">
        <el-form-item label="参数名称">
          <el-input v-model="paraForm.paraName" placeholder="请输入参数名称" />
        </el-form-item>
        <el-form-item label="参数值">
          <el-input v-model="paraForm.paraVal" placeholder="请输入参数值" type="textarea" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="paraForm.paraDescription" type="textarea" :rows="3" placeholder="请输入描述" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from '../../utils/request'

export default {
  name: 'SettingsPage',
  components: {
    Plus
  },
  data() {
    return {
      paraList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      dialogTitle: '添加参数',
      paraForm: {
        paraId: null,
        paraName: '',
        paraVal: '',
        paraDescription: ''
      },
      isMobile: window.innerWidth <= 768
    }
  },
  methods: {
    // 获取参数列表
    getParaList() {
      request({
        url: '/syspara/getAllPara',
        method: 'get',
        params: {
          pageNo: this.currentPage,
          pageSize: this.pageSize
        }
      }).then((res) => {
        if (res.code === 200) {
          this.paraList = res.data.records;
          this.total = res.data.total;
        }
      }).catch(() => {
        this.$message.error('获取参数列表失败');
      });
    },
    // 处理每页条数改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getParaList();
    },
    // 处理当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getParaList();
    },
    // 打开添加对话框
    showAddDialog() {
      this.dialogTitle = '添加参数';
      this.paraForm = {
        paraId: null,
        paraName: '',
        paraVal: '',
        paraDescription: ''
      };
      this.dialogVisible = true;
    },
    // 打开编辑对话框
    handleEdit(row) {
      this.dialogTitle = '编辑参数';
      this.paraForm = { ...row };
      this.dialogVisible = true;
    },
    // 删除参数
    handleDelete(row) {
      ElMessageBox.confirm(
        `确定要删除参数"${row.paraName}"吗？`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        request({
          url: '/syspara/deletePara',
          method: 'post',
          params: { paraId: row.paraId }
        }).then((res) => {
          if (res.code === 200) {
            this.$message.success('删除成功');
            this.getParaList();
          } else {
            this.$message.error(res.message || '删除失败');
          }
        });
      }).catch(() => { });
    },
    // 保存参数（新增/编辑）
    handleSave() {
      if (!this.paraForm.paraName) {
        ElMessage.warning('请输入参数名称');
        return;
      }

      if (this.paraForm.paraId) {
        // 编辑
        const that = this
        request({
          url: '/syspara/updatePara',
          method: 'post',
          data: this.paraForm
        }).then((res) => {
          if (res.code === 200) {
            that.$message.success('修改成功');
            that.dialogVisible = false;
            that.getParaList();
          } else {
            that.$message.error(res.message || '修改失败');
          }
        });
      } else {
        // 添加
        const that = this
        request({
          url: '/syspara/addPara',
          method: 'put',
          data: this.paraForm
        }).then((res) => {
          if (res.code === 200) {
            that.$message.success('添加成功');
            that.dialogVisible = false;
            that.getParaList();
          } else {
            that.$message.error(res.message || '添加失败');
          }
        });
      }
    }
  },
  mounted() {
    this.getParaList();
  }
}
</script>

<style scoped>
.settings-page {
  padding: 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
}

/* 移动端适配 */
.table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

@media (max-width: 768px) {
  .card-header {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }

  .pagination-container {
    justify-content: center;
  }

  .pagination-container :deep(.el-pagination) {
    flex-wrap: wrap;
    justify-content: center;
  }

  .pagination-container :deep(.el-pagination__sizes),
  .pagination-container :deep(.el-pagination__jump) {
    display: none;
  }
}
</style>
