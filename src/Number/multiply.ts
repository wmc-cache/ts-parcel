/**
 * 解决两个数相乘精度丢失问题
 * @param a
 * @param b
 * @returns {Number}
 */
export function floatMul(a: number | string, b: number | string) {
  let c = 0,
    d = a.toString(),
    e = b.toString()
  try {
    c += d.split('.')[1].length
  } catch (error) {
    console.log(error)
  }
  try {
    c += e.split('.')[1].length
  } catch (error) {
    console.log(error)
  }
  return (
    (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / Math.pow(10, c)
  )
}

console.log(floatMul(0.1222, 0.2))
