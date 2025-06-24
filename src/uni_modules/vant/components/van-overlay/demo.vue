
    <template>
    <demo-block title="基础用法" padding>
  <van-button type="primary" bind:click="onClickShow">
    显示遮罩层
  </van-button>
  <van-overlay show="{{ show }}" bind:click="onClickHide" />
</demo-block>

<demo-block title="嵌入内容" padding>
  <van-button type="primary" bind:click="onClickShowEmbedded">
    嵌入内容
  </van-button>
  <van-overlay show="{{ showEmbedded }}" bind:click="onClickHideEmbedded">
    <view class="wrapper">
      <div class="block" catch:tap="noop" />
    </view>
  </van-overlay>
</demo-block>

    </template>
    <script lang="ts" setup>
    import { cn, bem, commonProps } from "../../utils";
    import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    show: false,
    showEmbedded: false,
  },

  methods: {
    onClickShow() {
      this.setData({ show: true });
    },

    onClickHide() {
      this.setData({ show: false });
    },

    onClickShowEmbedded() {
      this.setData({ showEmbedded: true });
    },

    onClickHideEmbedded() {
      this.setData({ showEmbedded: false });
    },

    noop() {},
  },
});

    </script>
    <style>
    .wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}

    </style>
  