<template>
  <div class="blog-container">
    <!-- 文章封面 -->
    <div class="article-cover">
      <img :src="article.image || 'https://img.jinha.vip/tidai.png'" alt="文章封面" />
    </div>
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
          <h4>个人简介</h4>
          <p>我不是程序员。💻</p>
        </div>
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
        console.log("id为"+id+"的文章浏览量已加1");
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
/* 基础样式 */
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

/* 文章封面 */
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



/* 主体内容布局 */
.main-content {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 40px;
  padding: 40px 20px;
}

/* 文章头部 */
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
}

/* 文章内容 */
.article-content {
  background: #fff;
  border-radius: 8px;
  /* padding: 30px; */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 40px;
}



/* 文章卡片 */
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

/* 页脚 */
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

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
  }

  .post-card {
    flex-direction: column;
  }

  .post-image {
    width: 100%;
    height: 150px;
  }

  .article-header h1 {
    font-size: 1.5rem;
  }
}
</style>