export async function s<F extends (...args: any) => any>(items: Parameters<F>[], fn: F): Promise<ReturnType<F>[]> {
  return Promise.all(items.map(async (...args) => fn(...args)))
}

export async function a<F extends (...args: any) => Promise<any>>(items: Parameters<F>[], fn: F): Promise<ReturnType<F>[]> {
  return Promise.all(items.map(fn))
}

