
    <template>
    <demo-block title="基础用法" padding>
  <van-cell title="Fade" bind:click="onClickFade" is-link />
  <van-cell title="Fade Up" bind:click="onClickFadeUp" is-link />
  <van-cell title="Fade Down" bind:click="onClickFadeDown" is-link />
  <van-cell title="Fade Left" bind:click="onClickFadeLeft" is-link />
  <van-cell title="Fade Right" bind:click="onClickFadeRight" is-link />
  <van-cell title="Slide Up" bind:click="onClickSlideUp" is-link />
  <van-cell title="Slide Down" bind:click="onClickSlideDown" is-link />
  <van-cell title="Slide Left" bind:click="onClickSlideLeft" is-link />
  <van-cell title="Slide Right" bind:click="onClickSlideRight" is-link />
  <van-cell title="Custom" bind:click="onClickCustom" is-link />

  <van-transition
    show="{{ show }}"
    name="{{ name }}"
    custom-class="block"
  />

  <van-transition
    show="{{ showCustom }}"
    name=""
    duration="{{ { enter: 300, leave: 1000 } }}"
    custom-class="block"
    enter-class="van-enter-class"
    enter-active-class="van-enter-active-class"
    leave-active-class="van-leave-active-class"
    leave-to-class="van-leave-to-class"
    bind:before-enter="onBeforeEnter"
    bind:enter="onEnter"
    bind:after-enter="onAfterEnter"
    bind:before-leave="onBeforeLeave"
    bind:leave="onLeave"
    bind:after-leave="onAfterLeave"
  />
</demo-block>

    </template>
    <script lang="ts" setup>
    import { cn, bem, commonProps, addUnit } from "../../utils";
    import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    show: false,
    name: 'fade',
    showCustom: false,
  },

  methods: {
    onClickFade() {
      this.trigger('fade');
    },

    onClickFadeUp() {
      this.trigger('fade-up');
    },

    onClickFadeDown() {
      this.trigger('fade-down');
    },

    onClickFadeLeft() {
      this.trigger('fade-left');
    },

    onClickFadeRight() {
      this.trigger('fade-right');
    },

    onClickSlideUp() {
      this.trigger('slide-up');
    },

    onClickSlideDown() {
      this.trigger('slide-down');
    },

    onClickSlideLeft() {
      this.trigger('slide-left');
    },

    onClickSlideRight() {
      this.trigger('slide-right');
    },

    trigger(name) {
      this.setData({ name, show: true });
      setTimeout(() => {
        this.setData({ show: false });
      }, 500);
    },

    onClickCustom() {
      this.setData({ showCustom: true });

      setTimeout(() => {
        this.setData({ showCustom: false });
      }, 1000);
    },

    onBeforeEnter() {
      console.log('before enter');
    },

    onEnter() {
      console.log('enter');
    },

    onAfterEnter() {
      console.log('after enter');
    },

    onBeforeLeave() {
      console.log('before leave');
    },

    onLeave() {
      console.log('leave');
    },

    onAfterLeave() {
      console.log('after leave');
    },
  },
});

    </script>
    <style>
    .block {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  margin: -50px 0 0 -50px;
  background-color: #1989fa;
}

.van-enter-active-class,
.van-leave-active-class {
  transition-property: background-color, transform;
}

.van-enter-class,
.van-leave-to-class {
  background-color: red;
  transform: rotate(-360deg) translate3d(-100%, -100%, 0);
}

    </style>
  