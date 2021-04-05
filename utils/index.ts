export function toBool(value: any) {
  if (!value) {
    return false;
  }

  value = value.toString();
  value = value.trim();
  value = value.toLowerCase();

  const TRUTHY_VALUES = 'y yes true'.split(/\s/);

  if (!value.length) {
    return false;
  }
  if (!isNaN(Number(value))) {
    return value > 0;
  }
  return TRUTHY_VALUES.indexOf(value) >= 0;
}