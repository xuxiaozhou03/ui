import type { CSSProperties, ExtractPropTypes, PropType } from "vue";

export const commonProps = {
  customClass: String,
  customStyle: {
    type: Object as PropType<CSSProperties>,
  },
};

export const presetProps = {
  url: String,
  linkType: {
    type: String as PropType<
      "navigateTo" | "redirectTo" | "switchTab" | "reLaunch" | "navigateBack"
    >,
    value: "navigateTo",
  },
};

export type PresetProps = ExtractPropTypes<typeof presetProps>;
