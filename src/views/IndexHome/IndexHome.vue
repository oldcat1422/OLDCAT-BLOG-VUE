<template>
  <div class="page-container">
    <!-- 头部横幅 -->
    <header class="hero-banner">
      <div class="container hero-content">
        <h1>探索思想的<span class="highlight">无限可能</span></h1>
        <p>发现优质文章，分享你的见解，连接志同道合的读者</p>
        <div class="search-box">
          <input type="text" placeholder="搜索文章标题..." v-model="searchQuery" @keyup.enter="searchArticles">
          <button class="search-btn" @click="searchArticles">
            <el-icon>
              <Search />
            </el-icon>
          </button>
        </div>
      </div>
    </header>
    <!-- 主要内容区 -->
    <main class="container main-content">
      <!-- 文章列表区 -->
      <section class="articles-feed">
        <!-- 网格视图 -->
        <div class="articles-grid">
          <article class="article-card" v-for="article in articles" :key="article.id">
            <div>
              <div class="article-image">
                <img :src="article.image || 'https://oldcatdata.oss-cn-hangzhou.aliyuncs.com/tidai.png'"
                  :alt="article.tag">
              </div>
              <div class="article-content">
                <div class="article-meta">
                  <span class="category">{{ article.tag }}</span>
                  <span>•</span>
                  <span>blog</span>
                  <span>•</span>
                  <span>浏览量：{{ article.pageViews }}</span>
                </div>
                <div @click="read(article.id)">
                  <h3 class="article-title" @click="read(item.id)">
                    {{ article.title }}
                  </h3>
                </div>
                <p class="article-excerpt">{{ article.description }}</p>
                <div class="article-author">
                  <div>
                    <span class="publish-date">{{ article.time }}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
        <!-- 分页 -->
        <div class="fenpage">
          <el-pagination :page-size="5" :page-sizes="[5, 10, 15, 20]" :background=true
            layout="total, prev, pager, next, jumper" :total="parseInt(total)" @current-change="handleCurrentChange" />
        </div>
      </section>
      <!-- 侧边栏 -->
      <aside class="sidebar">
        <!-- 博主简介模块 -->
        <div class="sidebar-card blogger-profile-card">
          <div class="profile-header">
            <img :src="touxiang" alt="博主头像" class="blogger-avatar">
            <div class="profile-header-content">
              <h3 class="blogger-name">OLDCAT</h3>
              <p class="blogger-title">优质内容创作者</p>
            </div>
          </div>
          <div class="profile-stats">
            <div class="stat-item">
              <span class="stat-value">{{ total }}</span>
              <span class="stat-label">文章</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ bloggerStats.authors }}</span>
              <span class="stat-label">标签</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ views }}</span>
              <span class="stat-label">浏览量</span>
            </div>
          </div>
          <p class="profile-desc">
            致力于分享高质量原创内容，涵盖文学、科技、生活、职场等多个领域，
            打造有温度、有深度的阅读社区，让每一次阅读都成为思想的碰撞。
          </p>
          <div class="profile-actions">
            <button class="btn follow-blog-btn">
              <i class="fa fa-plus-circle"></i> 关注博客
            </button>
            <a href="#" class="visit-home-link">
              <i class="fa fa-home"></i> 访问首页
            </a>
          </div>
        </div>
        <!-- 活动公告 -->
        <div class="sidebar-card announcement-card">
          <div class="announcement-header">
            <i class="fa fa-bullhorn"></i>
            <h3>公告</h3>
          </div>
          <div class="announcement-content">
            <p>参与六月写作挑战，赢取精美图书和会员特权</p>
          </div>
        </div>
        <!-- 分类导航 -->
        <div class="sidebar-card">
          <h3 class="sidebar-title"><i class="fa fa-th-list"></i>文章分类</h3>
          <div class="category-list">
            <a href="#" class="category-item" v-for="category in categories" :key="category.id"
              :class="{ active: category.active }">
              <span>{{ category.name }}</span>
              <span class="count">{{ category.count }}</span>
            </a>
          </div>
        </div>
        <!-- 热门标签 -->
        <div class="sidebar-card">
          <h3 class="sidebar-title"><i class="fa fa-tags"></i>热门标签</h3>
          <div class="tags-cloud">
            <a href="#" class="tag" v-for="tag in popularTags" :key="tag.id" :style="{ fontSize: tag.size + 'px' }">
              {{ tag.name }}
            </a>
          </div>
        </div>
      </aside>
    </main>
    <!-- 订阅区域 -->
    <section class="subscribe-section">
      <div class="container subscribe-content">
        <h2>不错过任何优质内容</h2>
        <p>订阅我们的周刊，每周精选文章直达你的邮箱</p>
        <div class="subscribe-form">
          <input type="email" placeholder="输入你的邮箱地址" v-model="email">
          <button class="subscribe-btn" @click="subscribe">订阅周刊</button>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container footer-content">
        <div class="footer-logo">
          <div class="logo">
            <i class="fa fa-book"></i>
            <span>阅读空间</span>
          </div>
          <p>探索思想的无限可能</p>
        </div>
        <div class="footer-links">
          <div class="link-group">
            <h4>站点</h4>
            <a href="#">关于我们</a>
            <a href="#">联系方式</a>
            <a href="#">隐私政策</a>
            <a href="#">使用条款</a>
          </div>
          <div class="link-group">
            <h4>资源</h4>
            <a href="#">帮助中心</a>
            <a href="#">社区指南</a>
            <a href="#">写作规范</a>
          </div>
          <div class="link-group">
            <h4>连接</h4>
            <a href="#">微信公众号</a>
            <a href="#">微博</a>
            <a href="#">知乎</a>
            <a href="#">GitHub</a>
          </div>
        </div>
        <div class="copyright">
          <p>© 2023 阅读空间 版权所有</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { View, Clock, ArrowRight } from '@element-plus/icons-vue';
