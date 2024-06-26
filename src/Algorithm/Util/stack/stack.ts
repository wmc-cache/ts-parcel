
// 在使用数组时，大部分方法的时间复杂度是O(n)
// 而使用对象时，大部分方法的时间复杂度是O(1)
export class Stack {

    private count = 0

    constructor(private items: any) {
        this.count = items.length
    }

    push(element: any) {
        this.items[this.count] = element;
        this.count++;
    }

    size() {
        return this.count;
    }

    isEmpty() {
        return this.count === 0;
    }

    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.count - 1];
    }
    clear() {
        this.items = {};
        this.count = 0;
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let objString = `${this.items[0]}`;
        for (let i = 1; i < this.count; i++) {
            objString = `${objString}, ${this.items[i]}`;
        }
        return objString;
    }
}


const stack = new Stack([423, 42, 42, 424, 4234234]);

stack.push(5)

console.log(stack.toString());