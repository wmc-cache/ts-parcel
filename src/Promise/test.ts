// 必须在浏览器中运行 才有document
// 必须把script放到body中 才有document.body
function loadImage(url: string) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.src = url;
    console.log(document);
    document.body.append(img);
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject(new Error("Image not loaded"));
    };
  });
}

loadImage("https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png")
  .then((img: any) => {
    console.log("img", img.width);
    return;
  })
  .then({} as any)
  .then((res) => {
    console.log(">>>>>>>",res);
  });