import request from '../../utils/request'
export default {
  data() {
    return {
      views:'',
      bloggerStats: {
        articles: 1286,  // 总文章数
        authors: 328,    // 入驻作者数
        readers: 56200   // 累计读者数
      },
      touxiang: 'https://oldcatdata.oss-cn-hangzhou.aliyuncs.com/toiuxiang.jpg',
      currentPage1: '1',
      total: '',      //全部文章数
      scrollY: 0,
      searchQuery: '',
      email: '',
      articles: [],   // 文章列表
      // 分类列表
      categories: [
        { id: 1, name: "全部文章", count: 128, active: true },
        { id: 2, name: "文学", count: 32 },
        { id: 3, name: "科技", count: 28 },
        { id: 4, name: "生活", count: 42 },
        { id: 5, name: "职场", count: 16 },
        { id: 6, name: "摄影", count: 10 }
      ],

      // 热门标签
      popularTags: [
        { id: 1, name: "自然", size: 18 },
        { id: 2, name: "人工智能", size: 16 },
        { id: 3, name: "极简主义", size: 17 },
        { id: 4, name: "远程工作", size: 15 },
        { id: 5, name: "摄影", size: 14 },
        { id: 6, name: "旅行", size: 16 },
        { id: 7, name: "读书", size: 15 },
        { id: 8, name: "思考", size: 13 },
        { id: 9, name: "创意", size: 14 },
        { id: 10, name: "成长", size: 16 }
      ]
    };
  },

  methods: {
    getViews() {
      const that = this
      request({
        url: '/public/article/getViews',
        method: 'post'
      }).then(function (res) {
        // console.log(res);
        that.views = res.data
      })
    },
    read(id) {
      this.addView(id);
      this.$router.push('/readArticle?id=' + id)
    },
    addView(id) {
      request({
        url: '/public/article/addView?articleId=' + id,
        method: 'post'
      }).then(function (res) {
      })
    },
    getAllArticle(pageNo, pageSize) {
      const that = this
      request({
        url: '/public/article/getAllArticlePage',
        method: 'post'
      }).then(function (res) {
        console.log(res);
        that.articles = res.data.records
        that.total = res.data.total
      })
    },
    //改变当前页数  第几页
    handleCurrentChange(val) {
      console.log(`current page: ${val}`)
      const that = this
      request({
        url: '/public/article/getAllArticlePage?pageNo=' + val,
        method: 'post'
      }).then(function (res) {
        console.log(res);
        that.articles = res.data.records
        // that.total = res.data.total
        window.scrollTo({ top: 500, behavior: 'smooth' });
      })
    },
    // 设置视图模式
    setView(mode) {
      this.viewMode = mode;
    },

    // 搜索文章
    searchArticles() {
      console.log("搜索:", this.searchQuery);
      // 实际应用中会跳转到搜索结果页
    },


    // 订阅周刊
    subscribe() {
      if (this.email && this.email.includes('@')) {
        alert("订阅成功！我们会定期发送精选内容到你的邮箱。");
        this.email = '';
      } else {
        alert("请输入有效的邮箱地址");
      }
    },

    // 前往编辑器
    goToEditor() {
      this.$router.push('/editor')
      // 实际应用中会导航到编辑器路由
    },

    // 处理滚动事件
    handleScroll() {
      this.scrollY = window.scrollY;
    }
  },

  mounted() {
    this.getViews();
    this.getAllArticle();
    window.addEventListener('scroll', this.handleScroll);
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>
/* 博主简介模块样式 */
.blogger-profile-card {
  background: linear-gradient(180deg, #F7FAFC 0%, #FFFFFF 100%);
  border: 1px solid #EDF2F7;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #EDF2F7;
}

.blogger-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #FFFFFF;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.profile-header-content h3 {
  font-size: 18px;
  font-weight: bold;
  color: #2D3748;
  margin-bottom: 4px;
}

.profile-header-content .blogger-title {
  font-size: 14px;
  color: #718096;
}

.profile-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 0 8px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 20px;
  font-weight: bold;
  color: #3182CE;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  color: #718096;
}

.profile-desc {
  font-size: 14px;
  color: #4A5568;
  line-height: 1.6;
  margin-bottom: 20px;
  text-align: left;
}

.profile-actions {
  display: flex;
  gap: 10px;
}

.follow-blog-btn {
  flex: 1;
  padding: 10px;
  background-color: #3182CE;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.follow-blog-btn:hover {
  background-color: #2A69AC;
}

.visit-home-link {
  padding: 10px 16px;
  background-color: white;
  border: 1px solid #E2E8F0;
  border-radius: 4px;
  color: #3182CE;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.visit-home-link:hover {
  background-color: #F7FAFC;
  border-color: #CBD5E0;
}

.fenpage {
  padding: 10px;
}

/* 基础样式 - 与阅读/写作界面保持一致 */
.page-container {
  min-height: 100vh;
  font-family: Georgia, Cambria, serif;
  color: #2D3748;
  background-color: #F7FAFC;
}

.container {
  width: 100%;
  max-width: 80vw;
  margin: 0 auto;
  padding: 0 20px;
}

/* 导航栏样式 - 保持一致性 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  z-index: 9999;
  transition: all 0.3s ease;
  padding: 15px 0;
}

.navbar-scrolled {
  padding: 10px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #2D3748;
  text-decoration: none;
}

.logo i {
  color: #3182CE;
  font-size: 24px;
}

.logo span {
  font-weight: bold;
  font-size: 18px;
}

.nav-links {
  display: flex;
  gap: 24px;
  margin: 0 20px;
}

.nav-link {
  color: #4A5568;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  padding: 8px 0;
  position: relative;
}

.nav-link.active {
  color: #3182CE;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #3182CE;
}

.nav-link:hover {
  color: #3182CE;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.action-btn {
  background: none;
  border: none;
  color: #4A5568;
  font-size: 20px;
  cursor: pointer;
  transition: color 0.2s ease;
  position: relative;
}

.action-btn:hover {
  color: #3182CE;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.write-btn {
  background-color: #3182CE;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
}

.write-btn:hover {
  background-color: #2A69AC;
}

/* 头部横幅 */
.hero-banner {
  background: linear-gradient(90deg, #2D3748, #1A202C);
  color: white;
  padding: 100px 0 60px;
  margin-top: 65px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-banner h1 {
  font-size: 2.5rem;
  margin-bottom: 16px;
  line-height: 1.3;
}

.highlight {
  color: #63B3ED;
}

.hero-banner p {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 32px;
}

.search-box {
  display: flex;
  max-width: 600px;
  margin: 0 auto;
}

.search-box input {
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
  outline: none;
}

.search-btn {
  background-color: #3182CE;
  color: white;
  border: none;
  padding: 0 20px;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.search-btn:hover {
  background-color: #2A69AC;
}

/* 主要内容区 */
.main-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 40px 0;
}

@media (min-width: 1024px) {
  .main-content {
    flex-direction: row;
  }
}

.articles-feed {
  flex: 2;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-header h2 {
  font-size: 1.8rem;
  color: #2D3748;
}

.view-options {
  display: flex;
  border: 1px solid #E2E8F0;
  border-radius: 4px;
  overflow: hidden;
}

.view-btn {
  background: none;
  border: none;
  padding: 8px 12px;
  background-color: white;
  color: #4A5568;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-btn.active {
  background-color: #3182CE;
  color: white;
}

.view-btn:hover:not(.active) {
  background-color: #F7FAFC;
}

/* 网格视图 */
.articles-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 768px) {
  .articles-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.article-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.article-card.featured-article {
  grid-column: 1 / -1;
  flex-direction: row;
}

@media (max-width: 767px) {
  .article-card.featured-article {
    flex-direction: column;
  }
}

.article-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.article-card.featured-article .article-image {
  flex: 1;
  height: auto;
  min-height: 250px;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-card:hover .article-image img {
  transform: scale(1.05);
}

.article-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.article-card.featured-article .article-content {
  flex: 1;
  padding: 30px;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #718096;
  margin-bottom: 12px;
}

.category {
  color: #3182CE;
  font-weight: 500;
}

.article-title {
  cursor: pointer;
  font-size: 1.4rem;
  margin-bottom: 12px;
  line-height: 1.3;
}

.article-title:hover {
  color: #2563eb;
}

.article-title a {
  color: #2D3748;
  text-decoration: none;
  transition: color 0.2s ease;
}

.article-title a:hover {
  color: #3182CE;
}

.article-excerpt {
  color: #4A5568;
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.article-author img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  font-weight: 500;
  color: #2D3748;
}

.publish-date {
  font-size: 14px;
  color: #718096;
}

/* 列表视图 */
.articles-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.list-article {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
}

@media (max-width: 767px) {
  .list-article {
    flex-direction: column;
  }
}

.list-article:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

.list-article-image {
  width: 200px;
  flex-shrink: 0;
  height: 150px;
  overflow: hidden;
}

@media (max-width: 767px) {
  .list-article-image {
    width: 100%;
    height: 200px;
  }
}

.list-article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.list-article:hover .list-article-image img {
  transform: scale(1.05);
}

.list-article-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.list-article .article-author {
  margin-top: auto;
  justify-content: space-between;
  align-items: center;
}

.article-actions {
  display: flex;
  gap: 12px;
}

/* 侧边栏样式 - 与其他界面保持一致的卡片风格 */
.sidebar {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sidebar-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.sidebar-title {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #2D3748;
}

.sidebar-title i {
  color: #3182CE;
}

/* 分类列表 */
.category-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.category-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 4px;
  color: #4A5568;
  text-decoration: none;
  transition: all 0.2s ease;
}

.category-item:hover {
  background-color: #F7FAFC;
  color: #3182CE;
}

.category-item.active {
  background-color: #EDF2F7;
  color: #3182CE;
  font-weight: 500;
}

.count {
  background-color: #EDF2F7;
  color: #718096;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.category-item.active .count {
  background-color: #3182CE;
  color: white;
}

/* 热门作者 */
.authors-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.author-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.author-item img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.author-info {
  flex: 1;
  margin: 0 12px;
}

.author-name {
  color: #2D3748;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}

.author-name:hover {
  color: #3182CE;
}

.articles-count {
  font-size: 14px;
  color: #718096;
}

.follow-btn {
  padding: 4px 12px;
  border: 1px solid #3182CE;
  border-radius: 4px;
  background-color: white;
  color: #3182CE;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.follow-btn:hover {
  background-color: #EDF2F7;
}

/* 热门标签 */
.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  text-decoration: none;
  padding: 4px 10px;
  border-radius: 16px;
  background-color: #EDF2F7;
  color: #3182CE;
  transition: all 0.2s ease;
}

.tag:hover {
  background-color: #3182CE;
  color: white;
}

/* 活动公告 */
.announcement-card {
  background: linear-gradient(135deg, #EDF2F7, #E6FFFA);
  border: 1px solid #CBD5E0;
}

.announcement-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.announcement-header i {
  color: #2C5282;
  font-size: 20px;
}

.announcement-header h3 {
  font-weight: bold;
  color: #2C5282;
  margin: 0;
}

.announcement-content p {
  color: #2D3748;
  margin-bottom: 16px;
}

.announcement-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #2B6CB0;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}

.announcement-link:hover {
  color: #1A365D;
}

/* 订阅区域 */
.subscribe-section {
  background-color: #EDF2F7;
  padding: 60px 0;
  text-align: center;
}

.subscribe-content {
  max-width: 700px;
}

.subscribe-section h2 {
  font-size: 1.8rem;
  margin-bottom: 16px;
  color: #2D3748;
}

.subscribe-section p {
  font-size: 1.1rem;
  color: #4A5568;
  margin-bottom: 32px;
}

.subscribe-form {
  display: flex;
  max-width: 500px;
  margin: 0 auto;
}

.subscribe-form input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #CBD5E0;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
  outline: none;
}

.subscribe-btn {
  background-color: #3182CE;
  color: white;
  border: none;
  padding: 0 24px;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-weight: 500;
}

.subscribe-btn:hover {
  background-color: #2A69AC;
}

/* 页脚 */
.footer {
  background-color: #2D3748;
  color: white;
  padding: 60px 0 30px;
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

.footer-logo {
  flex: 1;
  min-width: 250px;
}

.footer-logo .logo {
  color: white;
  margin-bottom: 16px;
}

.footer-logo .logo i {
  color: #63B3ED;
}

.footer-logo p {
  color: #A0AEC0;
  max-width: 250px;
}

.footer-links {
  flex: 2;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}

.link-group {
  min-width: 150px;
}

.link-group h4 {
  font-size: 16px;
  margin-bottom: 16px;
  color: white;
}

.link-group a {
  display: block;
  color: #A0AEC0;
  text-decoration: none;
  margin-bottom: 8px;
  transition: color 0.2s ease;
}

.link-group a:hover {
  color: #63B3ED;
}

.copyright {
  width: 100%;
  padding-top: 20px;
  border-top: 1px solid #4A5568;
  text-align: center;
  color: #A0AEC0;
  font-size: 14px;
}

/* 提示框样式 */
.tooltip {
  position: relative;
}

.tooltip-text {
  visibility: hidden;
  width: 120px;
  background-color: #2D3748;
  color: rgb(0, 0, 0);
  text-align: center;
  border-radius: 4px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 12px;
  font-family: sans-serif;
  font-weight: normal;
}

.tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 作者信息样式 */
.author-profile {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.author-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}

.author-details h3 {
  font-weight: bold;
  margin-bottom: 4px;
}

.author-details p {
  font-size: 14px;
  color: #4A5568;
}

.author-bio {
  font-size: 14px;
  color: #4A5568;
  margin-bottom: 16px;
}

.follow-btn {
  width: 100%;
  padding: 8px 0;
  border: 1px solid #3182CE;
  color: #3182CE;
  border-radius: 6px;
  background: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.follow-btn:hover {
  background-color: #3182CE;
  color: white;
}
</style>
