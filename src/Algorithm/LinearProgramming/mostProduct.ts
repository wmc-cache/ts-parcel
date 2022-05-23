//记忆化搜索
const MostProductArray: Array<number> = []

export function getMmostProduct(n: number): number {
  let result = 1
  if (n === 1) return result
  for (let i = 1; i < n; i++) {
    if (MostProductArray[n - i]) {
      result = Math.max(result, i * (n - i), i * MostProductArray[n - i])
    } else {
      result = Math.max(result, i * (n - i), i * getMmostProduct(n - i))
      MostProductArray[n] = result
    }
  }
  return result
}
console.log(getMmostProduct(10))
