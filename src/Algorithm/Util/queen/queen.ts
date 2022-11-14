class Queue {
    constructor(private count: number, private lowestCount: number, private items: any) {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    enqueue(element: any) {
        this.items[this.count] = element;
        this.count++;
    }
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        const result = this.items[this.lowestCount]; // {1}
        delete this.items[this.lowestCount]; // {2}
        this.lowestCount++; // {3}
        return result; // {4}
    }
    isEmpty() {
        return this.count === 0;

    }
}