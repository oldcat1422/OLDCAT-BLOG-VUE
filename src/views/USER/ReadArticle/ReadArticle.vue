<template>
  <div class="blog-container">
    <main class="main-content">
      <!-- 文章内容区 -->
      <section class="article-section">
        <div class="article-header">
          <!-- <span class="post-category">{{ article.tag }}</span> -->
          <h1>{{ article.title }}</h1>
          <div class="post-footer">
            <span class="post-date">{{ article.time }}</span>
            <span class="post-views">浏览量: {{ article.pageViews }}</span>
          </div>
        </div>
        <div class="article-content">
          <mavon-editor class="edit" v-model="neirong" :subfield="subfield" :editable="editable"
            :defaultOpen="defaultOpen" :toolbarsFlag="false" />
        </div>
      </section>

      <!-- 侧边栏 -->
      <aside class="sidebar">
        <div class="sidebar-widget">
          <h4>文章推荐</h4>
          <ul class="recommend-list">
            <li v-for="item in relatedArticles" :key="item.id" @click="readMore(item.id)" class="recommend-item">
              <div class="recommend-title">{{ item.title }}</div>
              <div class="recommend-desc">{{ item.description }}</div>
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
  // 组件数据
  data() {
    return {
      id: this.$route.params.id,
      article: {},
      neirong: '',
      subfield: false,
      editable: false,
      defaultOpen: 'preview',
      toolbarsFlag: false,
      navigation: true,
      
      // 相关文章
      relatedArticles: [],
      
      // 分类
      selectedCategory: '全部',
      categories: ['全部', 'Vue', 'JavaScript', 'CSS', '后端', 'Game']
    };
  },

  // 方法
  methods: {
    readMore(id) {
      // console.log(id);
      this.$router.push(`/main/readarticle/${id}`)
    },
    getOneArticle() {
      const that = this
      request({
        url: '/public/article/getOneArticle?articleId=' + this.id,
        method: 'post'
      }).then(function (res) {
        that.article = res.data
        that.neirong = res.data.neirong
      })
    },

    filterByCategory(category) {
      // 分类筛选逻辑
      this.selectedCategory = category
    },
    moreSuggest() {
      const that = this
      request({
        url: '/public/article/moreSuggest?id=' + this.id,
        method: 'post'
      }).then(function (res) {
        if (res.code === 200) {
          that.relatedArticles = res.data
        }
      })
    },
    addView() {
      const that = this
      request({
        url: '/public/article/addView?articleId=' + this.id,
        method: 'post'
      }).then(function (res) {
        console.log("id为"+that.id+"的文章浏览量已加1");
      })
    }
  },

  mounted() {
    window.scrollTo(0, 0);    // 滚动到页面顶部
    this.addView();
    this.getOneArticle();
    this.moreSuggest();

  },
  // 监听路由参数变化
  watch: {
    '$route.params.id': {
      handler(newId, oldId) {
        if (newId !== oldId) {
          // 滚动到页面顶部
          window.scrollTo(0, 0);
          this.id = newId;
          this.getOneArticle();
          this.moreSuggest();
        }
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
/* ===== 基础样式 ===== */
.blog-container {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #333;
  line-height: 1.6;
  background-color: #f9f9f9;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* ===== 文章封面 ===== */
.article-cover {
  width: 100vw;
  height: 40vh;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  overflow: hidden;
}

.article-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

/* ===== 主体内容布局 ===== */
.main-content {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 40px;
  padding: 40px 20px;
}

/* ===== 文章头部 ===== */
.article-header {
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 10px;
}

.article-header h1 {
  font-size: 2rem;
  margin: 15px 0;
  color: #333;
  word-break: break-word;
}

/* ===== 文章内容 ===== */
.article-content {
  width: 100%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 40px;
  overflow: hidden;
}

/* mavon-editor 内容区域适配 */
.article-content :deep(.v-show-content),
.article-content :deep(.v-note-panel),
.article-content :deep(.v-note-edit),
.article-content :deep(.v-note-view) {
  width: 100% !important;
  max-width: 100% !important;
}

/* mavon-editor 内部滚动容器 */
.article-content :deep(.v-note-panel) {
  box-sizing: border-box !important;
}

/* 文章内容中的图片自适应 */
.article-content :deep(.v-show-content img),
.article-content :deep(.markdown-body img) {
  max-width: 100% !important;
  height: auto !important;
  display: block;
  margin: 1em auto;
  border-radius: 4px;
}

/* 文章内容中的代码块自适应 */
.article-content :deep(.v-show-content pre),
.article-content :deep(.markdown-body pre) {
  max-width: 100% !important;
  overflow-x: auto !important;
  -webkit-overflow-scrolling: touch;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.article-content :deep(.v-show-content code),
.article-content :deep(.markdown-body code) {
  word-break: break-all;
  white-space: pre-wrap;
}

/* 文章内容中的表格自适应 */
.article-content :deep(.v-show-content table),
.article-content :deep(.markdown-body table) {
  display: block;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* 文章内容中的视频/嵌入内容自适应 */
.article-content :deep(.v-show-content iframe),
.article-content :deep(.v-show-content video),
.article-content :deep(.markdown-body iframe),
.article-content :deep(.markdown-body video) {
  max-width: 100% !important;
  height: auto;
}

/* ===== 文章卡片（列表页用，保留以防复用） ===== */
.post-card {
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
  width: 150px;
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
  font-size: 1.1rem;
}

.post-info p {
  color: #777;
  font-size: 0.95rem;
  margin-bottom: 15px;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.post-date {
  font-size: 0.85rem;
  color: #999;
}

.post-views {
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
  font-size: 0.85rem;
}

.read-more:hover {
  background: #42b883;
  color: white;
}

/* ===== 侧边栏样式 ===== */
.sidebar {
  position: sticky;
  top: 80px;
  align-self: start;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}

.sidebar::-webkit-scrollbar {
  width: 4px;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 2px;
}

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

/* 推荐文章列表样式 */
.recommend-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.recommend-item {
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: all 0.3s;
}

.recommend-item:last-child {
  border-bottom: none;
}

.recommend-item:hover {
  background-color: #f9f9f9;
  padding-left: 8px;
}

.recommend-title {
  font-size: 0.95rem;
  color: #333;
  font-weight: 500;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recommend-desc {
  font-size: 0.8rem;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ===== 页脚 ===== */
.footer {
  text-align: center;
  padding: 40px;
  background: #35495e;
  color: white;
  margin-top: 40px;
}

.footer-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ===== 响应式设计 ===== */

/* 平板（≤1024px）：侧边栏缩窄 */
@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 1fr 260px;
    gap: 30px;
    padding: 30px 16px;
  }

  .article-header {
    padding: 24px;
  }

  .article-header h1 {
    font-size: 1.75rem;
  }
}

/* 小平板（≤900px）：侧边栏更窄 */
@media (max-width: 900px) {
  .main-content {
    grid-template-columns: 1fr 220px;
    gap: 24px;
  }

  .sidebar-widget {
    padding: 16px;
  }
}

/* 手机（≤768px）：单栏布局 */
@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 0;
    padding: 16px 12px;
  }

  .sidebar {
    display: none;
  }

  .article-header {
    padding: 20px 16px;
    border-radius: 6px;
  }

  .article-header h1 {
    font-size: 1.35rem;
    margin: 10px 0;
  }

  .article-content {
    border-radius: 6px;
    margin-bottom: 24px;
  }

  .article-content :deep(.v-show-content) {
    padding: 16px !important;
    font-size: 15px !important;
  }

  .post-card {
    flex-direction: column;
  }

  .post-image {
    width: 100%;
    height: 150px;
  }

  .post-footer {
    flex-direction: column;
    align-items: flex-start;
  }
}

/* 小屏手机（≤480px） */
@media (max-width: 480px) {
  .main-content {
    padding: 10px 8px;
  }

  .article-header {
    padding: 16px 12px;
    border-radius: 4px;
  }

  .article-header h1 {
    font-size: 1.15rem;
  }

  .article-content :deep(.v-show-content) {
    padding: 12px !important;
    font-size: 14px !important;
  }

  .article-cover {
    height: 30vh;
  }
}
</style>