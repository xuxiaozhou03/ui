export interface NotifyOptions {
  type?: "primary" | "success" | "danger" | "warning";
  color?: string;
  zIndex?: number;
  top?: number;
  message: string;
  context?: any;
  duration?: number;
  selector?: string;
  background?: string;
  safeAreaInsetTop?: boolean;
  onClick?: () => void;
  onOpened?: () => void;
  onClose?: () => void;
}

export const defaultOptions: NotifyOptions = {
  selector: "van-notify",
  type: "danger",
  message: "",
  background: "",
  duration: 3000,
  zIndex: 110,
  top: 0,
  color: "#fff",
  safeAreaInsetTop: true,
  onClick: () => {},
  onOpened: () => {},
  onClose: () => {},
};

let currentOptions: NotifyOptions = { ...defaultOptions };

function parseOptions(
  message?: NotifyOptions | string
): Partial<NotifyOptions> {
  if (message == null) {
    return {};
  }

  return typeof message === "string" ? { message } : message;
}

interface NotifyInstance {
  openNotify: (data: NotifyOptions) => void;
  closeNotify: () => void;
}
const instanceCache: Record<string, NotifyInstance> = {};

export const registerNotify = (selector: string, instance: NotifyInstance) => {
  if (!selector) {
    console.warn("请传入 van-notify 组件的 selector");
    return;
  }
  instanceCache[selector] = instance;
};

export const unregisterNotify = (selector: string) => {
  if (!selector) {
    console.warn("请传入 van-notify 组件的 selector");
    return;
  }
  delete instanceCache[selector];
};

const getSelector = (selector?: string) => {
  return instanceCache[selector || defaultOptions.selector!];
};

export default function Notify(options: NotifyOptions | string) {
  options = { ...currentOptions, ...parseOptions(options) };
  const notify = getSelector(options.selector);
  if (notify) {
    notify.openNotify(options);
    return notify;
  }

  console.warn("未找到 van-notify 节点，请确认 selector 及 context 是否正确");
}

Notify.clear = function (options?: NotifyOptions) {
  options = { ...defaultOptions, ...parseOptions(options) };

  const notify = getSelector(options.selector);

  if (notify) {
    notify.closeNotify();
  }
};

Notify.setDefaultOptions = (options: NotifyOptions) => {
  Object.assign(currentOptions, options);
};

Notify.resetDefaultOptions = () => {
  currentOptions = { ...defaultOptions };
};
