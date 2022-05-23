export function insertSort(arr: number[]) {
  const length = arr.length
  if (length === 1) return arr
  for (let i = 0; i < length; i++) {
    const temp = arr[i]
    for (let j = i + 1; j < length; j++) {
         if(arr[j] < temp) {
           arr[j - 1] = arr[j]
           arr[j] = temp
         }
    }
  }
  return arr
}

console.log(insertSort([1, 9, 2, 8, 3, 4, 5]))
