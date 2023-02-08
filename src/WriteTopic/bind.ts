
//@ts-ignore
Function.prototype.custombind = function (content: any, ...x: any[]) {
    const self = this
    return function (...y: any[]) {
        const args = x.concat(y)
        return self.apply(content, args)
    }

}

export function log(this: any, ...x: any[]) {
    console.log(this, '|', ...x)
}

log(1, 2, 3)

// @ts-ignore
log.custombind({ name: 'wmc' }, 1, 2)(1, 2, 3)

