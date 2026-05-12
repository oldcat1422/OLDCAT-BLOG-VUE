<template>
  <div class="blog-container">
    <main class="main-content">
      <!-- 归档标题 -->
      <section class="archive-section">
        <div class="section-header">
          <h2>文章归档</h2>
        </div>
        
        <div class="archive-container">
          <div v-if="archiveData.length > 0">
            <div v-for="yearGroup in archiveData" :key="yearGroup.year" class="year-group">
              <h3 class="year-title">{{ yearGroup.year }}</h3>
              <ul class="article-list">
                <li v-for="article in yearGroup.articles" :key="article.id" class="article-item">
                  <span class="article-date">{{ article.date }}</span>
                  <a href="javascript:void(0)" @click="readMore(article.id)" class="article-title">{{ article.title }}</a>
                </li>
              </ul>
            </div>
          </div>
          <div v-else class="no-results">
            没有文章
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'GuiDang',
  components: {
  },
  data() {
    return {
      posts: [],
      archiveData: []
    };
  },
  // Options API: methods
  methods: {
    getAllArticlePage() {
      const that = this
      request({
        url: '/public/article/getGuiDangData',
        method: 'post',
      }).then(res => {
        if (res.code === 200) {
          that.posts = res.data
          that.generateArchiveData()
        }
      })
    },
    generateArchiveData() {
      // 按年份分组文章
      const yearMap = {}
      this.posts.forEach(post => {
        if (post.time) {
          // 假设时间格式为 '2025-12-30' 或类似格式
          const date = new Date(post.time)
          const year = date.getFullYear()
          const month = date.getMonth() + 1
          const day = date.getDate()
          const formattedDate = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
          
          if (!yearMap[year]) {
            yearMap[year] = []
          }
          
          yearMap[year].push({
            id: post.id,
            title: post.title,
            date: formattedDate
          })
        }
      })
      
      // 转换为数组并按年份降序排序
      this.archiveData = Object.keys(yearMap)
        .map(year => ({
          year: year,
          articles: yearMap[year]
        }))
        .sort((a, b) => b.year - a.year)
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

/* 主体内容布局 */
.main-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* 归档部分 */
.archive-section {
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.section-header {
  margin-bottom: 30px;
  text-align: center;
}

.section-header h2 {
  font-size: 1.8rem;
  color: #333;
  margin: 0;
}

/* 年份分组 */
.year-group {
  margin-bottom: 30px;
}

.year-title {
  font-size: 1.2rem;
  color: #42b883;
  margin: 0 0 15px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #e0e0e0;
}

/* 文章列表 */
.article-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.article-item {
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
}

.article-item:last-child {
  border-bottom: none;
}

.article-date {
  font-size: 0.85rem;
  color: #999;
  width: 80px;
  flex-shrink: 0;
}

.article-title {
  font-size: 0.95rem;
  color: #333;
  text-decoration: none;
  transition: color 0.3s;
  flex-grow: 1;
}

.article-title:hover {
  color: #42b883;
}

/* 没有文章时的提示 */
.no-results {
  text-align: center;
  color: #999;
  padding: 40px 0;
}



/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    max-width: 100%;
    padding: 20px 12px;
  }

  .archive-section {
    padding: 20px;
  }

  .article-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .article-date {
    width: auto;
  }
}
</style>