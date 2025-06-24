import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export { default as addUnit } from "./add-unit";
export { default as bem } from "./bem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export * from "./props";
