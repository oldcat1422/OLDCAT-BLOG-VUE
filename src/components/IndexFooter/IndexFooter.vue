<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>关于本站</h3>
        <p>{{ siteDescription }}</p>
      </div>

      <div class="footer-section">
        <h3>技术支持</h3>
        <p>Vue.js + Spring Boot</p>
        <p>本项目由 <img src="@/assets/ypylogo.png" alt="又拍云" class="ypy-logo" @click="handleYpyClick" /> 提供 CDN/云存储服务</p>
      </div>

      <div class="footer-section">
        <h3>联系方式</h3>
        <p>Email: {{ contactEmail }}</p>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="copyright">
        &copy; {{ currentYear }} OLDCATBLOG. All Rights Reserved.
      </div>
      <div class="icp-info">
        <span>IP 备案：{{ icpNumber }}</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'IndexFooter',
  data() {
    return {
      siteDescription: 'OLDCATBLOG - 分享技术，记录生活',
      contactEmail: '暂不开放联系',
      icpNumber: '蒙ICP备2025028125 号 -2',
      currentYear: new Date().getFullYear()
    }
  },
  methods: {
    handleYpyClick() {
      window.open('https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral', '_blank')
    }
  }
};
</script>

<style scoped>
.footer {
  background: #2c3e50;
  color: #ecf0f1;
  padding: 3rem 0 1.5rem;
  margin-top: auto;
}

.footer-content {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 20px;
  margin-bottom: 2rem;
}

.footer-section h3 {
  color: #42b883;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.footer-section p {
  color: #bdc3c7;
  line-height: 1.8;
  margin: 0.5rem 0;
  font-size: 0.95rem;
}

.footer-bottom {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.5rem 20px;
  border-top: 1px solid #34495e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  color: #95a5a6;
  font-size: 0.9rem;
}

.icp-info {
  color: #95a5a6;
  font-size: 0.9rem;
}

.icp-info span {
  padding-left: 1rem;
  border-left: 1px solid #34495e;
  margin-left: 1rem;
}

.ypy-logo {
  height: 20px;
  vertical-align: middle;
  margin: 0 4px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }

  .icp-info span {
    padding-left: 0;
    border-left: none;
    margin-left: 0;
  }
}
</style>
