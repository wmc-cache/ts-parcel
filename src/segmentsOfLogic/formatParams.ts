interface Form {
  [key: string]: string | null | undefined
}
const form: Form = {
  name: null,
  action: '',
  emotion: undefined,
  event_time: '2022-01-03 00:00:00',
}
const formatParmas = Object.keys(form)
  .filter((key) => ![undefined, null, ''].includes(form[key]))
  .reduce((acc, key) => ({ ...acc, [key]: form[key] }), {})

console.log(Object.keys(form)
  .filter((key) => ![undefined, null, ''].includes(form[key])))


