<template>
  <div class="users-page">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
          <el-button type="primary" size="small" @click="showAddDialog">
            <el-icon><Plus /></el-icon>
            添加用户
          </el-button>
        </div>
      </template>
      <div class="table-wrapper">
      <el-table :data="users" style="width: 100%" border stripe>
        <el-table-column prop="id" label="ID" width="80" align="center" />
        <el-table-column prop="username" label="用户名" min-width="150" />
        <el-table-column prop="password" label="密码" min-width="150" />
        <el-table-column prop="role" label="角色" width="120" align="center">
          <template #default="scope">
            <el-tag :type="scope.row.role === 1 ? 'danger' : 'primary'">
              {{ scope.row.role === 1 ? '管理员' : '普通用户' }}
            </el-tag>
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

    <!-- 添加/编辑用户对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="450px" :fullscreen="isMobile">
      <el-form :model="userForm" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="userForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userForm.password" type="password" show-password placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="userForm.role" placeholder="请选择角色">
            <el-option label="管理员" :value="1" />
            <el-option label="普通用户" :value="0" />
          </el-select>
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
  name: 'UsersPage',
  components: {
    Plus
  },
  data() {
    return {
      users: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      dialogTitle: '添加用户',
      userForm: {
        id: null,
        username: '',
        password: '',
        role: 0
      },
      isMobile: window.innerWidth <= 768
    }
  },
  methods: {
    // 获取用户列表
    getUserList() {
      request({
        url: '/user/getAllUser?pageNo=' + this.currentPage + '&pageSize=' + this.pageSize,
        method: 'post',
      }).then((res) => {
        if (res.code === 200) {
          this.users = res.data.records;
          this.total = res.data.total;
        }
      }).catch(() => {
        this.$message.error('获取用户列表失败');
      });
    },
    // 处理每页条数改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getUserList();
    },
    // 处理当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserList();
    },
    // 打开添加对话框
    showAddDialog() {
      this.dialogTitle = '添加用户';
      this.userForm = {
        id: null,
        username: '',
        password: '',
        role: 0
      };
      this.dialogVisible = true;
    },
    // 打开编辑对话框
    handleEdit(row) {
      this.dialogTitle = '编辑用户';
      this.userForm = { ...row };
      this.dialogVisible = true;
    },
    // 删除用户
    handleDelete(row) {
      ElMessageBox.confirm(
        `确定要删除用户"${row.username}"吗？`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        request({
          url: '/user/deleteUser',
          method: 'post',
          params: { id: row.id }
        }).then((res) => {
          if (res.code === 200) {
            this.$message.success('删除成功');
            this.getUserList();
          } else {
            this.$message.error(res.message || '删除失败');
          }
        });
      }).catch(() => {});
    },
    // 保存用户（新增/编辑）
    handleSave() {
      if (!this.userForm.username) {
        ElMessage.warning('请输入用户名');
        return;
      }
      if (!this.userForm.password) {
        ElMessage.warning('请输入密码');
        return;
      }

      if (this.userForm.id) {
        // 编辑
        request({
          url: '/user/updateUser',
          method: 'post',
          data: this.userForm
        }).then((res) => {
          if (res.code === 200) {
            this.$message.success('修改成功');
            this.dialogVisible = false;
            this.getUserList();
          } else {
            this.$message.error(res.message || '修改失败');
          }
        });
      } else {
        // 添加
        request({
          url: '/user/addUser',
          method: 'put',
          data: this.userForm
        }).then((res) => {
          if (res.code === 200) {
            this.$message.success('添加成功');
            this.dialogVisible = false;
            this.getUserList();
          } else {
            this.$message.error(res.message || '添加失败');
          }
        });
      }
    }
  },
  mounted() {
    this.getUserList();
  }
}
</script>

<style scoped>
.users-page {
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
