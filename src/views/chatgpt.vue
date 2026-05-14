<template>
  <div class="about-page">
    <!-- 顶部导航 -->
    <header class="top-nav">
      <div class="nav-left">
        <span class="nav-logo">🌿</span>
        <div class="nav-info">
          <strong>林间一隅</strong>
          <small>一个热爱生活与代码的开发者</small>
        </div>
      </div>
      <nav class="nav-links">
        <a href="#" class="nav-item active"><span>🏠</span><span>首页</span></a>
        <a href="#" class="nav-item"><span>📄</span><span>文章</span></a>
        <a href="#" class="nav-item"><span>📑</span><span>分类</span></a>
        <a href="#" class="nav-item"><span>🏷️</span><span>标签</span></a>
        <a href="#" class="nav-item"><span>👤</span><span>关于我</span></a>
      </nav>
      <div class="nav-right">

      </div>
    </header>

    <!-- Hero 区域：头像 + 问候 + 风景图 -->
    <section class="hero-section">
      <div class="hero-avatar">
        <img src="https://img.jinha.vip/tidai.png" alt="头像" />
      </div>
      <div class="hero-text">
        <h1 class="hero-greeting">你好，我是<span class="highlight">林间一隅</span> 🍃</h1>
        <p class="hero-desc">热爱编程、设计与写作，喜欢在代码中创造价值。</p>
        <p class="hero-desc">在文字中记录生活。这里是我的个人博客，</p>
        <p class="hero-desc">希望我的分享能对你有所帮助。</p>
        <div class="social-links">
          <a href="#" class="social-icon" title="GitHub">⭕</a>
          <a href="#" class="social-icon" title="知乎">知</a>
          <a href="#" class="social-icon" title="邮箱">✉️</a>
          <a href="#" class="social-icon" title="RSS">📡</a>
        </div>
      </div>
      <div class="hero-image">
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
          alt="风景" />
      </div>
    </section>

    <!-- 三栏内容区 -->
    <main class="content-grid">
      <!-- 左栏：精选文章 + 最新文章 -->
      <div class="col-left">
        <!-- 精选文章 -->
        <section class="card featured-card">
          <div class="card-header">
            <span class="card-title">⭐ 精选文章</span>
            <router-link to="/main/indexhome" class="view-all">查看全部 →</router-link>
          </div>
          <div class="featured-list">
            <article v-for="(post, i) in featuredPosts" :key="i" class="featured-item">
              <div class="feat-thumb">
                <img :src="post.thumb || 'https://img.jinha.vip/tidai.png'" alt="" />
              </div>
              <div class="feat-info">
                <h4>{{ post.title }}</h4>
                <p>{{ post.desc }}</p>
                <div class="feat-meta">
                  <span v-for="(tag, j) in post.tags" :key="j" class="tag"># {{ tag }}</span>
                  <span class="date">● {{ post.date }}</span>
                  <span class="views">👁 {{ post.views }}</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <!-- 最新文章 -->
        <section class="card latest-card">
          <div class="card-header">
            <span class="card-title">📄 最新文章</span>
          </div>
          <article class="latest-item">
            <div class="latest-thumb">
              <img src="https://img.jinha.vip/tidai.png" alt="" />
              <span class="thumb-badge">TS</span>
            </div>
            <div class="latest-info">
              <h4>{{ latestPost.title }}</h4>
              <p>{{ latestPost.desc }}</p>
              <div class="latest-meta">
                <span v-for="(tag, k) in latestPost.tags" :key="k" class="mini-tag"># {{ tag }}</span>
                <span class="date">● {{ latestPost.date }}</span>
                <span class="views">👁 {{ latestPost.views }}</span>
              </div>
            </div>
          </article>
        </section>
      </div>

      <!-- 中栏：关于我 -->
      <div class="col-center">
        <section class="card about-card">
          <div class="card-header">
            <span class="card-title">🧑 关于我</span>
          </div>
          <div class="about-body">
            <p>一名全栈开发者，喜欢代码解决问题，也喜欢用文字记录思考。</p>
            <p>目前专注于前端开发和技术的分享，业余时间喜欢阅读、摄影和徒步旅行。</p>

            <div class="info-list">
              <div class="info-row"><span class="info-icon">📍</span><span>坐标：中国 · 杭州</span></div>
              <div class="info-row"><span class="info-icon">💼</span><span>职业：软件工程师</span></div>
              <div class="info-row"><span class="info-icon">💡</span><span>兴趣：编程、阅读、摄影、旅行</span></div>
              <div class="info-row"><span class="info-icon">📮</span><span>邮箱：linjianyiyu@example.com</span></div>
            </div>

            <button class="more-btn">了解更多 →</button>
          </div>
        </section>

        <!-- 最新评论 -->
        <section class="card comments-card">
          <div class="card-header">
            <span class="card-title">💬 最新评论</span>
          </div>
          <div class="comment-list">
            <div v-for="(c, i) in comments" :key="i" class="comment-item">
              <img :src="c.avatar || 'https://img.jinha.vip/tidai.png'" alt="" class="comment-avatar" />
              <div class="comment-body">
                <div class="comment-head">
                  <strong>{{ c.name }}</strong>
                  <span class="comment-time">{{ c.time }}</span>
                </div>
                <p class="comment-text">{{ c.text }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- 右栏：文章分类 + 热门标签 -->
      <div class="col-right">
        <section class="card categories-card">
          <div class="card-header">
            <span class="card-title">📂 文章分类</span>
          </div>
          <ul class="cat-list">
            <li v-for="(cat, i) in categories" :key="i" class="cat-row">
              <span class="cat-name"><span class="cat-icon">{{ cat.icon }}</span>{{ cat.name }}</span>
              <span class="cat-count">{{ cat.count }}</span>
            </li>
          </ul>
          <div class="view-all-wrap">
            <a href="#" class="view-more-link">查看全部分类 →</a>
          </div>
        </section>

        <section class="card tags-card">
          <div class="card-header">
            <span class="card-title">🏷️ 热门标签</span>
          </div>
          <div class="tag-cloud">
            <span v-for="(t, i) in tags" :key="i" class="cloud-tag">{{ t }}</span>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'ChatGPT',
  data() {
    return {
      featuredPosts: [
        {
          title: '从 0 到 1 搭建个人博客网站',
          desc: '分享我从零开始搭建个人博客的全过程，包括技术选型...',
          thumb: '',
          tags: ['博客', 'Hexo', '教程'],
          date: '2024-05-12',
          views: '1.2k'
        },
        {
          title: 'JavaScript 中的闭包详解',
          desc: '深入理解 JavaScript 的闭包概念，应用场景以及常见陷阱，通过实际案例真正理解其本质。',
          thumb: '',
          tags: ['JavaScript', '前端', '前端'],
          date: '2024-04-28',
          views: '968'
        },
        {
          title: '我的 2024 年度读书推荐',
          desc: '整理了今年读过的几本好书，涵盖编程、思维、文学等领域，希望能帮助到大家一起成长。',
          thumb: '',
          tags: ['书单', '推荐', '成长'],
          date: '2024-04-15',
          views: '732'
        }
      ],
      latestPost: {
        title: 'TypeScript 的类型体操入门',
        desc: '通过一些有趣的例子，带你入门 TypeScript 的类型体操，提升类型编程能力。',
        thumb: '',
        tags: ['TypeScript', '类型体操'],
        date: '2024-05-18',
        views: '542'
      },
      categories: [
        { name: '前端开发', icon: '🖥', count: 28 },
        { name: '后端开发', icon: '⚙', count: 16 },
        { name: '开发工具', icon: '🛠', count: 12 },
        { name: '设计与产品', icon: '🎨', count: 8 },
        { name: '随笔记录', icon: '✍', count: 24 },
        { name: '读书笔记', icon: '📚', count: 10 }
      ],
      tags: ['TypeScript', 'Vue', 'React', 'Node.js', 'CSS', '性能优化', '工程化', 'Git', '算法与数据结构'],
      comments: [
        {
          name: '小明',
          avatar: '',
          text: '这篇文章写得太好了，解决了困扰我多天的问题！',
          time: '2 天前'
        },
        {
          name: '程序员小周',
          avatar: '',
          text: '请问有相关的基础吗？想学习一下。',
          time: '3 天前'
        }
      ]
    };
  },
};
</script>

