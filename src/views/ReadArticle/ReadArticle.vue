<template>
  <div class="page-container">
    <!-- 标题栏 -->
    <header class="title-bar">
      <div class="container title-content">
        <div class="meta-info">
          <span>{{ article.tag }}</span>
          <span>•</span>
          <span>123</span>
          <span>•</span>
          <span>321</span>
        </div>
        <h1>{{ article.title }}</h1>
        <div class="author-info">
          <span>作者：OLDCAT</span>
          <span>•</span>
          <span>发布于 {{ article.time }}</span>
        </div>
      </div>
    </header>

    <!-- 主要内容区 -->
    <main class="container main-content">
      <!-- 侧边栏 -->
      <!-- <aside class="sidebar">
        <div class="sidebar-card">
          <h3 class="sidebar-title"><i class="fa fa-compass"></i>相关推荐</h3>
          <div class="related-articles">
            <a href="#" class="related-item" v-for="(item, index) in relatedArticles" :key="index">
              <h4>{{ item.title }}</h4>
              <p>{{ item.description }}</p>
            </a>
          </div>
        </div>
        <div class="sidebar-card">
          <h3 class="sidebar-title"><i class="fa fa-book"></i>阅读进度</h3>
          <div class="progress-container">
            <div class="progress-info">
              <span>当前进度</span>
              <span>{{ Math.round(progress) }}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progress + '%' }"></div>
            </div>
          </div>
        </div>
      </aside> -->
      <!-- 文章正文 -->
      <article class="article-content">
        <mavon-editor class="edit" v-model="neirong" :subfield="subfield" :editable="editable"
          :defaultOpen="defaultOpen" :toolbarsFlag="false" />
      </article>
      
    </main>
    <!-- 章节导航 -->
    <nav class="chapter-nav container">
      <a href="#" class="chapter-link prev" v-if="chapterNavigation.prev">
        <i class="fa fa-arrow-left"></i>
        <span>上一章：{{ chapterNavigation.prev }}</span>
      </a>
      <a href="#" class="chapter-link next" v-if="chapterNavigation.next">
        <span>下一章：{{ chapterNavigation.next }}</span>
        <i class="fa fa-arrow-right"></i>
      </a>
    </nav>
    <!-- 页脚 -->
    <footer class="footer">
      <div class="container footer-content">
        <div class="footer-logo">
          <i class="fa fa-book"></i>
          <span>阅读空间</span>
        </div>
        <div class="social-links">
          <a href="#"><i class="fa fa-twitter"></i></a>
          <a href="#"><i class="fa fa-facebook"></i></a>
          <a href="#"><i class="fa fa-instagram"></i></a>
          <a href="#"><i class="fa fa-github"></i></a>
        </div>
        <p>© 2025 oldcat 版权所有</p>
      </div>
    </footer>
  </div>
</template>

<script>
import request from '../../utils/request'
export default {
  // 组件数据
  data() {
    return {
      id: this.$route.query.id,
      article: {},
      neirong: '',
      subfield: false,
      editable: false,
      defaultOpen: 'preview',
      toolbarsFlag: false,

      // 相关文章
      relatedArticles: '',

      // 章节导航
      chapterNavigation: {
        prev: "春天的脚步",
        next: "秋日私语"
      },

      // 阅读进度相关
      progress: 0,
      scrollY: 0
    };
  },

  // 计算属性
  computed: {
    // 剩余阅读时间
  },

  // 方法
  methods: {
    // 处理滚动事件
    handleScroll() {
      this.scrollY = window.scrollY;
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      this.progress = (winScroll / height) * 100;
    },
    getOneArticle() {
      const that = this
      request({
        url: '/public/article/getOneArticle?articleId=' + this.id,
        method: 'post'
      }).then(function (res) {
        // console.log(res);
        that.article = res.data
        that.neirong = res.data.neirong
      })
    },
    moreSuggest() {
      const that = this
      request({
        url: '/public/article/moreSuggest?id=' + this.id,
        method: 'post'
      }).then(function (res) {
        console.log(res);
        that.relatedArticles = res.data
        console.log(that.relatedArticles);
        
      })

    },
  },

  // 生命周期钩子
  mounted() {
    this.getOneArticle();
    this.moreSuggest();
    // 页面加载完成后滚动到顶部
    window.scrollTo(0, 0);
    // 绑定滚动事件监听
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};

</script>

<style scoped>
/* 基础样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 全局样式 */
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

/* 导航栏样式 */
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
}

