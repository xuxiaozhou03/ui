<template>
  <demo-block title="基础用法" padding>
    <div>
      <van-image width="100" height="100" :src="src" />
    </div>
  </demo-block>

  <demo-block title="填充模式" padding>
    <div>
      <div v-for="fit in fits" :key="fit" :span="8">
        <van-image :fit="fit" width="100%" height="27vw" :src="src" />
        <div class="text">{{ fit }}</div>
      </div>
    </div>
  </demo-block>

  <demo-block title="圆形图片" padding>
    <div>
      <div v-for="fit in fits" :key="fit" :span="8">
        <van-image round :fit="fit" width="100%" height="27vw" :src="src" />
        <div class="text">{{ fit }}</div>
      </div>
    </div>
  </demo-block>

  <demo-block title="加载中提示" padding>
    <div>
      <div :span="8">
        <van-image width="100%" height="27vw" />
        <div class="text">默认提示</div>
      </div>

      <div :span="8">
        <van-image width="100%" height="27vw" use-loading-slot>
          <template #loading>
            <van-loading type="spinner" size="20" vertical />
          </template>
        </van-image>
        <div class="text">自定义提示</div>
      </div>
    </div>
  </demo-block>

  <demo-block title="加载失败提示" padding>
    <div>
      <div :span="8">
        <van-image width="100%" height="27vw" src="x" />
        <div class="text">默认提示</div>
      </div>

      <div :span="8">
        <van-image width="100%" height="27vw" src="x" use-error-slot>
          <template #error>
            <span>加载失败</span>
          </template>
        </van-image>
        <div class="text">自定义提示</div>
      </div>
    </div>
  </demo-block>
</template>
<script setup lang="ts">
import { ref } from "vue";

const fits = ref([
  "contain",
  "cover",
  "fill",
  "none",
  "scale-down",
  "widthFix",
  "heightFix",
] as const);
const src = ref("https://img.yzcdn.cn/vant/cat.jpeg");
</script>
<style>
.text {
  width: 100%;
  margin: 5px 0 20px;
  color: #7d7e80;
  font-size: 14px;
  text-align: center;
}
</style>
