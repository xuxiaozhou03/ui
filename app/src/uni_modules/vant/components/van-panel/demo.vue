<template>
  <demo-block title="基础用法">
    <van-panel title="标题" desc="描述信息" status="状态">
      <div class="content">内容</div>
    </van-panel>
  </demo-block>

  <demo-block title="高级用法">
    <van-panel title="标题" desc="描述信息" status="状态">
      <div class="content">内容</div>
      <template #footer>
        <div class="footer">
          <van-button size="small" custom-class="demo-margin-right"
            >按钮</van-button
          >
          <van-button size="small" type="danger">按钮</van-button>
        </div>
      </template>
    </van-panel>
  </demo-block>
</template>

<script lang="ts" setup>
// 无需 JS 逻辑
</script>
<style>
.content {
  padding: 20px;
  font-size: 16px;
}

.footer {
  text-align: right;
}
</style>
