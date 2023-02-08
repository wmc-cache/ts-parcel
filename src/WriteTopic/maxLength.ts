
export function maxLength(str: string) {
    const length = str.length

    const result = [0]

    for (let i = 0; i < length - 1; i++) {

        if (str[i] == str[i + 1]) {

            result.push(i)
        }
    }
    result.push(length - 1)

    const interval = []

    for (let i = 0; i < result.length - 1; i++) {
        interval.push(result[i + 1] - result[i])
    }

    console.log(result, interval, Math.max(...interval))
}

maxLength('nndassa')