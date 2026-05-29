<template>
  <div class="articles-page">
    <el-card>
      <template #header>
        <span>文章管理</span>
      </template>
      <div class="table-wrapper">
      <el-table :data="articles" style="width: 100%" border stripe>
        <el-table-column prop="id" label="ID" width="80" align="center" />
        <el-table-column prop="title" label="标题" min-width="150" show-overflow-tooltip />
        <el-table-column prop="tag" label="标签" width="100" align="center">
          <template #default="scope">
            <el-tag type="primary">{{ scope.row.tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="neirong" label="内容摘要" min-width="200" show-overflow-tooltip />
        <el-table-column prop="description" label="描述" min-width="150" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ scope.row.description || '暂无描述' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="发布时间" width="180" align="center" />
        <el-table-column prop="state" label="状态" width="100" align="center">
          <template #default="scope">
            <el-tag :type="scope.row.state === 2 ? 'success' : scope.row.state === 1 ? 'warning' : 'danger'">
              {{ scope.row.state === 2 ? '已上架' : scope.row.state === 1 ? '未上架' : '已删除' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pageViews" label="浏览量" width="100" align="center" />
        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template #default="scope">
            <el-button size="small" type="success" icon="Edit" @click="editArticle(scope.row)">修改</el-button>
            <el-button size="small" type="primary" icon="Setting" @click="openSetDialog(scope.row)">设置</el-button>
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

    <!-- 设置状态弹框 -->
    <el-dialog v-model="dialogVisible" title="设置文章状态" width="400px" :fullscreen="isMobile">
      <el-form label-width="80px">
        <el-form-item label="文章标题">
          <span>{{ currentArticle.title }}</span>
        </el-form-item>
        <el-form-item label="文章状态">
          <el-select v-model="currentArticle.state" placeholder="请选择状态">
            <el-option label="已删除" :value="0" />
            <el-option label="未上架" :value="1" />
            <el-option label="已上架" :value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitState">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import request from '../../utils/request'
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  name: 'ArticlesPage',
  data() {
    return {
      articles: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      currentArticle: {},
      isMobile: window.innerWidth <= 768
    }
  },
  methods: {
    // 获取所有文章
    getArticles() {
      const that = this
      request({
        url: '/article/getAllArticle?pageNo='+this.currentPage+'&pageSize='+this.pageSize,
        method: 'get',
      }).then((res) => { 
        if (res.code === 200) {
          that.articles = res.data.records;
          that.total = res.data.total;
        } else {
        }
      }).catch((error) => {
        that.$message.success("失败")
      });
    },
    // 跳转编辑文章
    editArticle(row) {
      this.$router.push('/admin/editor/' + row.id);
    },
    // 处理每页条数改变
    handleSizeChange(val) {
      console.log("当前每页条数"+val);
      
      this.pageSize = val;
      this.currentPage = 1;
      this.getArticles();
    },
    // 处理当前页改变
    handleCurrentChange(val) {
      console.log("当前页码"+val);
      this.currentPage = val;
      this.getArticles();
    },
    // 打开设置弹框
    openSetDialog(row) {
      this.currentArticle = { ...row };
      this.dialogVisible = true;
    },
    // 提交状态修改
    submitState() {
      request({
        url: '/article/updateArticle',
        method: 'put',
        data: {
          id: this.currentArticle.id,
          state: this.currentArticle.state
        }
      }).then((res) => {
        if (res.code === 200) {
          this.$message.success('修改成功');
          this.dialogVisible = false;
          this.getArticles();
        } else {
          this.$message.error(res.message || '修改失败');
        }
      }).catch(() => {
        this.$message.error('修改失败');
      });
    }
  },
  mounted() {
    // 页面加载时获取文章列表
    this.getArticles();
  }
}
</script>

<style scoped>
.articles-page {
  padding: 0;
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
