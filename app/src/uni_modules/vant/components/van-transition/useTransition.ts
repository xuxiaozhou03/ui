import { ref, computed, watch } from "vue";

function getClassNames(name: string) {
  return {
    enter: `van-${name}-enter van-${name}-enter-active enter-class enter-active-class`,
    "enter-to": `van-${name}-enter-to van-${name}-enter-active enter-to-class enter-active-class`,
    leave: `van-${name}-leave van-${name}-leave-active leave-class leave-active-class`,
    "leave-to": `van-${name}-leave-to van-${name}-leave-active leave-to-class leave-active-class`,
  };
}
function requestAnimationFrame(cb: () => void) {
  return setTimeout(() => {
    cb();
  }, 1000 / 30);
}
function isObj(val: any): val is Record<string, any> {
  return val !== null && typeof val === "object";
}

export function useTransition(options: {
  show: boolean;
  duration?: number | { enter: number; leave: number };
  name?: string;
  onBeforeEnter?: () => void;
  onEnter?: () => void;
  onAfterEnter?: () => void;
  onBeforeLeave?: () => void;
  onLeave?: () => void;
  onAfterLeave?: () => void;
}) {
  const inited = ref(false);
  const display = ref(false);
  const classes = ref("");
  const currentDuration = ref(300);
  const status = ref<"enter" | "leave" | "">("");
  const transitionEnded = ref(true);
  let enterFinishedPromise: Promise<void> | null = null;

  const name = computed(() => options.name || "fade");
  const show = computed(() => options.show);
  const duration = computed(() => options.duration ?? 300);

  function doEnter() {
    if (enterFinishedPromise) return;
    enterFinishedPromise = new Promise((resolve) => {
      const classNames = getClassNames(name.value);
      const dur = isObj(duration.value) ? duration.value.enter : duration.value;
      if (status.value === "enter") return;
      status.value = "enter";
      options.onBeforeEnter && options.onBeforeEnter();
      requestAnimationFrame(() => {
        if (status.value !== "enter") return;
        options.onEnter && options.onEnter();
        inited.value = true;
        display.value = true;
        classes.value = classNames.enter;
        currentDuration.value = dur;
        requestAnimationFrame(() => {
          if (status.value !== "enter") return;
          transitionEnded.value = false;
          classes.value = classNames["enter-to"];
          resolve();
        });
      });
    });
  }

  function doLeave() {
    if (!enterFinishedPromise) return;
    enterFinishedPromise.then(() => {
      if (!display.value) return;
      const classNames = getClassNames(name.value);
      const dur = isObj(duration.value) ? duration.value.leave : duration.value;
      status.value = "leave";
      options.onBeforeLeave && options.onBeforeLeave();
      requestAnimationFrame(() => {
        if (status.value !== "leave") return;
        options.onLeave && options.onLeave();
        classes.value = classNames.leave;
        currentDuration.value = dur;
        requestAnimationFrame(() => {
          if (status.value !== "leave") return;
          transitionEnded.value = false;
          setTimeout(() => {
            onTransitionEnd();
            enterFinishedPromise = null;
          }, dur);
          classes.value = classNames["leave-to"];
        });
      });
    });
  }

  function onTransitionEnd() {
    if (transitionEnded.value) return;
    transitionEnded.value = true;
    if (status.value === "enter") {
      options.onAfterEnter && options.onAfterEnter();
    } else if (status.value === "leave") {
      options.onAfterLeave && options.onAfterLeave();
    }
    if (!show.value && display.value) {
      display.value = false;
    }
  }

  watch(
    show,
    (val, old) => {
      if (val === old) return;
      val ? doEnter() : doLeave();
    },
    { immediate: true }
  );

  return {
    inited,
    display,
    classes,
    currentDuration,
    onTransitionEnd,
  };
}
