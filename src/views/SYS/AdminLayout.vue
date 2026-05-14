<template>
  <div class="admin-layout">
    <!-- 移动端汉堡按钮 -->
    <div class="mobile-header" v-if="isMobile">
      <button class="mobile-menu-btn" @click="drawerVisible = true" aria-label="打开菜单">
        <span class="menu-icon-box">
          <span class="menu-bar"></span>
          <span class="menu-bar"></span>
          <span class="menu-bar"></span>
        </span>
      </button>
      <h2 class="mobile-title">后台管理</h2>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar :size="28" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- 桌面端侧边栏 -->
    <aside class="sidebar" v-if="!isMobile">
      <div class="sidebar-header">
        <h2>后台管理</h2>
      </div>
      <el-menu
        :default-active="activeMenu"
        class="sidebar-menu"
        background-color="#2c3e50"
        text-color="#fff"
        active-text-color="#42b883"
        router
      >
        <el-menu-item index="/admin/dashboard">
          <el-icon><House /></el-icon>
          <span>仪表盘</span>
        </el-menu-item>
        <el-menu-item index="/admin/articles">
          <el-icon><Document /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/editor">
          <el-icon><Edit /></el-icon>
          <span>文章编辑</span>
        </el-menu-item>
        <el-menu-item index="/admin/tags">
          <el-icon><PriceTag /></el-icon>
          <span>标签管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/users">
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/settings">
          <el-icon><Setting /></el-icon>
          <span>系统设置</span>
        </el-menu-item>
      </el-menu>
      <div class="sidebar-footer">
        <div class="back-home-btn" @click="goToHome">
          <el-icon><HomeFilled /></el-icon>
          <span>返回前台</span>
        </div>
      </div>
    </aside>

    <!-- 移动端抽屉侧边栏 -->
    <el-drawer
      v-model="drawerVisible"
      direction="ltr"
      :size="260"
      :show-close="false"
      class="mobile-drawer"
    >
      <template #header>
        <div class="drawer-header">
          <h2>后台管理</h2>
        </div>
      </template>
      <el-menu
        :default-active="activeMenu"
        class="drawer-menu"
        background-color="#2c3e50"
        text-color="#fff"
        active-text-color="#42b883"
        router
        @select="drawerVisible = false"
      >
        <el-menu-item index="/admin/dashboard">
          <el-icon><House /></el-icon>
          <span>仪表盘</span>
        </el-menu-item>
        <el-menu-item index="/admin/articles">
          <el-icon><Document /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/editor">
          <el-icon><Edit /></el-icon>
          <span>文章编辑</span>
        </el-menu-item>
        <el-menu-item index="/admin/tags">
          <el-icon><PriceTag /></el-icon>
          <span>标签管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/users">
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/settings">
          <el-icon><Setting /></el-icon>
          <span>系统设置</span>
        </el-menu-item>
      </el-menu>
      <div class="drawer-footer">
        <div class="back-home-btn" @click="goToHome">
          <el-icon><HomeFilled /></el-icon>
          <span>返回前台</span>
        </div>
      </div>
    </el-drawer>

    <!-- 主内容区 -->
    <div class="main-container">
      <!-- 顶部导航栏（桌面端） -->
      <header class="top-header" v-if="!isMobile">
        <div class="header-left">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">后台管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{ currentPageTitle }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <span class="user-info">欢迎回来，管理员</span>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <el-avatar :size="32" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                <el-dropdown-item command="settings">设置</el-dropdown-item>
                <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>

      <!-- 内容区域 -->
      <main class="content-wrapper">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import { House, Document, User, Setting, ArrowDown, Edit, PriceTag, HomeFilled } from '@element-plus/icons-vue'
import { mapGetters } from 'vuex'

export default {
  name: 'AdminLayout',
  components: {
    House,
    Document,
    User,
    Setting,
    ArrowDown,
    Edit,
    PriceTag,
    HomeFilled
  },
  data() {
    return {
      isMobile: false,
      drawerVisible: false
    }
  },
  computed: {
    ...mapGetters('user', ['userInfo']),
    activeMenu() {
      return this.$route.path
    },
    currentPageTitle() {
      const routeMap = {
        '/admin/dashboard': '仪表盘',
        '/admin/articles': '文章管理',
        '/admin/editor': '文章编辑',
        '/admin/tags': '标签管理',
        '/admin/users': '用户管理',
        '/admin/settings': '系统设置'
      }
      return routeMap[this.$route.path] || '仪表盘'
    }
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth <= 768
    },
    handleCommand(command) {
      if (command === 'logout') {
        this.$store.dispatch('user/logout')
        this.$router.push('/login')
      } else if (command === 'profile') {
        // 跳转到个人中心
      } else if (command === 'settings') {
        this.$router.push('/admin/settings')
      }
    },
    goToHome() {
      this.drawerVisible = false
      this.$router.push('/main/indexhome')
    }
  },
  mounted() {
    this.checkMobile()
    window.addEventListener('resize', this.checkMobile)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile)
  }
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* 移动端顶部栏 */
.mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  padding: 0 12px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

/* 移动端汉堡按钮 */
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

.mobile-title {
  font-size: 16px;
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
}

/* 侧边栏样式 */
.sidebar {
  width: 240px;
  background-color: #2c3e50;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.sidebar-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1e272e;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 20px;
}

.sidebar-menu {
  border: none;
  flex: 1;
  overflow-y: auto;
}

.sidebar-menu .el-menu-item {
  height: 50px;
  line-height: 50px;
}

.sidebar-menu .el-menu-item:hover {
  background-color: #34495e !important;
}

.sidebar-menu .el-menu-item.is-active {
  background-color: #34495e !important;
  border-right: 3px solid #42b883;
}

.sidebar-footer {
  padding: 20px;
  border-top: 1px solid #34495e;
}

.back-home-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
  background-color: #34495e;
}

.back-home-btn:hover {
  background-color: #42b883;
  color: #fff;
}

.back-home-btn .el-icon {
  font-size: 18px;
}

.back-home-btn span {
  font-size: 14px;
}

/* 抽屉菜单 */
.drawer-header {
  width: 100%;
  text-align: center;
  padding: 10px 0;
}

.drawer-header h2 {
  margin: 0;
  font-size: 18px;
  color: #fff;
}

:deep(.el-drawer) {
  background-color: #2c3e50 !important;
}

:deep(.el-drawer__header) {
  margin-bottom: 0;
  padding: 16px;
  background-color: #1e272e;
}

:deep(.el-drawer__body) {
  padding: 0;
  display: flex;
  flex-direction: column;
}

.drawer-menu {
  border: none;
  flex: 1;
  overflow-y: auto;
  background-color: #2c3e50 !important;
}

.drawer-menu .el-menu-item {
  height: 50px;
  line-height: 50px;
}

.drawer-menu .el-menu-item:hover {
  background-color: #34495e !important;
}

.drawer-menu .el-menu-item.is-active {
  background-color: #34495e !important;
  border-right: 3px solid #42b883;
}

.drawer-footer {
  padding: 20px;
  border-top: 1px solid #34495e;
}

/* 主容器 */
.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #f0f2f5;
}

/* 顶部导航栏 */
.top-header {
  height: 60px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-info {
  color: #666;
  font-size: 14px;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

/* 内容区域 */
.content-wrapper {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  background-color: #f0f2f5;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .admin-layout {
    flex-direction: column;
  }

  .main-container {
    margin-top: 50px;
  }

  .content-wrapper {
    padding: 12px;
  }
}
</style>
