// 1.大整数相加

export function add(a: String, b: String) {
    let num1 = a

    let num2 = b

    const maxLength = Math.max(num1.length, num2.length)

    num1 = num1.padStart(maxLength, '0')

    num2 = num2.padStart(maxLength, '0')

    let tem = 0

    const arr = []

    for (let i = maxLength - 1; i >= 0; i--) {

        arr.unshift((Number(num1[i]) + Number(num2[i])) % 10 + tem)

        tem = (Number(num1[i]) + Number(num2[i])) >= 10 ? 1 : 0

    }

    console.log(arr.join(''))
}

add('11111111111111111115', '11119')
console.log(11111111111111111115 + 11119)
