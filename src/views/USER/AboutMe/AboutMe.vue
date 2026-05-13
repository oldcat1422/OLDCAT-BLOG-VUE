<template>
  <div class="about-container">
    <!-- 头部：个人名片 -->
    <header class="profile-header">
      <h1 class="name">OLDCAT</h1>
      <p class="title">非著名开发工程师</p>
      
      <div class="social-links">
        <a href="#" class="social-icon">GitHub</a>
        <a href="#" class="social-icon">QQ</a>
        <a href="#" class="social-icon">WeChat</a>
      </div>
    </header>

    <main class="content-grid">
      <!-- 关于我介绍 -->
      <section class="card bio-card">
        <h2 class="section-title"> 关于我</h2>
        <p class="bio-text" v-html="aboutMeText">
        </p>
      </section>

      <section class="card skills-card">
        <h2 class="section-title">核心技能</h2>
        <div class="skill-tags">
          <span v-for="skill in skills" :key="skill" class="skill-tag">
            {{ skill }}
          </span>
        </div>
      </section>

      <section class="card info-card">
        <h2 class="section-title"> 技术专长</h2>
        <ul class="info-list">
          <li v-for="item in skillList" :key="item.paraId">{{ item.paraVal }}</li>
        </ul>
      </section>
    </main>

    <!-- 底部按钮 -->
    <footer class="about-footer">
      <!-- <button class="contact-btn">联系我 / 合作</button> -->
    </footer>
  </div>
</template>

<script>
import request from '@/utils/request';

export default {
  name: 'AboutMe',
  data() {
    return {
      skills: ['Vue 3', 'JavaScript', 'Vite', 'SpringBoot', 'Element PLUS', 'Node.js', 'Echarts', 'Git', 'Nginx'],
      skillList: [],
      aboutMeText: ''
    }
  },
  methods: {
    getSkillList() {
      request({
        url: '/syspara/public/getSkill',
        method: 'get',
      }).then((res) => {
        if (res.code === 200) {
          this.skillList = res.data;
        }
      });
    },
    getAboutMe() {
      request({
        url: '/syspara/public/getAboutMe',
        method: 'get',
      }).then((res) => {
        if (res.code === 200 && res.data) {
          this.aboutMeText = res.data.paraVal;
        }
      });
    }
  },
  mounted() {
    this.getSkillList();
    this.getAboutMe();
  }
}
</script>

<style scoped>
/* 核心颜色定义 */
:root {
  --vue-green: #42b883;
  --dark-text: #2c3e50;
  --light-bg: #f8f9fa;
}

.about-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Inter', -apple-system, sans-serif;
  color: #2c3e50;
  line-height: 1.6;
  
}

/* 头部样式 */
.profile-header {
  text-align: center;
  margin-bottom: 50px;
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #42b883;
  padding: 5px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.avatar:hover {
  transform: scale(1.05);
}

.status-badge {
  position: absolute;
  bottom: 10px;
  right: 5px;
  width: 20px;
  height: 20px;
  background-color: #42b883;
  border: 3px solid white;
  border-radius: 50%;
}

.name {
  font-size: 2.5rem;
  margin: 10px 0;
  color: #2c3e50;
}

.title {
  color: #666;
  font-size: 1.1rem;
}

.social-links {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.social-icon {
  color: #42b883;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 5px 12px;
  border-radius: 20px;
  border: 1px solid #42b883;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background-color: #42b883;
  color: white;
}

/* 卡片布局 */
.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.card {
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
}

.bio-card {
  grid-column: 1 / -1; /* 横跨整行 */
}

.section-title {
  font-size: 1.3rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  color: #2c3e50;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
}

.icon {
  margin-right: 10px;
}

.bio-text {
  font-size: 1.1rem;
  color: #4a5568;
}

.bio-text strong {
  color: #42b883;
}

/* 技能标签 */
.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skill-tag {
  background-color: #ebf9f2;
  color: #42b883;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;
}

.skill-tag:hover {
  background-color: #42b883;
  color: white;
  transform: translateY(-2px);
}

/* 列表样式 */
.info-list {
  list-style: none;
  padding: 0;
}

.info-list li {
  margin-bottom: 12px;
  padding-left: 20px;
  position: relative;
}

.info-list li::before {
  content: "•";
  color: #42b883;
  font-weight: bold;
  position: absolute;
  left: 0;
}

/* 底部按钮 */
.about-footer {
  text-align: center;
  margin-top: 50px;
}

.contact-btn {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 12px 35px;
  font-size: 1.1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(66, 184, 131, 0.3);
}

.contact-btn:hover {
  background-color: #33a06f;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(66, 184, 131, 0.4);
}

/* 响应式适配 */
@media (max-width: 600px) {
  .name {
    font-size: 2rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .about-container {
    padding: 20px 12px;
  }

  .card {
    padding: 20px;
  }

  .social-links {
    flex-wrap: wrap;
  }
}

@media (max-width: 768px) and (min-width: 601px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>