import type { ExtractPropTypes, CSSProperties } from "vue";

export const commonProps = {
  customStyle: {
    type: Object as () => CSSProperties,
  },
  customClass: String,
};

export const presetProps = {
  url: String,
  linkType: {
    type: String as () =>
      | "navigateTo"
      | "redirectTo"
      | "switchTab"
      | "reLaunch",
    value: "navigateTo",
  },
};
type PresetProps = ExtractPropTypes<typeof presetProps>;

export const jumpLink = (
  url: string,
  linkType: PresetProps["linkType"] = "navigateTo"
) => {
  if (url) {
    if (linkType === "navigateTo" && getCurrentPages().length > 9) {
      uni.redirectTo({ url });
    } else {
      uni[linkType as "navigateTo"]({ url });
    }
  }
};
