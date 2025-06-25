<template>
  <demo-block title="基础用法">
    <van-cell-group>
      <van-field
        v-model="value"
        placeholder="请输入用户名"
        :border="false"
        clearable
      />
    </van-cell-group>
  </demo-block>

  <demo-block title="自定义类型">
    <van-cell-group>
      <van-field
        v-model="username"
        label="用户名"
        placeholder="请输入用户名"
        clearable
        right-icon="question-o"
        right-icon-class="custom-icon"
        required
        @click-icon="onClickIcon"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :border="false"
      />
    </van-cell-group>
  </demo-block>

  <demo-block title="禁用输入框">
    <van-cell-group>
      <van-field
        value="输入框已禁用"
        label="用户名"
        left-icon="contact"
        disabled
        :border="false"
      />
    </van-cell-group>
  </demo-block>

  <demo-block title="错误提示">
    <van-cell-group>
      <van-field
        v-model="username2"
        label="用户名"
        placeholder="请输入用户名"
        error
      />
      <van-field
        v-model="phone"
        label="手机号"
        placeholder="请输入手机号"
        error-message="手机号格式错误"
        :border="false"
      />
    </van-cell-group>
  </demo-block>

  <demo-block title="内容对齐方式">
    <van-cell-group>
      <van-field
        v-model="username3"
        label="用户名"
        placeholder="请输入用户名"
        input-align="right"
      />
    </van-cell-group>
  </demo-block>

  <demo-block title="高度自适应">
    <van-cell-group>
      <van-field
        v-model="message"
        label="留言"
        type="textarea"
        placeholder="请输入留言"
        rows="1"
        autosize
        :border="false"
      />
    </van-cell-group>
  </demo-block>

  <demo-block title="插入按钮">
    <van-cell-group>
      <van-field
        v-model="sms"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        use-button-slot
        :border="false"
      >
        <template #button>
          <van-button size="small" type="primary" class="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
    </van-cell-group>
  </demo-block>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const sms = ref("");
const value = ref("");
const password = ref("");
const username = ref("");
const username2 = ref("");
const username3 = ref("");
const message = ref("");
const phone = ref("1365577");

function onClickIcon() {
  window.alert("点击图标");
}
</script>
<style>
.button {
  vertical-align: middle;
}

.custom-icon {
  color: #1989fa;
}
</style>
