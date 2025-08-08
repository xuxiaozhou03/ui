export * from "./bem";
export * from "./cn";

/**
 * 添加单位
 */
export function addUnit(
  value: string | number | null | undefined
): string | undefined {
  if (value == null) return undefined;

  if (typeof value === "number") {
    return `${value}px`;
  }

  if (typeof value === "string") {
    if (/^\d+$/.test(value)) {
      return `${value}px`;
    }
    return value;
  }

  return undefined;
}
