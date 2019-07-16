export default function buildMakeSource ({ isValidIp }) {
  return function makeSource ({ ip, browser } = {}) {
    if (!ip) {
      throw new Error('Source must contain an IP.')
    }
    if (!isValidIp(ip)) {
      throw new RangeError('Source must contain a valid IP.')
    }
    return Object.freeze({
      getIp: () => ip,
      getBrowser: () => browser
    })
  }
}
