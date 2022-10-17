function getDecode(str:string){
    // 对base64转编码
    let decode = atob(str);
    // 编码转字符串
    let result = decodeURI(decode);
    return str;
}


console.log(getDecode("eyJhbGciOiJIUzUxMiIsImlhdCI6MTY2NTU0NzI0NiwiZXhwIjoxNjY1NjMzNjQ2fQ.eyJpZCI6NTQwMDA5fQ.9diECtsaNSioDCpNPDEievicjpWMRXPs4NpNaMMMGc3k3AD869cZO_ujD2XwU1oZWPE6VR3_mjjwdb7jsvXmYQ"))  