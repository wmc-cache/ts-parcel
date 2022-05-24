// [2, 3, 4, 5]
export function stealBestWealth(arr: number[]):number {
  let n = arr.length;
  if (n === 1) return arr[0]
  return  arr[0] + stealBestWealth(arr.slice(1))
}


console.log(stealBestWealth([2, 3, 4, 5]));