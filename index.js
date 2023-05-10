async function getUser() {
    return await fetch('https://my-json-server.typicode.com/typicode/demo/profile').then((resp) => resp.json())
  }
  
  async function m1(){
    //other  works
    return await getUser()
  }
  
  async function m2(){
    //other  works
    return await m1()
  }
  
  async function m3(){
    //other  works
    return await m2()
  }
  
  async function main() {
    const res = await m3()
    console.log('res', res)
  }
  main()
