import type { LoadingProps } from "../van-loading/props";

export type ToastMessage = string | number;
export interface ToastOptions {
  show?: boolean;
  type?: string;
  mask?: boolean;
  zIndex?: number;
  position?: string;
  duration?: number;
  forbidClick?: boolean;
  loadingType?: LoadingProps["type"];
  message?: ToastMessage;
  onClose?: () => void;
  selector?: string;
}

export const defaultOptions: ToastOptions = {
  type: "text",
  mask: false,
  message: "",
  show: false,
  zIndex: 1000,
  duration: 2000,
  position: "middle",
  forbidClick: false,
  loadingType: "circular",
  selector: "#van-toast",
};

function parseOptions(message: ToastOptions | ToastMessage): ToastOptions {
  return typeof message === "object" ? message : { message };
}

interface ToastInstance {
  onShow: (data: ToastOptions) => void;
  onHide: () => void;
  setData: (data: Partial<ToastOptions>) => void;
}
const instanceCache: Record<string, ToastInstance> = {};

export const registerToast = (selector: string, instance: ToastInstance) => {
  instanceCache[selector] = instance;
};

export const unregisterToast = (selector: string) => {
  if (!selector) {
    console.warn("请传入 van-toast 组件的 selector");
    return;
  }
  delete instanceCache[selector];
};

const getInstance = (options?: ToastOptions) => {
  const toastOptions = {
    ...defaultOptions,
    ...(options ? parseOptions(options) : {}),
    show: true,
  };
  const instance = instanceCache[toastOptions.selector!];
  return instance;
};
function Toast(options: ToastOptions | ToastMessage) {
  clear();
  const toastOptions = {
    ...defaultOptions,
    ...(options ? parseOptions(options) : {}),
    show: true,
  };
  const instance = getInstance(toastOptions);
  if (!instance) {
    console.warn("未找到 van-toast 节点，请确认 selector 是否正确");
    return;
  }

  instance.onShow(toastOptions);

  return instance;
}

function clear(options?: ToastOptions) {
  const toastOptions = {
    ...defaultOptions,
    ...(options ? parseOptions(options) : {}),
    show: false,
  };
  const instance = getInstance(toastOptions);
  instance?.onHide();
}

Toast.loading = (options: ToastOptions | ToastMessage) =>
  Toast({ type: "loading", ...parseOptions(options) });
Toast.success = (options: ToastOptions | ToastMessage) =>
  Toast({ type: "success", ...parseOptions(options) });
Toast.fail = (options: ToastOptions | ToastMessage) =>
  Toast({ type: "fail", ...parseOptions(options) });

Toast.clear = clear;

Toast.setDefaultOptions = (options: ToastOptions) => {
  Object.assign(defaultOptions, options);
};
Toast.resetDefaultOptions = () => {
  Object.assign(defaultOptions, {
    type: "text",
    mask: false,
    message: "",
    show: false,
    zIndex: 1000,
    duration: 2000,
    position: "middle",
    forbidClick: false,
    loadingType: "circular",
  });
};

export default Toast;
