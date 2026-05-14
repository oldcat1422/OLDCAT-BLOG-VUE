<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="nav-content">
      <h1 class="logo">
        <span>OLDCATBLOG</span>
      </h1>
      <!-- 桌面端导航 -->
      <div class="nav-links" v-if="!isMobile">
        <router-link to="/main/indexhome">首页</router-link>
        <router-link to="/main/guidang">归档</router-link>
        <router-link to="/main/aboutme">关于</router-link>
        <router-link v-if="isAdmin" to="/admin">后台管理</router-link>
        <el-dropdown v-if="isLoggedIn" @command="handleCommand">
          <span class="user-greeting">
            你好，{{ isAdmin ? '管理员' : '用户' }}
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <router-link v-else to="/login" class="login-btn">登录</router-link>
      </div>
      <!-- 移动端菜单按钮 -->
      <div class="mobile-menu" v-else>
        <button class="mobile-menu-btn" @click="mobileMenuVisible = !mobileMenuVisible" :aria-label="mobileMenuVisible ? '关闭菜单' : '打开菜单'">
          <span class="menu-icon-box" :class="{ open: mobileMenuVisible }">
            <span class="menu-bar"></span>
            <span class="menu-bar"></span>
            <span class="menu-bar"></span>
          </span>
        </button>
      </div>
    </div>
    <!-- 移动端下拉菜单 -->
    <div class="mobile-nav-links" v-if="isMobile && mobileMenuVisible">
      <router-link to="/main/indexhome" @click="mobileMenuVisible = false">首页</router-link>
      <router-link to="/main/guidang" @click="mobileMenuVisible = false">归档</router-link>
      <router-link to="/main/aboutme" @click="mobileMenuVisible = false">关于</router-link>
      <router-link v-if="isAdmin" to="/admin" @click="mobileMenuVisible = false">后台管理</router-link>
      <router-link v-if="!isLoggedIn" to="/login" @click="mobileMenuVisible = false">登录</router-link>
      <a v-if="isLoggedIn" href="javascript:void(0)" @click="handleLogout" class="logout-link">退出登录</a>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import { ArrowDown } from '@element-plus/icons-vue'

export default {
  name: 'IndexHead',
  components: {
    ArrowDown
  },
  data() {
    return {
      isMobile: false,
      mobileMenuVisible: false,
      isScrolled: false
    }
  },
  computed: {
    ...mapGetters('user', ['isAdmin', 'isLoggedIn'])
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth <= 768
      if (!this.isMobile) {
        this.mobileMenuVisible = false
      }
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 20
    },
    handleCommand(command) {
      if (command === 'logout') {
        this.$store.dispatch('user/logout')
        this.$router.push('/login')
      }
    },
    handleLogout() {
      this.mobileMenuVisible = false
      this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  },
  mounted() {
    this.checkMobile()
    window.addEventListener('resize', this.checkMobile)
    window.addEventListener('scroll', this.handleScroll, { passive: true })
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile)
    window.removeEventListener('scroll', this.handleScroll)
  },
  watch: {
    $route() {
      this.mobileMenuVisible = false
    }
  }
};
</script>

<style scoped>
/* 导航栏 */
.navbar {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
  padding: 1rem 0;
  margin: 0;
  transition: all 0.35s ease;
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar.scrolled {
  padding: 0.6rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.nav-content {
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}

.logo {
  font-size: 1.4rem;
  font-weight: 800;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: 1px;
  margin: 0;
}

.logo-icon {
  font-size: 1.5rem;
}

.logo span:last-child {
  background: linear-gradient(135deg, #42b883, #35495e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-links a,
.nav-links router-link {
  margin-left: 6px;
  text-decoration: none;
  color: #666;
  font-size: 0.95rem;
  padding: 6px 14px;
  border-radius: 8px;
  transition: all 0.25s;
  font-weight: 500;
}

.nav-links a:hover,
.nav-links router-link:hover {
  color: #42b883;
  background: #f0faf5;
}

.nav-links a.router-link-active {
  color: #42b883;
  background: #f0faf5;
  font-weight: 600;
}

.login-btn {
  background: linear-gradient(135deg, #42b883, #38a373) !important;
  color: #fff !important;
  padding: 8px 22px !important;
  border-radius: 20px !important;
  font-weight: 600 !important;
  box-shadow: 0 2px 10px rgba(66, 184, 131, 0.3);
  transition: all 0.3s !important;
}

.login-btn:hover {
  background: linear-gradient(135deg, #38a373, #2d8a5f) !important;
  color: #fff !important;
  box-shadow: 0 4px 16px rgba(66, 184, 131, 0.4) !important;
  transform: translateY(-1px);
}

.user-greeting {
  margin-left: 6px;
  color: #42b883;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  outline: none;
  padding: 6px 14px;
  border-radius: 8px;
  transition: all 0.25s;
}

.user-greeting:hover {
  background: #f0faf5;
  color: #38a373;
}

.el-icon--right {
  font-size: 12px;
}

/* ===== 移动端菜单按钮（汉堡图标） ===== */
.mobile-menu-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

.menu-icon-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #f0faf5;
  border: 1px solid #d4f0e2;
  transition: all 0.3s ease;
  gap: 5px;
}

.menu-icon-box:active {
  transform: scale(0.92);
}

.menu-bar {
  display: block;
  width: 18px;
  height: 2px;
  background: #42b883;
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* 打开状态 → X 动画 */
.menu-icon-box.open {
  background: #42b883;
  border-color: #42b883;
}

.menu-icon-box.open .menu-bar {
  background: #fff;
}

.menu-icon-box.open .menu-bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.menu-icon-box.open .menu-bar:nth-child(2) {
  opacity: 0;
}

.menu-icon-box.open .menu-bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ===== 移动端下拉菜单 ===== */
.mobile-nav-links {
  display: flex;
  flex-direction: column;
  padding: 8px 16px 16px;
  border-top: 1px solid #f0f0f0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  animation: mobile-menu-slide 0.25s ease both;
}

@keyframes mobile-menu-slide {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobile-nav-links a {
  display: block;
  padding: 14px 12px;
  text-decoration: none;
  color: #333;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s;
  -webkit-tap-highlight-color: transparent;
}

.mobile-nav-links a:hover,
.mobile-nav-links a:active {
  color: #42b883;
  background: #f0faf5;
}

.mobile-nav-links a.router-link-active {
  color: #42b883;
  background: #f0faf5;
  font-weight: 600;
}

.mobile-nav-links .logout-link {
  color: #f56c6c;
  cursor: pointer;
}

.mobile-nav-links .logout-link:active {
  background: #fef0f0;
}

@media (max-width: 768px) {
  .nav-content {
    padding: 0 16px;
  }

  .logo {
    font-size: 1.2rem;
  }
}
</style>
