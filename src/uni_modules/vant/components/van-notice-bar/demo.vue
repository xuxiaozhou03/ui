
    <template>
    <demo-block title="基础用法">
  <van-notice-bar
    text="{{ text }}"
    left-icon="volume-o"
  />
</demo-block>

<demo-block title="滚动模式">
  <van-notice-bar scrollable text="{{ shortText }}" custom-class="demo-margin-bottom" />
  <van-notice-bar scrollable="{{ false }}" text="{{ text }}" custom-class="demo-margin-bottom" />
</demo-block>

<demo-block title="多行展示">
  <van-notice-bar wrapable scrollable="{{ false }}" text="{{ text }}" />
</demo-block>

<demo-block title="通知栏模式">
  <van-notice-bar mode="closeable" text="{{ shortText }}" />
  <van-notice-bar custom-class="margin-top" mode="link" text="{{ shortText }}" />
</demo-block>

<demo-block title="自定义样式">
  <van-notice-bar
    text="{{ shortText }}"
    color="#1989fa"
    background="#ecf9ff"
    left-icon="info-o"
  >
  </van-notice-bar>
</demo-block>

    </template>
    <script lang="ts" setup>
    import { cn, bem, commonProps } from "../../utils";
    import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    text: '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。',
    shortText: '技术是开发它的人的共同灵魂。',
  },
});

    </script>
    <style>
    .margin-top {
  margin-top: 4px;
}

    </style>
  