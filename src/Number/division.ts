import { floatMul } from './multiply'
/**
 * 解决两个数相除精度丢失问题
 * @param a
 * @param b
 * @returns
 */
export function floatDiv(a: number | string, b: number | string) {
  let c,
    d,
    e = 0,
    f = 0
  try {
    e = a.toString().split('.')[1].length
  } catch (g) {}
  try {
    f = b.toString().split('.')[1].length
  } catch (g) {}
  return (
    (c = Number(a.toString().replace('.', ''))),
    (d = Number(b.toString().replace('.', ''))),
    floatMul(c / d, Math.pow(10, f - e))
  )
}
