const get = (fetcher: typeof fetch) => async <T = any>(url: string): Promise<T> => {
  const response = await fetcher(url)

  if (!response.ok) {
    throw { status: response.status, message: response.statusText }
  }

  const data = await response.json()

  return data
}

export { get }
