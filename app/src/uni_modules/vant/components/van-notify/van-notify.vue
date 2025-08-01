<template>
  <van-transition
    name="slide-down"
    :show="show"
    custom-class="van-notify__container"
    :custom-style="{
      zIndex: data.zIndex,
      top: addUnit(data.top),
    }"
    @click="onTap"
  >
    <div
      :class="['van-notify', `van-notify--${data.type}`]"
      :style="{
        background: data.background,
        color: data.color,
      }"
    >
      <div
        v-if="data.safeAreaInsetTop"
        :style="{ height: statusBarHeight + 'px' }"
      />
      <span>{{ data.message }}</span>
    </div>
  </van-transition>
</template>
<script lang="ts" setup>
import { ref, defineProps, reactive, onMounted, onUnmounted } from "vue";
import { addUnit } from "../../utils";
import {
  defaultOptions,
  type NotifyOptions,
  registerNotify,
  unregisterNotify,
} from "./notify";

const props = defineProps({
  selector: {
    type: String,
    default: defaultOptions.selector!,
  },
});

// 把props 变成 state
const data = reactive<NotifyOptions>({ ...defaultOptions });

const show = ref(false);
// todo
const statusBarHeight = ref(50);
let timer: any = null;

const openNotify = (option: NotifyOptions) => {
  clearTimeout(timer);
  show.value = true;
  Object.assign(data, option);
  console.log(data);
  if (data.duration && data.duration > 0 && data.duration !== Infinity) {
    timer = setTimeout(() => {
      closeNotify();
    }, data.duration);
  }
};
const closeNotify = () => {
  clearTimeout(timer);
  show.value = false;
};

onMounted(() => {
  statusBarHeight.value = uni.getSystemInfoSync().windowTop;
  registerNotify(props.selector, {
    openNotify,
    closeNotify,
  });
});
onUnmounted(() => {
  // 清理注册
  unregisterNotify(props.selector);
});

const emit = defineEmits(["click"]);
function onTap(e: Event) {
  // 可扩展点击事件
  emit("click", e);
}
</script>
<style>
.van-notify {
  word-wrap: break-word;
  font-size: var(--notify-font-size, 14px);
  line-height: var(--notify-line-height, 20px);
  padding: var(--notify-padding, 6px 15px);
  text-align: center;
}
.van-notify__container {
  box-sizing: border-box;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
}
.van-notify--primary {
  background-color: var(--notify-primary-background-color, #1989fa);
}
.van-notify--success {
  background-color: var(--notify-success-background-color, #07c160);
}
.van-notify--danger {
  background-color: var(--notify-danger-background-color, #ee0a24);
}
.van-notify--warning {
  background-color: var(--notify-warning-background-color, #ff976a);
}
</style>
