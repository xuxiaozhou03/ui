
    <template>
    <demo-block title="基础用法">
  <van-cell title="展示弹出层" is-link bind:click="showBasic" />
  <van-popup
    show="{{ show.basic }}"
    custom-style="padding: 30px 50px"
    bind:close="hideBasic"
  >
    内容
  </van-popup>
</demo-block>

<demo-block title="弹出位置">
  <van-cell title="顶部弹出" is-link bind:click="showTop" />
  <van-cell title="底部弹出" is-link bind:click="showBottom" />
  <van-cell title="左侧弹出" is-link bind:click="showLeft" />
  <van-cell title="右侧弹出" is-link bind:click="showRight" />

  <van-popup
    show="{{ show.top }}"
    position="top"
    custom-style="height: 20%"
    bind:close="hideTop"
  />
  <van-popup
    show="{{ show.bottom }}"
    position="bottom"
    custom-style="height: 20%"
    bind:close="hideBottom"
  />
  <van-popup
    show="{{ show.left }}"
    position="left"
    custom-style="width: 20%; height: 100%"
    bind:close="hideLeft"
  />
  <van-popup
    show="{{ show.right }}"
    position="right"
    custom-style="width: 20%; height: 100%"
    bind:close="hideRight"
  />
</demo-block>

<demo-block title="关闭图标">
  <van-cell title="关闭图标" is-link bind:click="showCloseIcon" />
  <van-cell title="自定义图标" is-link bind:click="showCustomCloseIcon" />
  <van-cell title="图标位置" is-link bind:click="showCustomIconPosition" />

  <van-popup
    show="{{ show.closeIcon }}"
    closeable
    position="bottom"
    custom-style="height: 20%"
    bind:close="hideCloseIcon"
  />

  <van-popup
    show="{{ show.customCloseIcon }}"
    closeable
    close-icon="close"
    position="bottom"
    custom-style="height: 20%"
    bind:close="hideCustomCloseIcon"
  />

  <van-popup
    show="{{ show.customIconPosition }}"
    closeable
    close-icon-position="top-left"
    position="bottom"
    custom-style="height: 20%"
    bind:close="hideCustomIconPosition"
  />
</demo-block>

<demo-block title="圆角弹窗">
  <van-cell title="圆角弹窗" is-link bind:click="showRound" />

  <van-popup
    show="{{ show.round }}"
    round
    position="bottom"
    custom-style="height: 20%"
    bind:close="hideRound"
  />
</demo-block>

    </template>
    <script lang="ts" setup>
    import { cn, bem, commonProps } from "../../utils";
    import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    show: {
      basic: false,
      top: false,
      bottom: false,
      left: false,
      right: false,
      round: false,
      closeIcon: false,
      customCloseIcon: false,
      customIconPosition: false,
    },
  },

  methods: {
    toggle(type, show) {
      this.setData({
        [`show.${type}`]: show,
      });
    },

    showBasic() {
      this.toggle('basic', true);
    },

    hideBasic() {
      this.toggle('basic', false);
    },

    showTop() {
      this.toggle('top', true);
    },

    hideTop() {
      this.toggle('top', false);
    },

    showLeft() {
      this.toggle('left', true);
    },

    hideLeft() {
      this.toggle('left', false);
    },

    showRight() {
      this.toggle('right', true);
    },

    hideRight() {
      this.toggle('right', false);
    },

    showBottom() {
      this.toggle('bottom', true);
    },

    hideBottom() {
      this.toggle('bottom', false);
    },

    showRound() {
      this.toggle('round', true);
    },

    hideRound() {
      this.toggle('round', false);
    },

    showCloseIcon() {
      this.toggle('closeIcon', true);
    },

    hideCloseIcon() {
      this.toggle('closeIcon', false);
    },

    showCustomCloseIcon() {
      this.toggle('customCloseIcon', true);
    },

    hideCustomCloseIcon() {
      this.toggle('customCloseIcon', false);
    },

    showCustomIconPosition() {
      this.toggle('customIconPosition', true);
    },

    hideCustomIconPosition() {
      this.toggle('customIconPosition', false);
    },
  },
});

    </script>
    <style>
    
    </style>
  