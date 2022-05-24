//
export function stealBestWealth(arr: number[]): number {
  let n = arr.length
  if (n === 1) return arr[0]
  let temp = 0
  for (let i = 0; i < n - 2; i++) {
    //console.log(i, arr[i], arr, arr.slice(i + 2))
    temp = Math.max(temp, arr[i] + stealBestWealth(arr.slice(i + 2)))
  }
  return temp
}

console.log(stealBestWealth([2, 3, 4, 1, 5]))
