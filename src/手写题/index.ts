
export function calc(n = '10000') {
    const length = n.length
    const result = []
    for (let i = 0; i <= Number(n); i++) {
        const array = String(i).split('')
        let middle = Math.floor(String(i).length / 2)
        let flag = true
        for (let j = 0; j <= middle - 1; j++) {
            flag = array[j] === array[array.length - j - 1]
        }
        if (flag) {
            result.push(i)
        }
    }
    console.log(result)
}

calc()