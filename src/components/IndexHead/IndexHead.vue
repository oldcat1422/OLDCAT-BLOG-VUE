<template>
    <div class="page-container">
        <nav class="navbar" :class="{ 'navbar-scrolled': scrollY > 50 }">
            <div class="container navbar-content">
                <div class="logo">
                    <i class="fa fa-book"></i>
                    <span>OLDCAT</span>
                </div>
                <div class="nav-links">
                    <!-- <a href="#" class="nav-link active" index="/login">首页</a>
                    <a href="#" class="nav-link">发现</a>
                    <a href="#" class="nav-link">分类</a>
                    <a href="#" class="nav-link">关于</a> -->
                </div>
                <div class="nav-actions">
                    <button class="btn write-btn" @click="goToEditor()">
                        <el-icon>
                            <Edit />
                        </el-icon>后台管理
                    </button>
                    <button class="btn write-btn" @click="goToEditor()">登录
                    </button>
                    <div class="user-profile">
                        <!-- <img src="https://oldcatdata.oss-cn-hangzhou.aliyuncs.com/img/weixin.png" alt="用户头像"
                            class="user-avatar"> -->
                    </div>
                </div>
            </div>
        </nav>
    </div>

</template>


<script>
export default {
    name: 'IndexHead',
    data() {
        return {

        }
    },
    methods: {
        // 前往编辑器
        goToEditor() {
            this.$router.push('/bac')
            // 实际应用中会导航到编辑器路由
        },
    }
}
</script>

<style scoped>
.el-menu-demo{
    --el-menu-bg-color: #ffffff00; 
}
.nav-link.active {
    color: #3182CE;
}

.nav-link.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #3182CE;
}

.user-profile {}

.page-container {
    /* min-height: 100vh; */
    font-family: Georgia, Cambria, serif;
    color: #2D3748;
    background-color: #F7FAFC;
}

.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(4px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    z-index: 9999;
    transition: all 0.3s ease;
    padding: 15px 0;
}

.nav-link {
    color: #4A5568;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
    padding: 8px 0;
    position: relative;
}

.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.navbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #2D3748;
    text-decoration: none;
}

.logo i {
    color: #3182CE;
    font-size: 24px;
}

.logo span {
    font-weight: bold;
    font-size: 18px;
}

.nav-links {
    display: flex;
    gap: 24px;
    margin: 0 20px;
}

.nav-actions {
    display: flex;
    align-items: center;
    gap: 16px;
}

.btn {
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
}

.write-btn {
    background-color: #3182CE;
    color: white;
    display: flex;
    align-items: center;
    gap: 8px;
}

.write-btn:hover {
    background-color: #2A69AC;
}

.user-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
}
</style>
