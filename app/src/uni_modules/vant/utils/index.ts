export function addUnit(value?: string | number | null): string | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }
  const str = String(value);
  return /^-?\d+(\.\d+)?$/.test(str) ? `${str}px` : str;
}

export * from "./bem";
export * from "./props";
export * from "./cn";
