<template>
  <div class="blog-container">
    <main class="main-content">
      <!-- 文章列表区 -->
      <section class="posts-grid">
        <div class="section-header">
          <h3>最新文章</h3>
        </div>
        <div v-if="posts.length > 0" class="post-cards">
          <article v-for="post in posts" :key="post.id" class="post-card">
            <div class="post-image">
              <img :src="post.image || 'https://img.jinha.vip/tidai.png'" alt="文章图片"
                style="width: 100%; height: 100%; object-fit: cover" />
            </div>
            <div class="post-info">
              <span class="post-category">{{ post.tag }}</span>
              <h4>{{ post.title }}</h4>
              <p>{{ post.description }}</p>
              <div class="post-footer">
                <span class="post-date">{{ post.time }}</span>
                <button @click="readMore(post.id)" class="read-more">点击阅读</button>
              </div>
            </div>
          </article>
        </div>
        <div v-else class="no-results">
          未找到相关文章
        </div>
        <!-- 分页组件 -->
        <div class="pagination-container">
          <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[6, 10, 15, 20]"
            layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        </div>
      </section>

      <!-- 侧边栏 -->
      <aside class="sidebar">
        <div class="sidebar-widget">
          <h4>个人简介</h4>
          <p>我不是程序员。💻</p>
        </div>

        <div class="sidebar-widget">
          <h4>文章分类</h4>
          <ul>
            <li v-for="cat in categories" :key="cat" @click="changeCategory(cat)"
              :class="{ active: selectedCategory === cat }">
              {{ cat }}
            </li>
          </ul>
        </div>
      </aside>
    </main>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'BlogHome',
  components: {
  },
  data() {
    return {
      selectedCategory: '全部',
      categories: ['全部', 'Vue', 'JavaScript', 'CSS', '后端'],
      posts: [],
      // 分页相关
      currentPage: 1,
      pageSize: 6,
      total: 0
    };
  },
  // Options API: computed
  computed: {
    filteredCategory() {
      return this.selectedCategory === '全部' ? null : this.selectedCategory;
    }
  },
  // Options API: methods
  methods: {
    getAllArticlePage() {
      const that = this
      request({
        url: '/public/article/getAllArticlePage',
        method: 'post',
        params: {
          pageNo: this.currentPage,
          pageSize: this.pageSize,
          tagId: this.filteredCategory
        }
      }).then(res => {
        if (res.code === 200) {
          that.posts = res.data.records
          that.total = res.data.total
        }
      })
    },
    // 切换每页显示条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getAllArticlePage();
    },
    // 切换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAllArticlePage();
    },
    // 切换分类
    changeCategory(cat) {
      this.selectedCategory = cat;
      this.currentPage = 1;
      this.getAllArticlePage();
    },
    readMore(id) {
      this.$router.push(`/main/readarticle/${id}`)
    }
  },
  mounted() {
    this.getAllArticlePage()
  },
};
</script>

<style scoped>
/* 基础样式 */
.blog-container {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #333;
  line-height: 1.6;
  background-color: #f9f9f9;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}



/* 英雄区 */
.hero-section {
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  color: white;
  padding: 60px 20px;
  text-align: center;
}

.hero-content h2 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

/* 主体内容布局 */
.main-content {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 40px;
  padding: 40px 20px;
}

/* 搜索和标题 */
.section-header {
  margin-bottom: 20px;
}

/* 文章卡片 */
.post-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
}

.post-card {
  height: 200px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  transition: transform 0.3s;
}

.post-card:hover {
  transform: translateY(-5px);
}

.post-image {
  width: 200px;
  height: 100%;
  flex-shrink: 0;
}

.post-info {
  padding: 20px;
  flex-grow: 1;
}

.post-category {
  font-size: 0.8rem;
  background: #eee;
  padding: 2px 8px;
  border-radius: 4px;
  color: #666;
}

.post-info h4 {
  margin: 10px 0;
  font-size: 1.3rem;
}

.post-info p {
  color: #777;
  font-size: 0.95rem;
}

.post-footer {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-date {
  font-size: 0.85rem;
  color: #999;
}

.read-more {
  background: none;
  border: 1px solid #42b883;
  color: #42b883;
  padding: 5px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.read-more:hover {
  background: #42b883;
  color: white;
}

/* 侧边栏样式 */
.sidebar-widget {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.sidebar-widget h4 {
  border-left: 4px solid #42b883;
  padding-left: 10px;
  margin-bottom: 15px;
}

.sidebar-widget ul {
  list-style: none;
  padding: 0;
}

.sidebar-widget li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  color: #666;
}

.sidebar-widget li:hover,
.sidebar-widget li.active {
  color: #42b883;
  font-weight: bold;
}

/* 分页样式 */
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  padding: 20px 0;
}

/* 页脚 */
.footer {
  text-align: center;
  padding: 40px;
  background: #35495e;
  color: white;
  margin-top: 40px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
    padding: 20px 12px;
    gap: 20px;
  }

  .post-card {
    flex-direction: column;
    height: auto;
  }

  .post-image {
    width: 100%;
    height: 150px;
  }

  .post-info h4 {
    font-size: 1.1rem;
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