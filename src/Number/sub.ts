import { floatMul } from './multiply'
/**
 * 解决两个数相减精度丢失问题
 * @param a
 * @param b
 * @returns {Number}
 */
function floatSub(a: number | string, b: number | string) {
  let c, d, e
  if (undefined == a || null == a || '' == a || isNaN(a as number)) {
    a = 0
  }
  if (undefined == b || null == b || '' == b || isNaN(b as number)) {
    b = 0
  }
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  e = Math.pow(10, Math.max(c, d))
  return (floatMul(a, e) - floatMul(b, e)) / e
}
