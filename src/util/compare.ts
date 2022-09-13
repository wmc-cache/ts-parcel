function compare(str1:string, str2:string) {
    if (str1 === str2) {
        return true
    }
    let arr1 = [...str1]
    let arr2 = [...str2]
    if (arr2.length > arr1.length) {
        return false
    }
    for (let i = 0; i < arr1.length; i++) {
        if (i > (arr1.length - arr2.length - 1)) {
            break
        }
        if (arr1[i] === arr2[0]) {
            let m = i
            let flag = true
            for (let k = 0; k < arr2.length; k++) {
                if (arr2[k] === arr1[m]) {
                    m++
                } else {
                    flag = false
                }
            }
            if (flag) {
                return true
            }
        }
    }
    return false
}

let str1 = 'aabc'
let str2 = 'aabb'

console.log(compare(str1, str2))
