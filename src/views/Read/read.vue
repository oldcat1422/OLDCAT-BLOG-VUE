<template>
  <div class="read-container">
    <main class="main-content">
      <article class="article-section">
        <div class="article-header">
          <h1>{{ article.title }}</h1>
          <div class="post-footer">
            <span class="post-date">{{ article.time }}</span>
            <span class="post-views">浏览量: {{ article.pageViews }}</span>
          </div>
        </div>
        <div class="article-content" v-html="renderedContent" />
      </article>

      <aside class="sidebar">
        <div class="sidebar-inner">
          <div class="sidebar-widget toc-widget" v-if="headings.length > 0">
            <h4>目录</h4>
            <ul class="toc-list">
              <li v-for="h in headings" :key="h.id" :class="'toc-lv' + h.level">
                <a :href="'#' + h.id" @click.prevent="scrollTo(h.id)">{{ h.text }}</a>
              </li>
            </ul>
          </div>

          <div class="sidebar-widget recommend-widget" v-if="relatedArticles.length > 0">
            <h4>推荐文章</h4>
            <ul class="recommend-list">
              <li v-for="item in relatedArticles" :key="item.id" @click="readMore(item.id)" class="recommend-item">
                <div class="recommend-title">{{ item.title }}</div>
                <div class="recommend-desc">{{ item.description }}</div>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </main>
  </div>
</template>

<script>
import markdownit from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import request from '@/utils/request'

function slugify(text) {
  return text.trim()
    .toLowerCase()
    .replace(/[^\w一-鿿]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/^(\d)/, 'h-$1')
    || 'heading'
}

export default {
  data() {
    return {
      id: this.$route.params.id,
      article: {},
      neirong: '',
      relatedArticles: []
    }
  },
  computed: {
    headings() {
      return this.parseHeadings(this.neirong)
    },
    renderedContent() {
      return this.renderMarkdown(this.neirong)
    }
  },
  methods: {
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
        console.log('id为' + that.id + '的文章浏览量已加1')
      })
    },
    readMore(id) {
      this.$router.push('/main/read/' + id)
    },
    parseHeadings(content) {
      if (!content) return []
      const withoutCode = content.replace(/```[\s\S]*?```/g, '')
      const headingRegex = /^(#{2,4})\s+(.+)$/gm
      const headings = []
      let match
      while ((match = headingRegex.exec(withoutCode)) !== null) {
        const text = match[2].trim()
        headings.push({
          level: match[1].length,
          text,
          id: slugify(text)
        })
      }
      return headings
    },
    renderMarkdown(content) {
      if (!content) return ''
      const md = markdownit({
        html: true,
        linkify: true,
        typographer: true,
        highlight(str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return '<pre class="hljs"><code>' +
                hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                '</code></pre>'
            } catch (__) {}
          }
          return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
        }
      })

      const originalHeadingOpen = md.renderer.rules.heading_open
      md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
        const token = tokens[idx]
        const nextToken = tokens[idx + 1]
        if (nextToken && nextToken.type === 'inline' && nextToken.content) {
          token.attrSet('id', slugify(nextToken.content))
        }
        if (originalHeadingOpen) {
          return originalHeadingOpen(tokens, idx, options, env, self)
        }
        return self.renderToken(tokens, idx, options)
      }

      return md.render(content)
    },
    scrollTo(id) {
      const el = document.getElementById(id)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 20
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.addView()
    this.getOneArticle()
    this.moreSuggest()
  },
  watch: {
    '$route.params.id': {
      handler(newId, oldId) {
        if (newId !== oldId) {
          window.scrollTo(0, 0)
          this.id = newId
          this.getOneArticle()
          this.moreSuggest()
        }
      },
      immediate: true
    }
  }
}
</script>

<style>
/* highlight.js 增强 */
.read-container .hljs {
  border-radius: 8px;
  padding: 16px 20px !important;
  font-size: 14px;
  line-height: 1.6;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.read-container pre code {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 13px;
}

.read-container code:not(.hljs) {
  background: #f0f2f4;
  color: #d63384;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
}
</style>

<style scoped>
.read-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background-color: #f5f7f5;
  min-height: 100vh;
  color: #333;
  line-height: 1.8;
}

.main-content {
  max-width: 1140px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 240px;
  gap: 36px;
  padding: 40px 24px;
}

.article-section {
  min-width: 0;
}

/* 文章头部 */
.article-header {
  background: #fff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  margin-bottom: 16px;
}

