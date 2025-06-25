import { ref } from "vue";
import type { ExtractPropTypes } from "vue";

// 通用 button props，推荐导出类型和对象，便于 defineProps/类型推断
export const commonButtonProps = {
  id: String,
  buttonId: String,
  lang: String,
  businessId: Number,
  sessionFrom: String,
  sendMessageTitle: String,
  sendMessagePath: String,
  sendMessageImg: String,
  showMessageCard: Boolean,
  appParameter: String,
  ariaLabel: String,
  openType: String,
  getUserProfileDesc: String,
  hoverClass: String,
};

export type CommonButtonProps = ExtractPropTypes<typeof commonButtonProps>;

// 事件类型声明，便于类型安全
export type CommonButtonEmits = {
  (e: "getuserinfo", detail: any): void;
  (e: "contact", detail: any): void;
  (e: "getphonenumber", detail: any): void;
  (e: "getrealtimephonenumber", detail: any): void;
  (e: "error", detail: any): void;
  (e: "launchapp", detail: any): void;
  (e: "opensetting", detail: any): void;
  (e: "agreeprivacyauthorization", detail: any): void;
  (e: "chooseavatar", detail: any): void;
};

// useButton 组合式函数参数类型
export function useButton(emit: CommonButtonEmits) {
  const canIUseGetUserProfileRef = ref(true);

  function onGetUserInfo(event: any) {
    emit("getuserinfo", event.detail);
  }
  function onContact(event: any) {
    emit("contact", event.detail);
  }
  function onGetPhoneNumber(event: any) {
    emit("getphonenumber", event.detail);
  }
  function onGetRealTimePhoneNumber(event: any) {
    emit("getrealtimephonenumber", event.detail);
  }
  function onError(event: any) {
    emit("error", event.detail);
  }
  function onLaunchApp(event: any) {
    emit("launchapp", event.detail);
  }
  function onOpenSetting(event: any) {
    emit("opensetting", event.detail);
  }
  function onAgreePrivacyAuthorization(event: any) {
    emit("agreeprivacyauthorization", event.detail);
  }
  function onChooseAvatar(event: any) {
    emit("chooseavatar", event.detail);
  }

  return {
    canIUseGetUserProfile: canIUseGetUserProfileRef,
    onGetUserInfo,
    onContact,
    onGetPhoneNumber,
    onGetRealTimePhoneNumber,
    onError,
    onLaunchApp,
    onOpenSetting,
    onAgreePrivacyAuthorization,
    onChooseAvatar,
  };
}
