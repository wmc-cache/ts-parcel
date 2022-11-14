
import { Stack } from './stack'
describe("test", () => {

    it('should ', () => {
        const stack = new Stack([])
        expect(stack.isEmpty()).toEqual(true);
    });
    it('should ', () => {
        const stack = new Stack([])
        stack.push(1)
        expect(stack.peek()).toEqual(1);
    });


})