<style scoped>
/* ====== 全局 ====== */
.about-page {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background-color: #f7f8f9;
  color: #333;
  min-height: 100vh;
}

/* ====== 顶部导航 ====== */
.top-nav {
  background: #fff;
  border-bottom: 1px solid #eee;
  padding: 0 24px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-logo {
  font-size: 1.6rem;
}

.nav-info {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}

.nav-info strong {
  font-size: 0.95rem;
  color: #333;
}

.nav-info small {
  font-size: 0.75rem;
  color: #999;
}

.nav-links {
  display: flex;
  gap: 6px;
}

.nav-item {
  padding: 8px 14px;
  border-radius: 8px;
  text-decoration: none;
  color: #666;
  font-size: 0.88rem;
  transition: all 0.25s;
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-item:hover,
.nav-item.active {
  background: #f0f5f1;
  color: #42b883;
  font-weight: 500;
}

.nav-right {
  display: flex;
  gap: 8px;
}

.icon-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: #f5f5f5;
  cursor: pointer;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s;
}

.icon-btn:hover {
  background: #e8f5ec;
}

/* ====== Hero 区域 ====== */
.hero-section {
  max-width: 1140px;
  margin: 30px auto 0;
  padding: 0 24px;
  display: grid;
  grid-template-columns: auto 1fr 380px;
  gap: 36px;
  align-items: start;
}

.hero-avatar {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #fff;
  box-shadow: 0 4px 20px rgba(66, 184, 131, 0.15);
  position: relative;
  background: linear-gradient(135deg, #42b883, #35495e);
  flex-shrink: 0;
}

.hero-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.hero-text {
  padding-top: 10px;
}

.hero-greeting {
  font-size: 1.65rem;
  margin: 0 0 12px;
  font-weight: 700;
}

.highlight {
  color: #42b883;
}

.hero-desc {
  color: #777;
  font-size: 0.92rem;
  line-height: 1.7;
  margin: 2px 0;
}

.social-links {
  display: flex;
  gap: 12px;
  margin-top: 18px;
  margin-bottom: 20px;
}

.social-icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1.5px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  color: #666;
  text-decoration: none;
  transition: all 0.25s;
}

.social-icon:hover {
  border-color: #42b883;
  color: #42b883;
  transform: translateY(-2px);
}

.search-btn {
  background: linear-gradient(135deg, #5b9a72, #4a8060);
  color: #fff;
  border: none;
  padding: 8px 22px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(91, 154, 114, 0.3);
}

.search-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(91, 154, 114, 0.35);
}

.hero-image {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.hero-image img {
  width: 380px;
  height: 220px;
  object-fit: cover;
  display: block;
}

/* ====== 内容三栏布局 ====== */
.content-grid {
  max-width: 1140px;
  margin: 0 auto;
  padding: 30px 24px 50px;
  display: grid;
  grid-template-columns: 1fr 320px 240px;
  gap: 24px;
  align-items: start;
}

/* ====== 卡片通用 ====== */
.card {
  background: #fff;
  border-radius: 14px;
  padding: 22px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.card-title {
  font-size: 0.98rem;
  font-weight: 650;
  color: #2c3e50;
}

.view-all {
  font-size: 0.82rem;
  color: #42b883;
  text-decoration: none;
  transition: color 0.25s;
}

.view-all:hover {
  color: #38a373;
}

/* ====== 精选文章 ====== */
.featured-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.featured-item {
  display: flex;
  gap: 14px;
  cursor: pointer;
  transition: transform 0.25s;
  border-radius: 10px;
  padding: 6px;
}

.featured-item:hover {
  background: #fafafa;
  transform: translateX(3px);
}

.feat-thumb {
  width: 110px;
  height: 75px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background: #eee;
}

.feat-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.feat-info h4 {
  font-size: 0.93rem;
  margin: 0 0 5px;
  color: #2c3e50;
  line-height: 1.4;
}

.feat-info p {
  font-size: 0.8rem;
  color: #999;
  margin: 0 0 6px;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.feat-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  font-size: 0.73rem;
  color: #42b883;
}

.date {
  font-size: 0.73rem;
  color: #bbb;
}

.views {
  font-size: 0.73rem;
  color: #bbb;
}

/* ====== 最新文章 ====== */
.latest-card {
  margin-top: 24px;
}

.latest-item {
  display: flex;
  gap: 14px;
  cursor: pointer;
  border-radius: 10px;
  padding: 6px;
  transition: background 0.25s;
}

.latest-item:hover {
  background: #fafafa;
}

.latest-thumb {
  width: 120px;
  height: 90px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  background: linear-gradient(135deg, #2d5a3f, #1a3328);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.latest-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumb-badge {
  position: absolute;
  bottom: 6px;
  right: 6px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  letter-spacing: 1px;
}

.latest-info h4 {
  font-size: 0.96rem;
  margin: 0 0 5px;
  color: #2c3e50;
}

.latest-info p {
  font-size: 0.82rem;
  color: #999;
  margin: 0 0 8px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.latest-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.mini-tag {
  font-size: 0.73rem;
  color: #42b883;
}

/* ====== 关于我 ====== */
.about-body p {
  font-size: 0.87rem;
  color: #666;
  line-height: 1.75;
  margin: 0 0 10px;
}

.info-list {
  margin: 16px 0;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.84rem;
  color: #555;
  padding: 5px 0;
}

.info-icon {
  font-size: 0.9rem;
}

.more-btn {
  width: 100%;
  background: linear-gradient(135deg, #5b9a72, #4a8060);
  color: #fff;
  border: none;
  padding: 8px 0;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.85rem;
  margin-top: 8px;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(91, 154, 114, 0.25);
}

.more-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(91, 154, 114, 0.3);
}

/* ====== 最新评论 ====== */
.comments-card {
  margin-top: 24px;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.comment-item {
  display: flex;
  gap: 10px;
}

.comment-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  flex-shrink: 0;
  object-fit: cover;
  background: #eee;
}

.comment-body {
  flex: 1;
}

.comment-head {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 3px;
}

.comment-head strong {
  font-size: 0.83rem;
  color: #333;
}

.comment-time {
  font-size: 0.72rem;
  color: #ccc;
}

.comment-text {
  font-size: 0.81rem;
  color: #888;
  margin: 0;
  line-height: 1.5;
}

/* ====== 文章分类 ====== */
.cat-list {
  list-style: none;
  padding: 0;
  margin: 0 0 12px;
}

.cat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 6px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 0.86rem;
  color: #555;
}

.cat-row:hover {
  background: #f0faf5;
  color: #42b883;
}

.cat-name {
  display: flex;
  align-items: center;
  gap: 6px;
}

.cat-icon {
  font-size: 0.85rem;
}

.cat-count {
  font-size: 0.78rem;
  color: #bbb;
}

.view-all-wrap {
  text-align: center;
  padding-top: 4px;
}

.view-more-link {
  font-size: 0.82rem;
  color: #42b883;
  text-decoration: none;
}

/* ====== 热门标签 ====== */
.tags-card {
  margin-top: 24px;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.cloud-tag {
  padding: 5px 13px;
  border-radius: 16px;
  font-size: 0.8rem;
  background: #f5f7f5;
  color: #666;
  border: 1px solid #ececec;
  cursor: pointer;
  transition: all 0.25s;
}

.cloud-tag:hover {
  background: #42b883;
  color: #fff;
  border-color: #42b883;
}

/* ====== 响应式设计 ====== */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr 300px;
    gap: 20px;
  }

  .col-right {
    grid-column: 2 / -1;
  }

  .hero-section {
    grid-template-columns: auto 1fr 300px;
    gap: 24px;
  }

  .hero-image img {
    width: 300px;
    height: 180px;
  }
}

@media (max-width: 800px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .col-right {
    grid-column: auto;
  }

  .hero-section {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 20px;
  }

  .hero-avatar {
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }

  .hero-image img {
    width: 100%;
    height: 200px;
  }

  .social-links {
    justify-content: center;
  }

  .nav-links {
    display: none;
  }
}
</style>
