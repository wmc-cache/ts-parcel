export function compare(target: string, str: string, ignore: boolean = false) {
  let position: Array<number> = [];
  let index = 0;
  let reg;
  if (ignore) {
    reg = new RegExp(str, "gi");
  } else {
    reg = new RegExp(str, "g");
  }
  target.replace(reg, function (match: string, pos: number, orginText: string) {
    position[index] = pos;
    index++;
    return "a";
  });
  return position;
}
console.log(compare("tttAta", "At"));
