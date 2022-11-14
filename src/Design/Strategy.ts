const strategies = {
    "S": function (salary: number) {
        return salary * 4;
    },
    "A": function (salary: number) {
        return salary * 3;
    },
    "B": function (salary: number) {
        return salary * 2;
    }
};

type Level = "A" | "B" | "S"


const calculateBonus = function (level: Level, salary: number) {
    return strategies[level](salary);
};

console.log(calculateBonus('S', 20000));     // 输出：80000
console.log(calculateBonus('A', 10000));     // 输出：30000