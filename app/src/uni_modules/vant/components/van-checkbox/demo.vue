<template>
  <demo-block title="基本用法">
  <van-checkbox
    value="{{ checkbox1 }}"
    data-key="checkbox1"
    custom-class="demo-checkbox"
    bind:change="onChange"
  >
    复选框
  </van-checkbox>
</demo-block>

<demo-block title="禁用状态">
  <van-checkbox
    disabled
    value="{{ false }}"
    custom-class="demo-checkbox"
  >
    复选框
  </van-checkbox>
  <van-checkbox
    disabled
    value="{{ true }}"
    custom-class="demo-checkbox"
  >
    复选框
  </van-checkbox>
</demo-block>

<demo-block title="自定义形状">
  <van-checkbox
    value="{{ checkboxShape }}"
    data-key="checkboxShape"
    shape="square"
    custom-class="demo-checkbox"
    bind:change="onChange"
  >
    复选框
  </van-checkbox>
</demo-block>

<demo-block title="自定义颜色">
  <van-checkbox
    value="{{ checkbox2 }}"
    data-key="checkbox2"
    checked-color="#07c160"
    custom-class="demo-checkbox"
    bind:change="onChange"
  >
    复选框
  </van-checkbox>
</demo-block>

<demo-block title="自定义大小">
  <van-checkbox
    icon-size="25px"
    value="{{ checkboxSize }}"
    data-key="checkboxSize"
    custom-class="demo-checkbox"
    bind:change="onChange"
  >
    复选框
  </van-checkbox>
</demo-block>

<demo-block title="自定义图标">
  <van-checkbox
    use-icon-slot
    value="{{ checkbox3 }}"
    data-key="checkbox3"
    custom-class="demo-checkbox"
    bind:change="onChange"
  >
    自定义图标
    <image
      slot="icon"
      class="icon"
      mode="widthFix"
      src="{{ checkbox3 ? activeIcon : inactiveIcon }}"
    />
  </van-checkbox>
</demo-block>

<demo-block title="禁用文本点击">
  <van-checkbox
    label-disabled
    value="{{ checkboxLabel }}"
    data-key="checkboxLabel"
    custom-class="demo-checkbox"
    bind:change="onChange"
  >
    复选框
  </van-checkbox>
</demo-block>

<demo-block title="复选框组">
  <van-checkbox-group value="{{ result }}" data-key="result" bind:change="onChange">
    <van-checkbox
      wx:for="{{ list }}"
      wx:key="*this"
      name="{{ item }}"
      custom-class="demo-checkbox"
    >
      复选框 {{ item }}
    </van-checkbox>
  </van-checkbox-group>
</demo-block>

<demo-block title="水平排列">
  <van-checkbox-group direction="horizontal" value="{{ result4 }}" data-key="result4" bind:change="onChange">
    <van-checkbox
      wx:for="{{ list }}"
      wx:key="*this"
      name="{{ item }}"
      custom-class="demo-checkbox"
    >
      复选框 {{ item }}
    </van-checkbox>
  </van-checkbox-group>
</demo-block>

<demo-block title="限制最大可选数">
  <van-checkbox-group value="{{ result2 }}" data-key="result2" max="2" bind:change="onChange">
    <van-checkbox
      wx:for="{{ list }}"
      wx:key="*this"
      name="{{ item }}"
      custom-class="demo-checkbox"
    >
      复选框 {{ item }}
    </van-checkbox>
  </van-checkbox-group>
</demo-block>

<demo-block title="搭配单元格组件使用">
  <van-checkbox-group value="{{ result3 }}" data-key="result3" bind:change="onChange">
    <van-cell-group >
      <van-cell
        wx:for="{{ list }}"
        wx:key="*this"
        title="复选框 {{ item }}"
        value-class="value-class"
        clickable
        data-index="{{ index }}"
        bind:click="toggle"
      >
        <van-checkbox catch:tap="noop" class="checkboxes-{{ index }}" name="{{ item }}" />
      </van-cell>
    </van-cell-group>
  </van-checkbox-group>
</demo-block>

</template>
<script lang="ts" setup>
import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    checkbox1: true,
    checkbox2: true,
    checkbox3: true,
    checkboxLabel: true,
    checkboxSize: true,
    checkboxShape: true,
    list: ['a', 'b', 'c'],
    result: ['a', 'b'],
    result2: [],
    result3: [],
    result4: [],
    activeIcon: 'https://img.yzcdn.cn/vant/user-active.png',
    inactiveIcon: 'https://img.yzcdn.cn/vant/user-inactive.png',
  },

  methods: {
    onChange(event) {
      const { key } = event.currentTarget.dataset;
      this.setData({ [key]: event.detail });
    },

    toggle(event) {
      const { index } = event.currentTarget.dataset;
      const checkbox = this.selectComponent(`.checkboxes-${index}`);
      checkbox.toggle();
    },

    noop() {},
  },
});

</script>
<style>.demo-checkbox-group {
  margin: 10px 0 0 20px;
}

.demo-checkbox {
  margin: 10px 0 0 20px;
}

.value-class {
  flex: none !important;
}

.icon {
  width: 20px;
}
</style>
