/**
 *  Record 用法
 */
interface PageInfo {
  title: string
}

type Page = 'home' | 'about' | 'contact'

const nav: Record<Page, PageInfo> = {
  about: { title: 'about' },
  contact: { title: 'contact' },
  home: { title: 'home' },
}

/**
 *  Keyof 用法
 */
interface Test {
  webName: string

  age: number

  address: string
}

type ant = keyof Test

let add: ant = 'address'

/**
 * typeof 用法
 * ReturnType 用法
 */
let timer: ReturnType<typeof setTimeout>

/**
 * pick 用法
 */
interface B {
  id: number
  name: string
  age: number
}

type PickB = Pick<B, 'id' | 'name'>

let b: PickB = { id: 1, name: 'name' }

/**
 * Omit 用法
 */
interface C {
  id: number
  name: string
  age: number
}

type OmitC = Omit<C, 'id'>

let c: OmitC = { name: 'name', age: 1 }

export {}
