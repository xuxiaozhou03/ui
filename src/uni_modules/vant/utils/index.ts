import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type PresetProps } from "./props";

export { default as addUnit } from "./add-unit";
export { default as bem } from "./bem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export * from "./props";

export const jumpLink = (url: string, linkType: PresetProps["linkType"]) => {
  if (!url) {
    return;
  }
  if (linkType === "navigateTo" && getCurrentPages().length > 9) {
    uni.redirectTo({ url });
    return;
  }

  uni[linkType as "navigateTo"]({ url });
};
