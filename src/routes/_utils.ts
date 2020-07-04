const loadIndex = (fetcher: typeof fetch) => async (): Promise<{
  essays: BlogArticleIndexInfo[]
  projects: BlogArticleIndexInfo[]
}> => {
  const url = "/index.json"
  const response = await fetcher(url)

  if (!response.ok) {
    throw new Error("Can't load index")
  }

  const data = await response.json()

  return data
}

export { loadIndex }
