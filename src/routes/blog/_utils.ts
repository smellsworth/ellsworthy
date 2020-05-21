const loadIndex = (fetcher: typeof fetch) => async (): Promise<
  BlogArticleIndexInfo[]
> => {
  const url = "/blog.json"
  const response = await fetcher(url)

  if (!response.ok) {
    throw new Error("Can't load blog index")
  }

  const data = await response.json()

  return data
}

const loadArticle = (fetcher: typeof fetch) => async (
  slug: string
): Promise<BlogArticle> => {
  const url = `/blog/${slug}.json`
  const response = await fetcher(url)

  if (!response.ok) {
    throw new Error(`Can't load article 'slug'`)
  }

  return await response.json()
}

const loadKudos = (fetcher: typeof fetch) => async (
  slug: string
): Promise<number> => {
  try {
    const url = `/blog/kudos/${slug}.json`
    const response = await fetcher(url)
    return await response.json()
  } catch (e) {
    console.error(e)
    return 0
  }
}

const sendKudos = (fetcher: typeof fetch) => async (
  slug: string
): Promise<void> => {
  try {
    const url = `/blog/kudos/${slug}.json`
    await fetcher(url, { method: "POST" })
  } catch (e) {
    console.error(e)
  }
}

export { loadIndex, loadArticle, loadKudos, sendKudos }
