export function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr
  let mid = Math.floor(arr.length / 2)
  let left: number[] = []
  let right: number[] = []
  arr.forEach((ele, index) => {
    if (index !== mid) {
      if (ele <= arr[mid]) {
        left.push(ele)
      } else {
        right.push(ele)
      }
    }
  })
  return quickSort(left).concat(arr[mid], quickSort(right))
}

console.log(quickSort([3, 4, 1, 2, 7, 8, 9, 6, 5, 2, 3, 5435, 43242, 11, 2, 0]))
