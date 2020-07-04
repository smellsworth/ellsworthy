const loadIndex = (fetcher: typeof fetch) => async (): Promise<
  BlogArticleIndexInfo[]
> => {
  const url = "/projects.json"
  const response = await fetcher(url)

  if (!response.ok) {
    throw new Error("Can't load projects index")
  }

  const data = await response.json()

  return data
}

const loadArticle = (fetcher: typeof fetch) => async (
  slug: string
): Promise<BlogArticle> => {
  const url = `/projects/${slug}.json`
  const response = await fetcher(url)

  if (!response.ok) {
    throw new Error(`Can't load article 'slug'`)
  }

  return await response.json()
}

export { loadIndex, loadArticle }