.logo i {
  color: #3182CE;
  font-size: 24px;
}

.logo span {
  font-weight: bold;
  font-size: 18px;
}

.nav-actions {
  display: flex;
  gap: 24px;
}

.action-btn {
  background: none;
  border: none;
  color: #4A5568;
  font-size: 20px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.action-btn:hover {
  color: #3182CE;
}

/* 标题栏样式 */
.title-bar {
  height: 30vh;
  background: linear-gradient(90deg, #2D3748, #1A202C);
  color: white;
  display: flex;
  align-items: center;
  padding-top: 70px;
  /* 为固定导航栏留出空间 */
}

.title-content {
  text-align: center;
  max-width: 800px;
}

.meta-info {
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 12px;
}

.title-bar h1 {
  font-size: clamp(1.8rem, 5vw, 3.5rem);
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 16px;
}

.author-info {
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  opacity: 0.8;
}

/* 主要内容区样式 */
.main-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 48px 0;
}

@media (min-width: 1024px) {
  .main-content {
    flex-direction: row;
  }
}

.article-content {
  flex: 2;
  /* max-width: 70ch; */
  margin: 0 auto;
}

.article-content p {
  font-size: 18px;
  color: #4A5568;
  line-height: 1.8;
  margin-bottom: 24px;
}

.sidebar {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.sidebar-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 24px;
  transition: box-shadow 0.2s ease;
}

.sidebar-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.sidebar-title {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.sidebar-title i {
  color: #3182CE;
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

/* 相关推荐样式 */
.related-articles {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.related-item {
  text-decoration: none;
  color: inherit;
  padding-bottom: 16px;
  border-bottom: 1px solid #E2E8F0;
}

.related-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.related-item h4 {
  font-weight: 500;
  transition: color 0.2s ease;
}

.related-item:hover h4 {
  color: #3182CE;
}

.related-item p {
  font-size: 14px;
  color: #4A5568;
  margin-top: 4px;
}

/* 阅读进度样式 */
.progress-container {
  margin-bottom: 16px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 4px;
}

.progress-bar {
  height: 8px;
  background-color: #E2E8F0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #3182CE;
  border-radius: 4px;
  transition: width 0.2s ease;
}

.reading-stats {
  font-size: 14px;
  color: #4A5568;
}

.reading-stats p {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.reading-stats p:last-child {
  margin-bottom: 0;
}

/* 章节导航样式 */
.chapter-nav {
  padding: 32px 0;
  border-top: 1px solid #E2E8F0;
}

.chapter-nav {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (min-width: 768px) {
  .chapter-nav {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.chapter-link {
  text-decoration: none;
  color: #3182CE;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: text-decoration 0.2s ease;
}

.chapter-link:hover {
  text-decoration: underline;
}

.chapter-link.next {
  margin-left: auto;
}

/* 页脚样式 */
.footer {
  background-color: #2D3748;
  color: rgba(255, 255, 255, 0.8);
  padding: 48px 0;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
  }
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  font-weight: bold;
  font-size: 18px;
}

.social-links {
  display: flex;
  gap: 24px;
}

.social-links a {
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.2s ease;
}

.social-links a:hover {
  color: white;
}

.footer p {
  font-size: 14px;
}

/* 响应式调整 */
@media (max-width: 1023px) {
  .title-bar {
    height: 25vh;
  }
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}
</style>
