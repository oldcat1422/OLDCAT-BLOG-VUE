<template>
  <div class="htmleaf-container">
    <div class="wrapper">
      <div class="container">
        <h1>Create Account</h1>
        <form class="form" @keyup.enter.native="register">
          <input v-model="user.username" type="text" placeholder="Username">
          <input v-model="user.password" type="password" placeholder="Password">
          <input v-model="user.confirmPassword" type="password" placeholder="Confirm Password">
          <button type="button" @click="register">Register</button><br>
          <button type="button" @click="goToLogin">Already have an account? Login</button>
        </form>
      </div>

      <ul class="bg-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import request from '@/utils/request'
export default {
  name: 'Register',
  data() {
    return {
      user: {
        username: "",
        password: "",
        confirmPassword: ""
      }
    }
  },
  methods: {
    // 注册
    async register() {
      // 表单验证
      if (this.user.username === '') {
        ElMessage.warning('请输入用户名')
        return
      }
      
      if (this.user.password === '') {
        ElMessage.warning('请输入密码')
        return
      }
      
      if (this.user.confirmPassword === '') {
        ElMessage.warning('请确认密码')
        return
      }
      
      if (this.user.password !== this.user.confirmPassword) {
        ElMessage.error('两次输入的密码不一致')
        return
      }
      
      // 密码强度验证（可选）
      if (this.user.password.length < 6) {
        ElMessage.warning('密码长度不能少于6位')
        return
      }
      
      // 发送注册请求
      const that = this
      request({
        url: '/public/register',
        method: 'post',
        data: {
          username: this.user.username,
          password: this.user.password
        }
      }).then(function (res) {
        console.log(res);
        if (res.code === 200) {
          ElMessage.success('注册成功，请登录')
          that.$router.push("/login")
        } else {
          ElMessage.error(res.message || '注册失败，请稍后重试')
        }
      }).catch(err => {
        console.error('注册请求失败', err)
        ElMessage.error('网络错误，请稍后重试')
      })
    },
    
    // 跳转到登录页面
    goToLogin() {
      this.$router.push("/login")
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-weight: 300;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  font-weight: 300;
}

body ::-webkit-input-placeholder {
  /* WebKit browsers */
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  font-weight: 300;
}

body :-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  opacity: 1;
  font-weight: 300;
}

body ::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  opacity: 1;
  font-weight: 300;
}

body :-ms-input-placeholder {
  /* Internet Explorer 10+ */
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  font-weight: 300;
}

.wrapper {
  background: #50a3a2;
  background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
  background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
  opacity: 0.8;
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 450px; /* 增加高度以适应三个输入框 */
  margin-top: -225px; /* 调整垂直居中 */
  overflow: hidden;

}

.wrapper.form-success .container h1 {
  -webkit-transform: translateY(85px);
  -ms-transform: translateY(85px);
  transform: translateY(85px);
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 0; /* 调整内边距 */
  height: 450px; /* 增加高度 */
  text-align: center;
}

.container h1 {
  font-size: 40px;
  -webkit-transition-duration: 1s;
  transition-duration: 1s;
  -webkit-transition-timing-function: ease-in-put;
  transition-timing-function: ease-in-put;
  font-weight: 200;
  color: white;
  margin-bottom: 20px;
}

form {
  padding: 20px 0;
  position: relative;
  z-index: 2;
}

form input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: 0;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.2);
  width: 250px;
  border-radius: 3px;
  padding: 10px 15px;
  margin: 0 auto 10px auto;
  display: block;
  text-align: center;
  font-size: 18px;
  color: white;
  -webkit-transition-duration: 0.25s;
  transition-duration: 0.25s;
  font-weight: 300;
  max-width: 90%;
}

form input:hover {
  background-color: rgba(255, 255, 255, 0.4);
}

form input:focus {
  background-color: white;
  width: 300px;
  color: #53e3a6;
}

form button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: 0;
  background-color: white;
  border: 0;
  padding: 10px 15px;
  color: #53e3a6;
  border-radius: 3px;
  width: 250px;
  cursor: pointer;
  font-size: 18px;
  -webkit-transition-duration: 0.25s;
  transition-duration: 0.25s;
  margin: 0 auto 10px auto;
}

form button:hover {
  background-color: #f5f7f9;
}

.bg-bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.bg-bubbles li {
  position: absolute;
  list-style: none;
  display: block;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.15);
  bottom: -160px;
  -webkit-animation: square 25s infinite;
  animation: square 25s infinite;
  -webkit-transition-timing-function: linear;
  transition-timing-function: linear;
}

.bg-bubbles li:nth-child(1) {
  left: 10%;
}

.bg-bubbles li:nth-child(2) {
  left: 20%;
  width: 80px;
  height: 80px;
  -webkit-animation-delay: 2s;
  animation-delay: 2s;
  -webkit-animation-duration: 17s;
  animation-duration: 17s;
}

.bg-bubbles li:nth-child(3) {
  left: 25%;
  -webkit-animation-delay: 4s;
  animation-delay: 4s;
}

.bg-bubbles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  -webkit-animation-duration: 22s;
  animation-duration: 22s;
  background-color: rgba(255, 255, 255, 0.25);
}

.bg-bubbles li:nth-child(5) {
  left: 70%;
}

.bg-bubbles li:nth-child(6) {
  left: 80%;
  width: 120px;
  height: 120px;
  -webkit-animation-delay: 3s;
  animation-delay: 3s;
  background-color: rgba(255, 255, 255, 0.2);
}

.bg-bubbles li:nth-child(7) {
  left: 32%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 7s;
  animation-delay: 7s;
}

.bg-bubbles li:nth-child(8) {
  left: 55%;
  width: 20px;
  height: 20px;
  -webkit-animation-delay: 15s;
  animation-delay: 15s;
  -webkit-animation-duration: 40s;
  animation-duration: 40s;
}

.bg-bubbles li:nth-child(9) {
  left: 25%;
  width: 10px;
  height: 10px;
  -webkit-animation-delay: 2s;
  animation-delay: 2s;
  -webkit-animation-duration: 40s;
  animation-duration: 40s;
  background-color: rgba(255, 255, 255, 0.3);
}

@-webkit-keyframes square {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }

  100% {
    -webkit-transform: translateY(-700px) rotate(600deg);
    transform: translateY(-700px) rotate(600deg);
  }
}

@keyframes square {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }

  100% {
    -webkit-transform: translateY(-700px) rotate(600deg);
    transform: translateY(-700px) rotate(600deg);
  }
}
</style>
