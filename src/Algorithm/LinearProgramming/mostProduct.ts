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

// 动态规划
export function getMmostProduct2(n: number): number {
  let MostProductArray = new Array(n + 1).fill(1)
  let temp
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      console.log(i,j)
      temp = Math.max(j * (i - j), j * MostProductArray[i - j])
      if (temp > MostProductArray[i]) {
        MostProductArray[i] = temp
      }
    }
  }
  console.log(MostProductArray)
  return MostProductArray[n]
}
console.log(getMmostProduct2(10))
