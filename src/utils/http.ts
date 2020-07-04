const get = (fetcher: typeof fetch) => async <T = any>(url: string): Promise<T> => {
  const response = await fetcher(url)

  if (!response.ok) {
    throw new Error(`Load url: "${url}" failed`)
  }

  const data = await response.json()

  return data
}

export { get }
