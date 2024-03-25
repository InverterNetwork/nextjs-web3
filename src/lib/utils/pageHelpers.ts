export async function handlePageData<T>(action: () => Promise<T>) {
  try {
    const data = await action()
    return { data, error: null }
  } catch (err: any) {
    return {
      data: null,
      error:
        (err?.message as string | undefined) ??
        'An Unknown Error Has Happened :(',
    }
  }
}
