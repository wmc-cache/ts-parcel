// 如果第一个参数是字符串，那么只会替换第一个字符串
// const str = "hello world";
// const str1 = str.replace("o", "h");
// console.log(str1); //hellh world

// 如果想替换所有的字符串，则必须使用正则表达式
// const str2 = "hello world";
// const str3 = str2.replace(/o/g, "h");
// console.log(str3); //hellh whrld

//复杂替换
let str4 = "hello world";
// 第一个参数是匹配到的字符串，第二个参数是匹配的位置，第三个参数是原字符串。
const str5 = str4.replace(/wor/g, function (match, pos, orginText) {
  console.log(match,pos,orginText);
  str4 = ">>>>>>>>>"
  return "a";
});
console.log(str5); //hella warld

export {};
