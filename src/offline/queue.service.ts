type OfflineJob = {
  type: "SALE_SYNC";
  payload: any;
};

const queue: OfflineJob[] = [];

export function enqueue(job: OfflineJob) {
  queue.push(job);
}

export async function flush(processor: (job: OfflineJob) => Promise<void>) {
  while (queue.length) {
    const job = queue.shift()!;
    try {
      await processor(job);
    } catch {
      queue.unshift(job);
      break;
    }
  }
}
