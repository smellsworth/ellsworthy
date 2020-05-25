const loadKudos = (fetcher: typeof fetch) => async (
  slug: string
): Promise<number> => {
  try {
    const url = `/api/kudos/get/${slug}`
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
    const url = `/api/kudos/post/${slug}`
    await fetcher(url)
  } catch (e) {
    console.error(e)
  }
}

export { loadKudos, sendKudos }
