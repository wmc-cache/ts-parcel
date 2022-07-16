type Status = 'success' | 'no_running' | 'error' | 'running'

let timer: ReturnType<typeof setTimeout>

let result: Result = { status: 'running', key: 1, msg: 'ok' }

interface Result {
  status: Status
  key: number
  msg: string
}

// 检查导出状态
export async function checkStatus(fileKey: string) {
  return new Promise((resolve) => {
    const fn = async () => {
      const { status, key, msg } = await exportStatus({ key: fileKey })
      console.log(status, key, msg)
      if (status === 'success') {
        clearTimeout(timer)
        resolve({ success: true, key })
        return
      }

      if (['no_running', 'error'].includes(status)) {
        clearTimeout(timer)
        resolve({ success: false, msg })
        return
      }

      if (status === 'running') {
        clearTimeout(timer)
        timer = setTimeout(() => {
          fn()
        }, 1000)
        return
      }
      clearTimeout(timer)
      resolve({ success: false })
    }
    fn()
  })
}

checkStatus('123')

// 模拟后端返回数据

function exportStatus(key: { key: string }): Result {
  return result
}

setTimeout(() => {
  result = { status: 'success', key: 1, msg: 'ok' }
}, 5000)
