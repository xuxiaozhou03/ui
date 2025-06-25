import { ref, watch, onMounted, type EmitFn } from "vue";
import { type TransitionProps } from "./props";

function requestAnimationFramePolyfill(callback: FrameRequestCallback) {
  return setTimeout(callback, 1000 / 60);
}
const getClassNames = (name: string) => ({
  enter: `van-${name}-enter van-${name}-enter-active enter-class enter-active-class`,
  "enter-to": `van-${name}-enter-to van-${name}-enter-active enter-to-class enter-active-class`,
  leave: `van-${name}-leave van-${name}-leave-active leave-class leave-active-class`,
  "leave-to": `van-${name}-leave-to van-${name}-leave-active leave-to-class leave-active-class`,
});

type TransitionParams = Pick<TransitionProps, "show" | "duration" | "name">;

export type TransitionEmit = {
  "before-enter": [];
  enter: [];
  "after-enter": [];
  "before-leave": [];
  leave: [];
  "after-leave": [];
};

export function useTransition(
  props: TransitionParams,
  emit: EmitFn<TransitionEmit>
) {
  const inited = ref(false);
  const display = ref(false);
  const classes = ref("");
  const currentDuration = ref(0);
  const status = ref<"enter" | "leave" | "">("");
  const transitionEnded = ref(false);

  // 当前实例的 emit

  const observeShow = (value: boolean, old: boolean) => {
    if (value === old) return;
    value ? enter() : leave();
  };

  const enter = () => {
    if (status.value === "enter") return;

    const classNames = getClassNames(props.name);
    currentDuration.value =
      typeof props.duration === "object"
        ? props.duration.enter
        : props.duration;

    status.value = "enter";
    emit("before-enter");

    requestAnimationFramePolyfill(() => {
      if (status.value !== "enter") return;

      emit("enter");
      inited.value = true;
      display.value = true;
      classes.value = classNames.enter;

      requestAnimationFramePolyfill(() => {
        if (status.value !== "enter") return;

        transitionEnded.value = false;
        classes.value = classNames["enter-to"];
      });
    });
  };

  const leave = () => {
    if (!display.value) return;

    const classNames = getClassNames(props.name);
    currentDuration.value =
      typeof props.duration === "object"
        ? props.duration.leave
        : props.duration;

    status.value = "leave";
    emit("before-leave");

    requestAnimationFramePolyfill(() => {
      if (status.value !== "leave") return;

      emit("leave");
      classes.value = classNames.leave;

      requestAnimationFramePolyfill(() => {
        if (status.value !== "leave") return;

        transitionEnded.value = false;
        setTimeout(() => {
          onTransitionEnd();
        }, currentDuration.value);

        classes.value = classNames["leave-to"];
      });
    });
  };

  const onTransitionEnd = () => {
    if (transitionEnded.value) return;

    transitionEnded.value = true;
    if (status.value === "enter") {
      emit("after-enter");
    } else if (status.value === "leave") {
      emit("after-leave");
    }

    if (!props.show && display.value) {
      display.value = false;
    }
  };

  watch(
    () => props.show,
    (newVal, oldVal) => {
      observeShow(newVal, oldVal);
    }
  );

  onMounted(() => {
    if (props.show) {
      observeShow(true, false);
    }
  });

  return {
    inited,
    display,
    classes,
    currentDuration,
    onTransitionEnd,
  };
}
