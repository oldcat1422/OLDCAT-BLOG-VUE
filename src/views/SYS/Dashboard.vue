<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <!-- 数据统计卡片 -->
      <el-col :xs="12" :sm="12" :md="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" style="background: #42b883">
              <el-icon><Document /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ totalData.articleNumber || 0 }}</div>
              <div class="stat-label">文章总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" style="background: #ff6b6b">
              <el-icon><User /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ totalData.userNumber || 0 }}</div>
              <div class="stat-label">用户总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" style="background: #ffa502">
              <el-icon><View /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ totalData.pageViews || 0 }}</div>
              <div class="stat-label">访问量</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" style="background: #a55eea">
              <el-icon><ChatDotRound /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ totalData.tagNumber || 0 }}</div>
              <div class="stat-label">TAG总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 欢迎信息 -->
    <el-card class="welcome-card">
      <h2>欢迎回来，{{ userInfo?.username }}！</h2>
      <p>这是一个标准的后台管理界面，您可以在这里管理文章、用户和系统设置。</p>
    </el-card>

  </div>
</template>

<script>
import { Document, User, View, ChatDotRound, Plus, Setting, DataAnalysis } from '@element-plus/icons-vue'
import { mapGetters } from 'vuex'
import request from '../../utils/request'

export default {
  name: 'AdminDashboard',
  components: {
    Document,
    User,
    View,
    ChatDotRound,
    Plus,
    Setting,
    DataAnalysis
  },
  data() {
    return {
      totalData: {}
    }
  },
  computed: {
    ...mapGetters('user', ['userInfo'])
  },
  methods: {
    goToEditor() {
      this.$router.push('/admin/editor')
    },
    getTotalNumber() {
      request({
        url: '/syspara/getTotalNumber',
        method: 'get',
      }).then((res) => {
        if (res.code === 200) {
          this.totalData = res.data;
        }
      });
    }
  },
  mounted() {
    this.getTotalNumber();
  }
}
</script>

<style scoped>
.dashboard {
  padding: 0;
}

/* 统计卡片 */
.stat-card {
  margin-bottom: 20px;
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 28px;
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #999;
}

/* 欢迎卡片 */
.welcome-card {
  margin-bottom: 20px;
}

.welcome-card h2 {
  color: #42b883;
  margin-bottom: 12px;
}

.welcome-card p {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}

/* 快捷操作 */
.quick-actions {
  margin-bottom: 20px;
}

.quick-actions .el-button {
  height: 60px;
  font-size: 16px;
}
</style>

