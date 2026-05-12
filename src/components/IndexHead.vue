<template>
  <nav class="navbar">
    <div class="nav-content">
      <h1 class="logo">OLDCATBLOG</h1>
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
        <el-button class="mobile-menu-btn" @click="mobileMenuVisible = !mobileMenuVisible" :icon="mobileMenuVisible ? Close : Menu" text />
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
import { ArrowDown, Menu, Close } from '@element-plus/icons-vue'

export default {
  name: 'IndexHead',
  components: {
    ArrowDown,
    Menu,
    Close
  },
  data() {
    return {
      isMobile: false,
      mobileMenuVisible: false
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
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile)
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
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1rem 0;
  margin: 0;
}

.nav-content {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #42b883;
}

.nav-links a, .nav-links router-link {
  margin-left: 20px;
  text-decoration: none;
  color: #666;
  transition: color 0.3s;
}

.nav-links a:hover, .nav-links router-link:hover {
  color: #42b883;
}

.login-btn {
  background: #42b883;
  color: #fff !important;
  padding: 8px 20px;
  border-radius: 20px;
  transition: all 0.3s;
}

.login-btn:hover {
  background: #35a070;
  color: #fff !important;
}

.user-greeting {
  margin-left: 20px;
  color: #42b883;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  outline: none;
}

.user-greeting:hover {
  color: #35a070;
}

.el-icon--right {
  font-size: 12px;
}

/* 移动端菜单按钮 */
.mobile-menu-btn {
  font-size: 22px;
  padding: 4px;
}

/* 移动端下拉菜单 */
.mobile-nav-links {
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  border-top: 1px solid #f0f0f0;
  background: #fff;
}

.mobile-nav-links a {
  padding: 12px 0;
  text-decoration: none;
  color: #666;
  font-size: 1rem;
  border-bottom: 1px solid #f5f5f5;
  transition: color 0.3s;
}

.mobile-nav-links a:hover,
.mobile-nav-links a:active {
  color: #42b883;
}

.mobile-nav-links .logout-link {
  color: #f56c6c;
  cursor: pointer;
}

@media (max-width: 768px) {
  .nav-content {
    padding: 0 12px;
  }
}
</style>
