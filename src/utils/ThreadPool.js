
class ThreadPool {
  constructor(maxThreads, onStart, onEnd, waitingMs) {
    this.maxThreads = maxThreads;
    this.activeThreads = 0;
    this.taskQueue = [];
    this.loading = false;
    this.onStart = onStart;
    this.onEnd = onEnd;
    this.waitingMs = waitingMs || 1000;
  }

  // 添加任务到队列
  submit(task) {
    this.onStart?.();
    if (this.activeThreads < this.maxThreads) {
      this.executeTask(task);
    } else {
      this.taskQueue.push(task);
    }
  }

  // 执行任务
  executeTask(task) {
    this.activeThreads++;
    task()
      .then(() => {

      })
      .catch((error) => {
        console.error('Task error:', error);
      }).finally(() => {
        this.activeThreads--;
        if (this.taskQueue.length > 0) {
          const nextTask = this.taskQueue.shift();
          if (this.waitingMs > 0) {
            setTimeout(() => this.executeTask(nextTask), this.waitingMs)
          } else {
            this.executeTask(nextTask);
          }
        } else {
          this.onEnd?.();
        }
      });
  }
}

export default ThreadPool;