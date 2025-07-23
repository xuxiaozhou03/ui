import type { CSSProperties, ExtractPropTypes, PropType } from "vue";

export const commonProps = {
  customStyle: {
    type: Object as PropType<CSSProperties>,
  },
  customClass: String,
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
export type LinkType = ExtractPropTypes<typeof linkProps>["linkType"];

export const commonTransitionProps = {
  customStyle: String,
  show: {
    type: Boolean,
    default: false,
  },
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
  hoverClass: commonProps.customClass,
};
