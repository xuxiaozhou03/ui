const REGEXP = /^(-?\d+(\.\d+)?)$/;

function addUnit(
  value: string | number | undefined | null
): string | number | undefined {
  if (value === null || value === "" || value === undefined) {
    return undefined;
  }
  return REGEXP.test(String(value)) ? value + "px" : value;
}

export default addUnit;
