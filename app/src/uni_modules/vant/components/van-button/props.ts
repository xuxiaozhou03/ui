import type { ExtractPropTypes } from "vue";
import { commonProps } from "../../utils";
import { iconProps } from "../van-icon/props";
import { loadingProps } from "../van-loading/props";

export const commonButtonProps = {
  id: { type: String },
  buttonId: { type: String },
  lang: { type: String },
  openType: { type: String },
  businessId: { type: String },
  sessionFrom: { type: String },
  sendMessageTitle: { type: String },
  sendMessagePath: { type: String },
  sendMessageImg: { type: String },
  showMessageCard: { type: String },
  appParameter: { type: String },
  ariaLabel: { type: String },
  getUserProfileDesc: { type: String },
};

// Vue 3 emits & handler helpers for button events
export const commonButtonEmits = [
  "getuserinfo",
  "contact",
  "getphonenumber",
  "getrealtimephonenumber",
  "error",
  "launchapp",
  "opensetting",
  "agreeprivacyauthorization",
  "chooseavatar",
  "click",
];

export function useCommonButtonEvents(
  emit: (event: string, ...args: any[]) => void
) {
  return {
    onGetUserInfo(event: any) {
      emit("getuserinfo", event?.detail);
    },
    onContact(event: any) {
      emit("contact", event?.detail);
    },
    onGetPhoneNumber(event: any) {
      emit("getphonenumber", event?.detail);
    },
    onGetRealTimePhoneNumber(event: any) {
      emit("getrealtimephonenumber", event?.detail);
    },
    onError(event: any) {
      emit("error", event?.detail);
    },
    onLaunchApp(event: any) {
      emit("launchapp", event?.detail);
    },
    onOpenSetting(event: any) {
      emit("opensetting", event?.detail);
    },
    onAgreePrivacyAuthorization(event: any) {
      emit("agreeprivacyauthorization", event?.detail);
    },
    onChooseAvatar(event: any) {
      emit("chooseavatar", event?.detail);
    },
  };
}

export const buttonProps = {
  ...commonProps,
  hoverClass: commonProps.customClass,
  // loading 相关
  loadingClass: commonProps.customClass,
  loadingText: { type: String },
  loadingSize: loadingProps.size,
  loadingType: loadingProps.type,
  // icon 相关
  classPrefix: iconProps.classPrefix,
  icon: iconProps.name,
  // button 相关
  formType: { type: String },
  plain: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  round: { type: Boolean, default: false },
  square: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  hairline: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  type: {
    type: String as () => "default" | "primary" | "info" | "danger" | "warning",
    default: "default",
  },
  dataset: { type: Object },
  size: {
    type: String as () => "normal" | "large" | "small" | "mini",
    default: "normal",
  },
  color: { type: String },
  ...commonButtonProps,
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
