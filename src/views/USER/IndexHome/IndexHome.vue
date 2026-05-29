<template>
  <div class="blog-container">
    <!-- Hero 横幅区 -->
    <section class="hero-section">
      <div class="hero-bg"></div>
      <div class="hero-particles">
        <span v-for="n in 6" :key="n" class="particle" :style="particleStyle(n)"></span>
      </div>
      <div class="hero-content">
        <h1 class="hero-title">OLDCATBLOG</h1>
        <!-- <p class="hero-subtitle">分享技术 · 记录生活 · 持续成长</p> -->
      </div>
      <div class="hero-wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z" fill="#f5f7f5" />
        </svg>
      </div>
    </section>

    <main class="main-content">
      <!-- 文章列表区 -->
      <section class="posts-grid">
        <div class="section-header">
          <h3>
            最新文章
          </h3>
          <span class="article-count">共 {{ total }} 篇</span>
        </div>
        <div v-if="posts.length > 0" class="post-cards">
          <article v-for="(post, index) in posts" :key="post.id" class="post-card"
            :style="{ animationDelay: `${index * 0.08}s` }">
            <div class="post-image">
              <img :src="post.image || 'https://img.jinha.vip/tidai.png'" alt="文章图片" />
            </div>
            <div class="post-info">
              <div class="post-meta-top">
                <span class="post-category">{{ post.tag }}</span>
                <span class="post-date">{{ post.time }}</span>
              </div>
              <h4 @click="readMore(post.id)">{{ post.title }}</h4>
              <p>{{ post.description }}</p>
              <div class="post-footer">
                <button @click="readMore(post.id)" class="read-more">
                  阅读全文
                  <span class="arrow">→</span>
                </button>
              </div>
            </div>
          </article>
        </div>
        <div v-else class="no-results">
          <span class="no-results-icon">📝</span>
          <p>暂无文章，敬请期待...</p>
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

        <!-- 公告栏 -->
        <div class="sidebar-widget notice-widget">
          <h4>
            公告
          </h4>
          <p class="notice-text">世界这么大，我该去哪儿找你</p>
        </div>

        <!-- 文章分类 -->
        <div class="sidebar-widget">
          <h4>
            文章分类
          </h4>
          <ul class="category-list">
            <li v-for="cat in categories" :key="cat" @click="changeCategory(cat)"
              :class="{ active: selectedCategory === cat }">
              <span class="cat-name">{{ cat }}</span>
              <span class="cat-count">{{ cat === '全部' ? total : '' }}</span>
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
  computed: {
    filteredCategory() {
      return this.selectedCategory === '全部' ? null : this.selectedCategory;
    }
  },
  methods: {
    particleStyle(n) {
      const size = 4 + Math.random() * 8
      return {
        width: size + 'px',
        height: size + 'px',
        left: (10 + Math.random() * 80) + '%',
        top: (10 + Math.random() * 60) + '%',
        animationDelay: (n * 0.8) + 's',
        animationDuration: (3 + Math.random() * 4) + 's',
      }
    },
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
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getAllArticlePage();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAllArticlePage();
    },
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
  background-color: #f5f7f5;
  min-height: 100vh;
}

/* ====== Hero 横幅区 ====== */
.hero-section {
  position: relative;
  min-height: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #1a2a3a 0%, #2d5a3f 40%, #42b883 100%);
  z-index: 0;
}

.hero-particles {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.particle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  animation: float-up linear infinite;
}

@keyframes float-up {
  0% {
    opacity: 0;
    transform: translateY(0) scale(0);
  }

  20% {
    opacity: 1;
    transform: translateY(-20px) scale(1);
  }

  80% {
    opacity: 0.6;
    transform: translateY(-80px) scale(0.8);
  }

  100% {
    opacity: 0;
    transform: translateY(-120px) scale(0);
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
}

.hero-title {
  font-size: 2.8rem;
  font-weight: 800;
  letter-spacing: 4px;
  margin-bottom: 12px;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  font-size: 1.15rem;
  opacity: 0.9;
  letter-spacing: 6px;
  margin-bottom: 30px;
}

.hero-wave {
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  z-index: 3;
}

.hero-wave svg {
  display: block;
  width: 100%;
  height: 60px;
}

/* ====== 主体内容布局 ====== */
.main-content {
  max-width: 1140px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 40px;
  padding: 40px 24px;
}

/* 搜索和标题 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-header h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-icon {
  font-size: 1.2rem;
}

.article-count {
  font-size: 0.85rem;
  color: #999;
  background: #eee;
  padding: 3px 12px;
  border-radius: 20px;
}

/* ====== 文章卡片 ====== */
.post-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

.post-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  animation: card-fade-in 0.5s ease both;
}

