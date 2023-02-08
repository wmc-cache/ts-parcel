//@ts-ignore
Function.prototype.customcall = function (content: any, ...x: any[]) {

    if (content == null) content = globalThis

    if (typeof content != 'object') content = new Object(content)

    const funKey = Symbol()

    content[funKey] = this

    const res = content[funKey](...x)

    delete content[funKey]

    return res
}




export function log(this: any, ...arg: any[]) {
    console.log(this, arg)
}



log(1, 2)

//@ts-ignore
log.customcall({ a: [] }, 1, 2)