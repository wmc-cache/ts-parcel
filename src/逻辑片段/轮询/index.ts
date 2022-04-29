  // typeof操作符可以用来获取一个变量或对象的类型
  // ReturnType可以获取函数的返回值类型
  let timer:ReturnType<typeof setTimeout>

  type Status = "success"|"no_running"|"error"|"running"

  interface Result {
    status:Status
    key:number
    msg:string
  }
  
  let result:Result = {status:"running",key:1,msg:"ok"}

   setTimeout(()=>{
       result = {status:"success",key:1,msg:"ok"}
    },5000)

  function  exportStatus (key:{key:string}):Result{
     return result
  }
  
  export async function checkStatus(fileKey:string) {
      return new Promise((resolve) => {
        const fn = async () => {
          const { status, key, msg } = await exportStatus({ key: fileKey });
          console.log(status,key,msg)
          if (status === "success") {
            clearTimeout(timer);
            resolve({ success: true, key });
          } else if (["no_running", "error"].includes(status)) {
            clearTimeout(timer);
            resolve({ success: false, msg });
          } else if (status === "running") {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn();
              }, 1000);
          } else {
            clearTimeout(timer);
            resolve({ success: false });
          }
        };
        fn();
      })
    }
    checkStatus ("start")
