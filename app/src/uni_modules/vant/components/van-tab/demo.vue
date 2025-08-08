<template>
  <demo-block title="基础用法">
  <van-tabs active="{{ 1 }}" bind:change="onChange">
    <van-tab
      wx:for="{{ tabs4 }}"
      wx:key="index"
      title="{{ '标签 ' + item }}"
    >
      <view class="content">
        {{ '内容' + item }}
      </view>
    </van-tab>
  </van-tabs>
</demo-block>

<demo-block title="通过名称匹配">
  <van-tabs active="b">
    <van-tab
      wx:for="{{ tabsWithName }}"
      wx:key="index"
      name="{{ item.name }}"
      title="{{ '标签 ' + item.index }}"
    >
      <view class="content">
        {{ '内容' + item.index}}
      </view>
    </van-tab>
  </van-tabs>
</demo-block>

<demo-block title="横向滚动">
  <van-tabs>
    <van-tab
      wx:for="{{ tabs6 }}"
      wx:key="index"
      title="{{ '标签 ' + item }}"
    >
      <view class="content">
        {{ '内容' + item }}
      </view>
    </van-tab>
  </van-tabs>
</demo-block>

<demo-block title="禁用标签">
  <van-tabs bind:disabled="onClickDisabled">
    <van-tab
      wx:for="{{ tabs3 }}"
      wx:key="index"
      disabled="{{ index === 1 }}"
      title="{{ '标签 ' + item }}"
    >
      <view class="content">
        {{ '内容' + item }}
      </view>
    </van-tab>
  </van-tabs>
</demo-block>

<demo-block title="样式风格">
  <van-tabs type="card" tab-class="special-tab">
    <van-tab
      wx:for="{{ tabs3 }}"
      wx:key="index"
      title="{{ '标签 ' + item }}"
    >
      <view class="content-2">
        {{ '内容' + item }}
      </view>
    </van-tab>
  </van-tabs>
</demo-block>

<demo-block title="点击事件">
  <van-tabs bind:click="onClick">
    <van-tab
      wx:for="{{ tabs2 }}"
      wx:key="index"
      title="{{ '标签 ' + item }}"
    >
      <view class="content">
        {{ '内容' + item }}
      </view>
    </van-tab>
  </van-tabs>
</demo-block>

<demo-block title="粘性布局">
  <van-tabs sticky>
    <van-tab
      wx:for="{{ tabs4 }}"
      wx:key="index"
      title="{{ '标签 ' + item }}"
    >
      <view class="content">
        {{ '内容' + item }}
      </view>
    </van-tab>
  </van-tabs>
</demo-block>

<demo-block title="切换动画">
  <van-tabs animated>
    <van-tab
      wx:for="{{ tabs4 }}"
      wx:key="index"
      title="{{ '标签 ' + item }}"
    >
      <view class="content">
        {{ '内容' + item }}
      </view>
    </van-tab>
  </van-tabs>
</demo-block>

<demo-block title="滑动切换">
  <van-tabs swipeable>
    <van-tab
      wx:for="{{ tabs4 }}"
      wx:key="index"
      title="{{ '标签 ' + item }}"
    >
      <view class="content">
        {{ '内容' + item }}
      </view>
    </van-tab>
  </van-tabs>
</demo-block>

<demo-block title="自定义标题">
  <van-tabs active="{{ 1 }}" bind:change="onChange" tab-class="special-tab" tab-active-class="special-tab-active">
    <van-icon
      slot="nav-right"
      name="search"
      custom-class="right-nav"
      bind:click="onClickNavRight"
    />
    <van-tab
      wx:for="{{ tabs4 }}"
      wx:key="index"
      title="{{ '标签 ' + item }}"
      dot="{{ index === 1 }}"
      info="{{ index === 2 ? 99 : null }}"
    >
      <view class="content">
        {{ '内容' + item }}
      </view>
    </van-tab>
  </van-tabs>
</demo-block>

<demo-block title="异步切换">
  <van-tabs active="{{ 1 }}" swipeable use-before-change bind:change="onChange" bind:before-change="onBeforeChange" >
   <van-tab
      wx:for="{{ tabs4 }}"
      wx:key="index"
      title="{{ '标签 ' + item }}"
    >
      <view class="content">
        {{ '内容' + item }}
      </view>
    </van-tab>
  </van-tabs>
</demo-block>


</template>
<script lang="ts" setup>
import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    tabs2: [1, 2],
    tabs3: [1, 2, 3],
    tabs4: [1, 2, 3, 4],
    tabs6: [1, 2, 3, 4, 5, 6],
    tabsWithName: [
      { name: 'a', index: 1 },
      { name: 'b', index: 2 },
      { name: 'c', index: 3 },
    ],
  },

  methods: {
    onClickDisabled(event) {
      wx.showToast({
        title: `标签 ${event.detail.index + 1} 已被禁用`,
        icon: 'none',
      });
    },

    onChange(event) {
      wx.showToast({
        title: `切换到标签 ${event.detail.index + 1}`,
        icon: 'none',
      });
    },

    onClickNavRight() {
      wx.showToast({
        title: '点击 right nav',
        icon: 'none',
      });
    },

    onClick(event) {
      wx.showToast({
        title: `点击标签 ${event.detail.index + 1}`,
        icon: 'none',
      });
    },
    onBeforeChange(event) {
      const { callback, title } = event.detail;

      wx.showModal({
        title: '异步切换',
        content: `确定要切换至 ${title} tab吗？`,
        success: (res) => {
          if (res.confirm) {
            callback(true);
          } else if (res.cancel) {
            callback(false);
          }
        },
      });
    },
  },
});

</script>
<style>.content {
  padding: 20px;
  background-color: #fff;
}

.content-2 {
  padding: 20px;
}

.right-nav {
  padding: 0 10px;
  line-height: 44px !important;
  background-color: #fff;
}

.special-tab {
  transition: all 0.25s ease-in-out;
}

.special-tab-active {
  font-size: 1.05em !important;
}
</style>
