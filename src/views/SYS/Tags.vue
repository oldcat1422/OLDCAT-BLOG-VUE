<template>
  <div class="tags-page">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>标签管理</span>
          <el-button type="primary" size="small" @click="showAddDialog">
            <el-icon><Plus /></el-icon>
            添加标签
          </el-button>
        </div>
      </template>
      <div class="table-wrapper">
      <el-table :data="tags" style="width: 100%" border stripe>
        <el-table-column prop="id" label="ID" width="80" align="center" />
        <el-table-column prop="tag" label="标签名称" min-width="200">
          <template #default="scope">
            <el-tag type="primary">{{ scope.row.tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template #default="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 添加/编辑标签对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="450px" :fullscreen="isMobile">
      <el-form :model="tagForm" label-width="80px">
        <el-form-item label="标签名称">
          <el-input v-model="tagForm.tag" placeholder="请输入标签名称" />
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
  name: 'TagsPage',
  components: {
    Plus
  },
  data() {
    return {
      tags: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      dialogTitle: '添加标签',
      tagForm: {
        id: null,
        tag: ''
      },
      isMobile: window.innerWidth <= 768
    }
  },
  methods: {
    // 获取标签列表
    getTags() {
      request({
        url: '/tag/getAllTag?pageNo=' + this.currentPage + '&pageSize=' + this.pageSize,
        method: 'post',
      }).then((res) => {
        if (res.code === 200) {
          this.tags = res.data.records;
          this.total = res.data.total;
        }
      }).catch(() => {
        this.$message.error('获取标签列表失败');
      });
    },
    // 处理每页条数改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getTags();
    },
    // 处理当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTags();
    },
    // 打开添加对话框
    showAddDialog() {
      this.dialogTitle = '添加标签';
      this.tagForm = {
        id: null,
        tag: ''
      };
      this.dialogVisible = true;
    },
    // 打开编辑对话框
    handleEdit(row) {
      this.dialogTitle = '编辑标签';
      this.tagForm = { ...row };
      this.dialogVisible = true;
    },
    // 删除标签
    handleDelete(row) {
      ElMessageBox.confirm(
        `确定要删除标签"${row.tag}"吗？`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        request({
          url: '/tag/deleteTag',
          method: 'post',
          params: { id: row.id }
        }).then((res) => {
          if (res.code === 200) {
            this.$message.success('删除成功');
            this.getTags();
          } else {
            this.$message.error(res.message || '删除失败');
          }
        });
      }).catch(() => {});
    },
    // 保存标签（新增/编辑）
    handleSave() {
      if (!this.tagForm.tag) {
        ElMessage.warning('请输入标签名称');
        return;
      }

      if (this.tagForm.id) {
        // 编辑
        request({
          url: '/tag/updateTag',
          method: 'post',
          data: this.tagForm
        }).then((res) => {
          if (res.code === 200) {
            this.$message.success('修改成功');
            this.dialogVisible = false;
            this.getTags();
          } else {
            this.$message.error(res.message || '修改失败');
          }
        });
      } else {
        // 添加
        request({
          url: '/tag/addTag',
          method: 'put',
          data: this.tagForm
        }).then((res) => {
          if (res.code === 200) {
            this.$message.success('添加成功');
            this.dialogVisible = false;
            this.getTags();
          } else {
            this.$message.error(res.message || '添加失败');
          }
        });
      }
    }
  },
  mounted() {
    this.getTags();
  }
}
</script>

<style scoped>
.tags-page {
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
