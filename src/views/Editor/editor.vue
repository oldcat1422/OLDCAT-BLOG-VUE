<template>
  <div class="main">
    <h2>请先输入标题</h2>
    <mavon-editor class="edit" v-model="article" :toolbars="markdownOption" @save="save()" />
  </div>
</template>

<script>
import request from '../../utils/request'
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
  data() {
    return {
      // 文章数据
      article: '',
      //往后端传的对象格式的文章
      addarticle: {
        neirong: '',
      },
      // 编辑器状态
      isPreviewMode: false,
      scrollY: 0,
      lastSaved: null,
      lastAutoSaved: null,
      formattedContent: '',
      autoSaveTimer: null,
      autoSaveInterval: null
    };
  },
  computed: {
  },
  methods: {
    save() {
      this.addarticle.neirong = this.article
      request({
        url: '/article/addArticle',
        method: 'post',
        data: this.addarticle
      }).then(function (res) {
        // console.log(res);
        if (res.code === 200) {
          ElMessage({
            type: 'success',
            message: '添加成功',
          })
        }
      })
    },
    // 保存草稿
    saveDraft() {
    },
    // 发布文章
    publishArticle() {
    },
    // 处理滚动事件
    handleScroll() {
      this.scrollY = window.scrollY;
    }
  },
  mounted() {
  },
};
</script>

<style scoped>
.edit {
  height: 100%;
}

.main {
  height: 100%;
}
</style>