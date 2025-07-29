<template>
  <demo-block title="基础用法">
  <van-rate
    custom-class="rate-position"
    model:value="{{ value1 }}"
  />
</demo-block>

<demo-block title="自定义图标">
  <van-rate
    custom-class="rate-position"
    icon="like"
    void-icon="like-o"
    model:value="{{ value2 }}"
  />
</demo-block>

<demo-block title="自定义样式">
  <van-rate
    custom-class="rate-position"
    model:value="{{ value3 }}"
    size="{{ 25 }}"
    color="#ffd21e"
    void-icon="star"
    void-color="#eee"
  />
</demo-block>

<demo-block title="半星">
  <van-rate
    custom-class="rate-position"
    model:value="{{ value4 }}"
    allow-half
    void-icon="star"
    void-color="#eee"
  />
</demo-block>

<demo-block title="自定义数量">
  <van-rate
    custom-class="rate-position"
    model:value="{{ value5 }}"
    count="{{ 6 }}"
  />
</demo-block>

<demo-block title="禁用状态">
  <van-rate
    custom-class="rate-position"
    value="{{ value6 }}"
    disabled
  />
</demo-block>

<demo-block title="只读状态">
  <van-rate
    custom-class="rate-position"
    value="{{ value6 }}"
    readonly
  />
</demo-block>

<demo-block title="监听 change 事件">
  <van-rate
    custom-class="rate-position"
    value="{{ value8 }}"
    bind:change="onChange"
  />
</demo-block>

<van-toast id="van-toast" />

</template>
<script lang="ts" setup>
  import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';

VantComponent({
  data: {
    value1: 3,
    value2: 3,
    value3: 3,
    value4: 2.5,
    value5: 4,
    value6: 3,
    value8: 2,
  },

  methods: {
    onChange(event) {
      Toast({
        context: this,
        message: '当前值：' + event.detail,
      });
    },
  },
});

  // 转换为 Vue 3 的 computed 属性
  
</script>
<style lang="scss" scoped>
  .rate-position {
  margin-left: 15px;
}

</style>
