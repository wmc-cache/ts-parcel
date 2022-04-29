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

let add: ant = 'webName'

export {}
