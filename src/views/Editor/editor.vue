<template>
  <div class="editor-container">

    <!-- 表单区域卡片 -->
    <div class="form-card">
      <div class="form-row">
        <div class="form-item">
          <label class="form-label">
            <svg class="label-icon" viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor"
                d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
            </svg>
            文章标题
          </label>
          <el-input v-model="article.title" placeholder="请输入文章标题（建议不超过50字）" class="title-input" maxlength="100"
            show-word-limit />
        </div>
        <div class="form-item">
          <label class="form-label">
            <svg class="label-icon" viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor"
                d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z" />
            </svg>
            文章标签
          </label>
          <el-select v-model="article.tag" placeholder="请选择标签分类" class="tag-select">
            <el-option v-for="item in options" :key="item.id" :label="item.tag" :value="item.id" />
          </el-select>
        </div>
      </div>

      <!-- 文章描述 -->
      <div class="form-row" style="margin-top: 20px;">
        <div class="form-item" style="flex: 1;">
          <label class="form-label">
            <svg class="label-icon" viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z" />
            </svg>
            文章描述
          </label>
          <el-input v-model="article.description" type="textarea" :rows="4" placeholder="请输入文章描述（建议不超过300字）"
            maxlength="300" show-word-limit class="description-input" />
        </div>
      </div>

      <!-- 文章封面 -->
      <div class="form-row" style="margin-top: 20px;">
        <div class="form-item" style="flex: 1;">
          <label class="form-label">
            <svg class="label-icon" viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
            文章封面
          </label>
          <div class="cover-upload-wrapper">
            <el-upload
              ref="coverUpload"
              :http-request="handleCoverUpload"
              list-type="picture-card"
              :limit="1"
              :multiple="false"
              :on-exceed="handleCoverExceed"
              :on-remove="handleCoverRemove"
              :on-success="handleCoverSuccess"
              :file-list="coverFileList"
              accept="image/jpeg,image/png,image/webp,image/gif"
            >
              <el-icon><Plus /></el-icon>
              <template #file="{ file }">
                <div>
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                  <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handleCoverPreview(file.url)">
                      <el-icon><ZoomIn /></el-icon>
                    </span>
                    <span class="el-upload-list__item-delete" @click="handleCoverRemove">
                      <el-icon><Delete /></el-icon>
                    </span>
                  </span>
                </div>
              </template>
            </el-upload>
            <div class="cover-tip" v-if="!article.image">
              <p>支持 JPG / PNG / WebP，建议尺寸 1200×630</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 封面图片预览 -->
    <el-dialog v-model="coverPreviewVisible" title="封面预览" width="40%" top="5vh" destroy-on-close>
      <img :src="coverPreviewUrl" style="width: 100%; border-radius: 8px;" alt="封面预览" />
    </el-dialog>

    <!-- 编辑器区域卡片 -->
    <div class="editor-card">
      <div class="editor-header">
        <div class="editor-header-left">
          <svg class="icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor"
              d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z" />
          </svg>
          <span class="editor-title">Markdown 编辑</span>
        </div>
      </div>
      <mavon-editor ref="md" class="markdown-editor" @imgAdd="$imgAdd" v-model="article.neirong" :toolbars="markdownOption"
        @save="save()" />
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, ZoomIn, Delete } from '@element-plus/icons-vue'
export default {
  data() {
    return {
      options: [],
      // 文章数据
      article: {
        title: '',
        neirong: '',
        tag: null,
        description: '',
        image: '',
      },
      // 封面上传
      coverFileList: [],
      coverPreviewVisible: false,
      coverPreviewUrl: '',
      //往后端传的对象格式的文章
      addarticle: {
        neirong: '',
      },
      // 是否为编辑模式
      isEdit: false,
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
  components: {
    Plus,
    ZoomIn,
    Delete
  },
  methods: {
    $imgAdd(pos, $file) {
      var formdata = new FormData();
      formdata.append('file', $file);
      request({
        url: '/up/upload',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((res) => {
        if (res.code === 200) {
          this.$refs.md.$img2Url(pos, res.data.url);
        } else {
          this.$message.error(res.message || '图片上传失败');
        }
      }).catch(() => {
        this.$message.error('图片上传失败');
      });
    },
    // 封面上传
    handleCoverUpload(options) {
      const formdata = new FormData();
      formdata.append('file', options.file);
      request({
        url: '/up/upload',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((res) => {
        if (res.code === 200) {
          this.article.image = res.data.url;
          this.coverFileList = [{ name: 'cover', url: res.data.url }];
          options.onSuccess(res.data, options.file);
        } else {
          options.onError(new Error(res.message || '封面上传失败'));
          ElMessage.error(res.message || '封面上传失败');
        }
      }).catch((err) => {
        options.onError(err);
        ElMessage.error('封面上传失败');
      });
    },
    handleCoverRemove() {
      this.article.image = '';
      this.coverFileList = [];
    },
    handleCoverExceed() {
      ElMessage.warning('只能上传一张封面图片');
    },
    handleCoverSuccess(response, file, fileList) {
      this.coverFileList = fileList;
    },
    handleCoverPreview(url) {
      this.coverPreviewUrl = url;
      this.coverPreviewVisible = true;
    },
    save() {
      ElMessageBox.confirm(
        '确定保存吗？',
        '注意',
        {
          confirmButtonText: '保存',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          const that = this
          if (this.isEdit) {
            // 编辑模式：调用更新接口
            request({
              url: '/article/updateArticle',
              method: 'put',
              data: this.article
            }).then(res => {
              if (res.code === 200) {
                that.$message.success(res.message)
              } else {
                that.$message.error(res.message)
              }
            })
          } else {
            // 新增模式
            request({
              url: '/article/addArticle',
              method: 'post',
              data: this.article
            }).then(res => {
              if (res.code === 200) {
                that.$message.success(res.message)
                that.article.title = ''
                that.article.neirong = ''
                that.article.tag = null
                that.article.description = ''
                that.article.image = ''
                that.coverFileList = []
              } else {
                that.$message.error(res.message)
              }
            })
          }
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '用户取消操作',
          })
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
    },
    // 获取所有标签
    getTags() {
      request({
        url: '/tag/getAllTags',
        method: 'get',
      }).then((res) => {
        if (res.code === 200) {
          this.options = res.data;
        }
      }).catch((error) => {
        console.error('获取标签失败：', error);
        ElMessage.error('获取标签失败');
      });
    },
    // 根据ID加载文章数据
    getArticleById(id) {
      request({
        url: '/article/getArticleById',
        method: 'get',
        params: { id }
      }).then((res) => {
        if (res.code === 200) {
          const data = res.data.records;
          this.article = {
            id: data.id,
            title: data.title,
            neirong: data.neirong,
            tag: data.tag,
            description: data.description,
            image: data.image || '',
            state: data.state,
          };
          if (data.image) {
            this.coverFileList = [{ name: 'cover', url: data.image }];
          }
          this.isEdit = true;
        } else {
          this.$message.error('获取文章失败');
        }
      });
    }
  },
  mounted() {
    // 页面加载时获取标签
    this.getTags();
    // 如果路由带有id参数，加载文章数据
    const id = this.$route.params.id;
    if (id) {
      this.getArticleById(id);
    }
  },
};
</script>

<style scoped>
.editor-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

/* 顶部标题卡片 */
.header-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
  color: white;
  animation: fadeInDown 0.6s ease-out;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.header-title h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.header-title .icon {
  opacity: 0.9;
}

.header-desc {
  margin: 0;
  font-size: 14px;
  opacity: 0.85;
  margin-left: 40px;
}

/* 表单区域卡片 */
.form-card {
  background: white;
  border-radius: 12px;
  padding: 28px;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  animation: fadeIn 0.6s ease-out;
}

.form-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.form-item {
  flex: 1;
  min-width: 280px;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.label-icon {
  color: #667eea;
}

.title-input,
.tag-select,
.description-input {
  width: 100%;
}

/* 封面上传区域 */
.cover-upload-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
}

.cover-upload-wrapper :deep(.el-upload--picture-card) {
  width: 200px;
  height: 120px;
  border: 2px dashed #d9d9d9;
  border-radius: 10px;
  transition: all 0.3s;
  background: #fafbfc;
}

.cover-upload-wrapper :deep(.el-upload--picture-card:hover) {
  border-color: #42b883;
  background: #f0faf5;
}

.cover-upload-wrapper :deep(.el-upload-list--picture-card) {
  --el-upload-list-picture-card-size: 200px;
  height: 120px;
}

.cover-upload-wrapper :deep(.el-upload-list__item) {
  width: 200px;
  height: 120px;
  border-radius: 10px;
  overflow: hidden;
  margin: 0;
}

.cover-upload-wrapper :deep(.el-upload-list__item-thumbnail) {
  object-fit: cover;
}

.cover-tip {
  flex: 1;
  min-width: 180px;
  padding-top: 6px;
}

.cover-tip p {
  margin: 0;
  font-size: 13px;
  color: #999;
  line-height: 1.6;
}

/* 上传图标大小 */
.cover-upload-wrapper :deep(.el-icon--upload) {
  font-size: 28px;
  color: #bbb;
}

/* Element Plus 预览弹窗中的图片 */
:deep(.el-dialog__body img) {
  display: block;
  max-width: 100%;
  height: auto;
}

/* 编辑器区域卡片 */
.editor-card {
  background: white;
  border-radius: 12px;
  padding: 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  animation: fadeIn 0.8s ease-out;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e8ecf1;
  background: #fafbfc;
}

.editor-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.editor-header-left .icon {
  color: #667eea;
}

.editor-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.editor-actions {
  display: flex;
  gap: 12px;
}

.btn-icon {
  margin-right: 6px;
  vertical-align: middle;
}

/* Markdown 编辑器样式 */
.markdown-editor {
  height: calc(100vh - 380px);
  min-height: 500px;
  border: none;
  box-shadow: none;
}

/* 动画效果 */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* ========== 响应式设计 - 平板/大屏手机 ========== */
@media (max-width: 768px) {
  .editor-container {
    padding: 12px;
  }

  .header-card {
    padding: 20px;
  }

  .header-title h1 {
    font-size: 22px;
  }

  .header-desc {
    margin-left: 32px;
    font-size: 13px;
  }

  .form-card {
    padding: 16px;
    border-radius: 10px;
  }

  .form-row {
    flex-direction: column;
    gap: 16px;
  }

  .form-item {
    min-width: 100%;
  }

  .form-label {
    margin-bottom: 8px;
    font-size: 13px;
  }

  .editor-header {
    padding: 14px 16px;
  }

  .editor-title {
    font-size: 15px;
  }

  .editor-actions {
    width: 100%;
    flex-wrap: wrap;
  }

  .editor-actions button {
    flex: 1;
    min-width: 0;
  }

  .markdown-editor {
    height: calc(100vh - 340px);
    min-height: 400px;
  }
}

/* ========== 响应式设计 - 小屏手机 ========== */
@media (max-width: 480px) {
  .editor-container {
    padding: 8px;
  }

  .header-card {
    padding: 16px;
    border-radius: 10px;
  }

  .header-title h1 {
    font-size: 18px;
  }

  .header-desc {
    margin-left: 24px;
    font-size: 12px;
  }

  .form-card {
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 12px;
  }

  .form-row {
    flex-direction: column;
    gap: 12px;
  }

  .form-row[style*="margin-top"] {
    margin-top: 12px !important;
  }

  .form-item {
    min-width: 100%;
  }

  .form-label {
    margin-bottom: 6px;
    font-size: 13px;
    gap: 6px;
  }

  .label-icon {
    width: 14px;
    height: 14px;
  }

  .editor-card {
    border-radius: 8px;
  }

  .editor-header {
    padding: 12px;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }

  .editor-header-left {
    gap: 8px;
  }

  .editor-header-left .icon {
    width: 18px;
    height: 18px;
  }

  .editor-title {
    font-size: 14px;
  }

  .editor-actions {
    width: 100%;
    gap: 8px;
  }

  .editor-actions button {
    flex: 1;
    font-size: 13px;
    padding: 8px 0;
  }

  .markdown-editor {
    height: calc(100vh - 300px);
    min-height: 350px;
  }
}

/* ========== 超小屏手机（< 360px） ========== */
@media (max-width: 360px) {
  .editor-container {
    padding: 4px;
  }

  .form-card {
    padding: 10px;
  }

  .header-title h1 {
    font-size: 16px;
  }

  .markdown-editor {
    height: calc(100vh - 260px);
    min-height: 300px;
  }
}

/* ========== 手机端 mavon-editor 工具栏适配 ========== */
@media (max-width: 768px) {
  :deep(.markdown-editor .v-note-op) {
    flex-wrap: wrap;
    padding: 4px 2px;
  }

  :deep(.markdown-editor .v-note-op .op-icon) {
    margin: 2px !important;
    width: 28px !important;
    height: 28px !important;
    font-size: 13px !important;
  }

  :deep(.markdown-editor .v-note-op .op-divider) {
    margin: 2px 4px !important;
    height: 20px !important;
  }

  /* 编辑区域和预览区域在小屏幕上下排列 */
  :deep(.markdown-editor .v-note-edit) {
    min-height: 200px !important;
  }

  /* 确保编辑器内容区域字体适配 */
  :deep(.markdown-editor .auto-textarea-input) {
    font-size: 14px !important;
  }

  :deep(.markdown-editor .v-show-content) {
    font-size: 14px !important;
    padding: 12px !important;
  }
}

@media (max-width: 480px) {
  :deep(.markdown-editor .v-note-op .op-icon) {
    width: 24px !important;
    height: 24px !important;
    font-size: 11px !important;
    margin: 1px !important;
  }

  :deep(.markdown-editor .auto-textarea-input) {
    font-size: 13px !important;
  }

  :deep(.markdown-editor .v-show-content) {
    font-size: 13px !important;
    padding: 8px !important;
  }

  /* Element Plus 组件适配 */
  :deep(.el-input__inner) {
    font-size: 14px !important;
  }

  :deep(.el-textarea__inner) {
    font-size: 14px !important;
  }

  :deep(.el-select) {
    width: 100% !important;
  }

  :deep(.el-input__count) {
    font-size: 11px !important;
  }

  /* 封面上传移动端适配 */
  .cover-upload-wrapper :deep(.el-upload--picture-card),
  .cover-upload-wrapper :deep(.el-upload-list__item) {
    width: 100% !important;
    height: 140px !important;
  }

  .cover-upload-wrapper :deep(.el-upload-list--picture-card) {
    --el-upload-list-picture-card-size: 140px !important;
    width: 100%;
  }

  .cover-tip {
    width: 100%;
    min-width: unset;
  }
}
</style>