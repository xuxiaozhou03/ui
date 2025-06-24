import { reactive, watch, nextTick } from "vue";
import type { PropType, ExtractPropTypes } from "vue";

export const commonTransitionProps = {
  show: Boolean,
  duration: [Number, Object] as PropType<
    number | { enter: number; leave: number }
  >,
  name: { type: String, default: "fade" },
};

export type CommonTransitionProps = ExtractPropTypes<
  typeof commonTransitionProps
>;

const getClassNames = (name: string) => ({
  enter: `van-${name}-enter van-${name}-enter-active enter-class enter-active-class`,
  "enter-to": `van-${name}-enter-to van-${name}-enter-active enter-to-class enter-active-class`,
  leave: `van-${name}-leave van-${name}-leave-active leave-class leave-active-class`,
  "leave-to": `van-${name}-leave-to van-${name}-leave-active leave-to-class leave-active-class`,
});

// 事件类型声明，便于类型安全
export type TransitionEmits = {
  (e: "before-enter"): void;
  (e: "enter"): void;
  (e: "after-enter"): void;
  (e: "before-leave"): void;
  (e: "leave"): void;
  (e: "after-leave"): void;
};

export function useTransition(
  options: CommonTransitionProps,
  emit: TransitionEmits
) {
  const state = reactive({
    inited: false,
    display: false,
    classes: "",
    currentDuration: 300,
    status: "",
    transitionEnded: false,
  });

  let enterFinishedPromise: Promise<void> | null = null;

  function enter() {
    if (enterFinishedPromise) return;
    enterFinishedPromise = new Promise((resolve) => {
      const duration = options.duration ?? 300;
      const name = options.name ?? "fade";
      const classNames = getClassNames(name);
      const currentDuration =
        typeof duration === "object" ? duration.enter : duration;
      if (state.status === "enter") return;
      state.status = "enter";
      emit("before-enter");
      requestAnimationFrame(() => {
        if (state.status !== "enter") return;
        emit("enter");
        state.inited = true;
        state.display = true;
        state.classes = classNames.enter;
        state.currentDuration = currentDuration;
        requestAnimationFrame(() => {
          if (state.status !== "enter") return;
          state.transitionEnded = false;
          state.classes = classNames["enter-to"];
          resolve();
        });
      });
    });
  }

  function leave() {
    if (!enterFinishedPromise) return;
    enterFinishedPromise.then(() => {
      if (!state.display) return;
      const duration = options.duration ?? 300;
      const name = options.name ?? "fade";
      const classNames = getClassNames(name);
      const currentDuration =
        typeof duration === "object" ? duration.leave : duration;
      state.status = "leave";
      emit("before-leave");
      requestAnimationFrame(() => {
        if (state.status !== "leave") return;
        emit("leave");
        state.classes = classNames.leave;
        state.currentDuration = currentDuration;
        requestAnimationFrame(() => {
          if (state.status !== "leave") return;
          state.transitionEnded = false;
          setTimeout(() => {
            onTransitionEnd();
            enterFinishedPromise = null;
          }, currentDuration);
          state.classes = classNames["leave-to"];
        });
      });
    });
  }

  function onTransitionEnd() {
    if (state.transitionEnded) return;
    state.transitionEnded = true;
    if (state.status === "enter") emit("after-enter");
    if (state.status === "leave") emit("after-leave");
    if (!options.show && state.display) {
      state.display = false;
    }
  }

  // 监听 show 变化
  watch(
    () => options.show,
    (value, old) => {
      if (value === old) return;
      value ? enter() : leave();
    },
    { immediate: true }
  );

  // 初始化时如果 show=true 立即进入
  if (options.show) {
    nextTick(() => enter());
  }

  return {
    ...state,
    enter,
    leave,
    onTransitionEnd,
  };
}

// 兼容 Node/Vue SSR 环境的 requestAnimationFrame 实现
export function requestAnimationFrame(cb: () => void) {
  if (typeof window !== "undefined" && window.requestAnimationFrame) {
    return window.requestAnimationFrame(cb);
  }
  return setTimeout(cb, 16);
}
