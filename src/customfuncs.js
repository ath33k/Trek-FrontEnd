var userAgent = navigator.userAgent.toLowerCase();

export function isMobile() {
  if (
    userAgent.match(/(android|webos|iphone|ipad|ipod|blackberry|windows phone)/)
  ) {
    return true;
  } else {
    return false;
  }
}
