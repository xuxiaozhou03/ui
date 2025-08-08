import type { PropType, CSSProperties } from "vue";

export const commonProps = {
  customClass: String,
  customStyle: Object as PropType<CSSProperties>,
};

export const commonTransitionProps = {
  customStyle: commonProps.customStyle,
  show: Boolean,
  duration: {
    type: [Number, Object] as PropType<
      number | { enter: number; leave: number }
    >,
    default: 300,
  },
  name: {
    type: String,
    default: "fade",
  },
};

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

export const linkProps = {
  url: String,
  linkType: {
    type: String as PropType<
      "navigateTo" | "redirectTo" | "reLaunch" | "switchTab"
    >,
    default: "navigateTo",
  },
};
