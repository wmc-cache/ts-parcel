//1.n<=10  插入排序
//2.n>10  三路快速排序
const data = [
  { count: 120, date: '2022-05-21' },
  { count: 3, date: '2022-05-23' },
  { count: 2, date: '2022-05-23' },
  { count: 1, date: '2022-05-23' },
  { count: 1, date: '2022-05-28' },
  { count: 3, date: '2022-05-22' },
  { count: 2, date: '2022-05-22' },
  { count: 1, date: '2022-05-22' },
  { count: 1, date: '2022-05-21' },
  { count: 7, date: '2022-05-28' },
  { count: 5, date: '2022-05-21' },
  { count: 100, date: '2022-05-21' },
]

function sort(data: any[], type = 'asc') {
  let result: any[] = []
  //
  if (type === 'desc') {
    data.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  }
  if (type === 'asc') {
    data.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
  }
  //
  data.forEach((ele) => {
    if (result.length === 0) {
      result.push([ele])
    } else {
      let flag = false
      result.forEach((item, index) => {
        if (item[0].date === ele.date) {
          flag = true
          item.push(ele)
        }
        if (index === result.length - 1 && !flag) {
          result.push([ele])
        }
      })
    }
  })
  //
  result.forEach((ele: any) => {
    ele.sort((a: any, b: any) => {
      return b.count - a.count
    })
  })
  //
  result = result.reduce((p, c) => {
    return [...p, ...c]
  }, [])
  return result
}

console.log('result', sort(data))
export {}
