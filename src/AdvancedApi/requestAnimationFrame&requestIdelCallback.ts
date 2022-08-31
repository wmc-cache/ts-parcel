requestIdleCallback(() => {
  console.log(2)
})

requestAnimationFrame(() => {
  setInterval(() => {
    console.log(1)
  })
})