@keyframes card-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(66, 184, 131, 0.12);
}

.post-image {
  width: 220px;
  height: 200px;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.post-card:hover .post-image img {
  transform: scale(1.08);
}

.post-info {
  padding: 20px 24px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.post-meta-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.post-category {
  font-size: 0.75rem;
  background: linear-gradient(135deg, #42b883, #35495e);
  color: #fff;
  padding: 2px 10px;
  border-radius: 10px;
  font-weight: 500;
}

.post-date {
  font-size: 0.8rem;
  color: #bbb;
}

.post-info h4 {
  margin: 0 0 8px;
  font-size: 1.2rem;
  color: #2c3e50;
  cursor: pointer;
  transition: color 0.3s;
  line-height: 1.5;
}

.post-info h4:hover {
  color: #42b883;
}

.post-info p {
  color: #888;
  font-size: 0.9rem;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-footer {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
}

.read-more {
  background: none;
  border: 1.5px solid #42b883;
  color: #42b883;
  padding: 5px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 4px;
}

.read-more .arrow {
  transition: transform 0.3s;
}

.read-more:hover {
  background: #42b883;
  color: white;
}

.read-more:hover .arrow {
  transform: translateX(3px);
}

/* 无文章 */
.no-results {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.no-results-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 16px;
}

.no-results p {
  font-size: 1rem;
}

/* ====== 侧边栏样式 ====== */
.sidebar-widget {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s;
}

.sidebar-widget:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.sidebar-widget h4 {
  border-left: 4px solid #42b883;
  padding-left: 12px;
  margin-bottom: 16px;
  font-size: 1rem;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 6px;
}

.widget-icon {
  font-size: 1rem;
}

/* 个人简介卡片 */
.profile-widget {
  text-align: center;
  padding: 30px 24px;
}

.profile-avatar {
  margin-bottom: 16px;
}

.avatar-ring {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(135deg, #42b883, #35495e);
  margin: 0 auto;
}

.avatar-ring img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
}

.profile-name {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 8px;
  text-align: center;
  border: none !important;
  padding: 0 !important;
}

.profile-bio {
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 14px;
}

.profile-tags {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

.mini-tag {
  font-size: 0.75rem;
  padding: 2px 10px;
  border-radius: 10px;
  background: #f0faf5;
  color: #42b883;
  border: 1px solid #d4f0e2;
}

/* 分类列表 */
.category-list {
  list-style: none;
  padding: 0;
}

.category-list li {
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  color: #666;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.25s;
  margin-bottom: 4px;
}

.category-list li:hover {
  background: #f0faf5;
  color: #42b883;
}

.category-list li.active {
  background: linear-gradient(135deg, #42b883, #38a373);
  color: #fff;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(66, 184, 131, 0.3);
}

.cat-count {
  font-size: 0.8rem;
  opacity: 0.7;
}

/* 公告栏 */
.notice-widget {
  background: linear-gradient(135deg, #f0faf5 0%, #fff 100%);
  border: 1px solid #d4f0e2;
}

.notice-text {
  font-size: 0.9rem;
  color: #777;
  line-height: 1.7;
}

/* 分页样式 */
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  padding: 20px 0;
}

/* ====== 响应式设计 ====== */
@media (max-width: 768px) {
  .hero-title {
    font-size: 1.8rem;
    letter-spacing: 2px;
  }

  .hero-subtitle {
    font-size: 0.95rem;
    letter-spacing: 3px;
  }

  .hero-section {
    min-height: 260px;
  }

  .main-content {
    grid-template-columns: 1fr;
    padding: 20px 16px;
    gap: 24px;
  }

  .post-card {
    flex-direction: column;
    height: auto;
  }

  .post-image {
    width: 100%;
    height: 180px;
  }

  .post-info {
    padding: 16px;
  }

  .post-info h4 {
    font-size: 1.05rem;
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
