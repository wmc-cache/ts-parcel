/**
 * 解决两个数相加精度丢失问题
 * @param a
 * @param b
 * @returns {Number}
 */
function floatAdd(a: number | string, b: number | string) {
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
  return (floatMul(a, e) + floatMul(b, e)) / e
}
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
/**
 * 解决两个数相乘精度丢失问题
 * @param a
 * @param b
 * @returns {Number}
 */
function floatMul(a: number | string, b: number | string) {
  let c = 0,
    d = a.toString(),
    e = b.toString()
  try {
    c += d.split('.')[1].length
  } catch (f) {}
  try {
    c += e.split('.')[1].length
  } catch (f) {}
  return (
    (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / Math.pow(10, c)
  )
}
/**
 * 解决两个数相除精度丢失问题
 * @param a
 * @param b
 * @returns
 */
function floatDiv(a: number | string, b: number | string) {
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

console.log(0.1 + 0.2, floatAdd(0.1, 0.2))
