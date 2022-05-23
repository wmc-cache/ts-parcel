const calculateArray: Array<number> = []
const calculateArray2: Array<number> = []

// 记忆化搜索
function calculate(n: number): number {
  if (n === 0) return 0
  if (n === 1) return 1
  if (!calculateArray[n])
    calculateArray[n] = calculate(n - 1) + calculate(n - 2)
  return calculateArray[n]
}
// 动态规划
function calculate2(n: number): number {
  calculateArray2[0] = 0
  calculateArray2[1] = 1
  for (let i = 2; i <= n; i++) {
    calculateArray2[i] = calculateArray2[i - 1] + calculateArray2[i - 2]
  }
  return calculateArray2[n]
}
console.time('calculate')
console.log(calculate2(45))
console.timeEnd('calculate')

console.time('calculate2')
console.log(calculate2(45))
console.timeEnd('calculate2')
