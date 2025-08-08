import type { ExtractPropTypes, PropType, CSSProperties } from "vue";

export const buttonProps = {
  id: String,
  buttonId: String,
  dataset: Object as PropType<any>,
  formType: String,
  icon: String,
  classPrefix: {
    type: String,
    default: "van-icon",
  },
  customClass: {
    type: String,
    default: "",
  },
  hoverClass: {
    type: String,
    default: "",
  },
  loadingClass: {
    type: String,
    default: "",
  },
  iconClass: {
    type: String,
    default: "",
  },
  plain: Boolean,
  block: Boolean,
  round: Boolean,
  square: Boolean,
  loading: Boolean,
  hairline: Boolean,
  disabled: Boolean,
  loadingText: String,
  customStyle: Object as PropType<CSSProperties>,
  loadingType: {
    type: String as PropType<"circular" | "spinner">,
    default: "circular",
  },
  type: {
    type: String as PropType<
      "default" | "primary" | "info" | "danger" | "warning"
    >,
    default: "default",
  },
  size: {
    type: String as PropType<"normal" | "large" | "small" | "mini">,
    default: "normal",
  },
  loadingSize: {
    type: String,
    default: "20px",
  },
  color: String,
  lang: String,
  openType: String,
  businessId: String,
  sessionFrom: String,
  sendMessageTitle: String,
  sendMessagePath: String,
  sendMessageImg: String,
  showMessageCard: Boolean,
  appParameter: String,
  ariaLabel: String,
  canIUseGetUserProfile: Boolean,
  getUserProfileDesc: String,
} as const;

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