.article-header h1 {
  font-size: 2rem;
  margin: 0 0 12px;
  color: #1a1a1a;
  word-break: break-word;
  line-height: 1.4;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.post-date,
.post-views {
  font-size: 0.85rem;
  color: #999;
}

.article-content {
  background: #fff;
  border-radius: 12px;
  padding: 40px 48px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

/* Markdown 排版 */
:deep(.article-content h1) {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
  line-height: 1.4;
}

:deep(.article-content h2) {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 32px 0 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

:deep(.article-content h3) {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 24px 0 10px;
}

:deep(.article-content h4) {
  font-size: 1.05rem;
  font-weight: 600;
  color: #444;
  margin: 20px 0 8px;
}

:deep(.article-content p) {
  margin: 0 0 16px;
  color: #444;
}

:deep(.article-content a) {
  color: #42b883;
  text-decoration: none;
}

:deep(.article-content a:hover) {
  text-decoration: underline;
}

:deep(.article-content strong) {
  font-weight: 600;
  color: #1a1a1a;
}

:deep(.article-content blockquote) {
  margin: 16px 0;
  padding: 12px 20px;
  border-left: 4px solid #42b883;
  background: #f8fdfa;
  color: #555;
  border-radius: 0 6px 6px 0;
}

:deep(.article-content blockquote p) {
  margin: 0;
}

:deep(.article-content ul),
:deep(.article-content ol) {
  margin: 0 0 16px;
  padding-left: 24px;
}

:deep(.article-content li) {
  margin-bottom: 6px;
}

:deep(.article-content li > ul),
:deep(.article-content li > ol) {
  margin-bottom: 0;
}

:deep(.article-content hr) {
  border: none;
  border-top: 1px solid #eee;
  margin: 32px 0;
}

:deep(.article-content table) {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 0.95rem;
  display: block;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

:deep(.article-content th),
:deep(.article-content td) {
  padding: 10px 14px;
  border: 1px solid #e0e0e0;
  text-align: left;
}

:deep(.article-content th) {
  background: #f5f7f5;
  font-weight: 600;
  color: #2c3e50;
}

:deep(.article-content tr:nth-child(even)) {
  background: #fafcfa;
}

:deep(.article-content img) {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 20px auto;
  border-radius: 8px;
}

:deep(.article-content pre) {
  margin: 16px 0;
  border-radius: 8px;
  overflow: hidden;
}

/* 侧边栏 */
.sidebar {
  align-self: start;
}

.sidebar-inner {
  position: sticky;
  top: 80px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}

.sidebar-inner::-webkit-scrollbar {
  width: 4px;
}

.sidebar-inner::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 2px;
}

.sidebar-widget {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.toc-widget {
  margin-bottom: 16px;
}

.sidebar-widget h4 {
  border-left: 4px solid #42b883;
  padding-left: 12px;
  margin: 0 0 14px;
  font-size: 1rem;
  color: #2c3e50;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-list li {
  padding: 4px 0;
  line-height: 1.5;
}

.toc-list a {
  text-decoration: none;
  color: #666;
  font-size: 0.9rem;
  display: block;
  padding: 3px 8px;
  border-radius: 4px;
  transition: all 0.2s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.toc-list a:hover {
  color: #42b883;
  background: #f0faf5;
}

.toc-lv2 { padding-left: 0 !important; }
.toc-lv3 { padding-left: 14px !important; }
.toc-lv3 a { font-size: 0.85rem; }
.toc-lv4 { padding-left: 28px !important; }
.toc-lv4 a { font-size: 0.82rem; color: #888; }

/* 推荐文章 */
.recommend-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.recommend-item {
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 4px;
}

.recommend-item:last-child {
  border-bottom: none;
}

.recommend-item:hover {
  padding-left: 6px;
}

.recommend-title {
  font-size: 0.9rem;
  color: #333;
  font-weight: 500;
  margin-bottom: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recommend-item:hover .recommend-title {
  color: #42b883;
}

.recommend-desc {
  font-size: 0.78rem;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 响应式 */
@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 1fr 200px;
    gap: 24px;
    padding: 30px 16px;
  }
  .article-content { padding: 30px 32px; }
}

@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
    padding: 16px 12px;
  }
  .sidebar { display: none; }

  .article-header {
    padding: 20px 18px;
    border-radius: 8px;
  }
  .article-header h1 { font-size: 1.5rem; }

  .article-content { padding: 20px 18px; border-radius: 8px; }
  :deep(.article-content h1) { font-size: 1.5rem; }
  :deep(.article-content h2) { font-size: 1.25rem; }
  :deep(.article-content h3) { font-size: 1.1rem; }
  :deep(.article-content pre) { font-size: 13px; }
}

@media (max-width: 480px) {
  .article-content { padding: 16px 14px; }
  :deep(.article-content h1) { font-size: 1.3rem; }
}
</style>
