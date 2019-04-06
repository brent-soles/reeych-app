const _MinutesFromNow = (numOfMinutes) => {
  return Math.floor(Date.now() / 1000) + 60 * numOfMinutes;
}

export const authentication = {
  authenticated: false,
  ttl: _MinutesFromNow(30),
  renewOnTimeout: true
}