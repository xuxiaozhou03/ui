
    <template>
    <demo-block title="基础用法">
  <van-nav-bar
    title="标题"
    right-text="按钮"
    left-arrow
    bind:click-left="onClickLeft"
    bind:click-right="onClickRight"
  />
</demo-block>
<demo-block title="高级用法">
  <van-nav-bar title="标题" left-text="返回" left-arrow>
    <van-icon name="search" slot="right" custom-class="icon" size="18" />
  </van-nav-bar>
</demo-block>

    </template>
    <script lang="ts" setup>
    import { cn, bem, commonProps } from "../../utils";
    import { VantComponent } from '../../common/component';

VantComponent({
  methods: {
    onClickLeft() {
      wx.showToast({ title: '点击返回', icon: 'none' });
    },

    onClickRight() {
      wx.showToast({ title: '点击按钮', icon: 'none' });
    },
  },
});

    </script>
    <style>
    .icon {
  color: #1989fa;
}

    </style>
  