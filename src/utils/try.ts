export const PromiseHandler = async <T>(fn: () => Promise<T>) => {
  try {
    return {
      success: true,
      data: await fn(),
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      error: error,
      data: null,
    }
  }
}
