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

export function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}