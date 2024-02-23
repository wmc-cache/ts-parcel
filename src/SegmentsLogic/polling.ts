type Status = 'success' | 'no_running' | 'error' | 'running';

interface Result {
  status?: Status;
  key?: number;
  msg?: string;
}

let result: Result = {}

// 模拟后端返回数据
function exportStatus(key: { key: string }): Result {
  // 模拟的结果，实际情况应从后端获取
  return result;
}




// 使用闭包封装定时器逻辑
const createPollingFunc = (fn: () => Promise<void>, interval: number) => {
  let timer: ReturnType<typeof setTimeout>;

  const startPolling = () => {
    clearTimeout(timer); // 清除之前的定时器
    timer = setTimeout(async () => {
      await fn();
      startPolling(); // 递归调用以继续轮询
    }, interval);
  };

  const stopPolling = () => {
    clearTimeout(timer); // 停止轮询
  };

  return { startPolling, stopPolling };
};





// 检查导出状态
export async function checkStatus(fileKey: string) {
  return new Promise((resolve) => {
    const { startPolling, stopPolling } = createPollingFunc(async () => {
      const { status, key, msg } = await exportStatus({ key: fileKey });
      console.log(status, key, msg);

      if (status === 'success' || status === 'no_running' || status === 'error') {
        stopPolling(); // 停止轮询
        resolve({ success: status === 'success', key, msg });
      }
      // 如果状态是'running'，轮询将自动继续
    }, 1000);

    startPolling(); // 开始轮询
  });
}

// 启动检查状态
checkStatus('123');

// 在5秒后更新结果状态为成功，模拟导出操作完成
setTimeout(() => {
  result = { status: 'success', key: 1, msg: 'ok' };
}, 5000);
