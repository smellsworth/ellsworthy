const PRISMIC_URL = "https://mattellsworth-test.prismic.io/api/v2"

const getMasterRef = async (fetcher: typeof fetch) => {
  const response = await fetcher(PRISMIC_URL)
  const data: PrismicApiInfo = await response.json()
  const masterRef = data.refs
    ? data.refs.find(({ isMasterRef }) => isMasterRef)
    : undefined

  return masterRef ? masterRef.ref : undefined
}

const loadIndex = (fetcher: typeof fetch) => async () => {
  const ref = await getMasterRef(fetcher)

  if (!ref) {
    throw new Error("Master ref not found")
  }

  const url = `${PRISMIC_URL}/documents/search?ref=${ref}`
  const response = await fetcher(url)
  const responseData: PrismicSearchResponse = await response.json()

  const index = responseData.results.map((result) => ({
    title: result.data.title[0].text,
    slug: result.slugs[0],
  }))

  return Promise.resolve(index)
}

const loadPost = (fetcher: typeof fetch) => async (slug: string) => {
  const ref = await getMasterRef(fetcher)

  if (!ref) {
    throw new Error("Master ref not found")
  }

  const query = encodeURIComponent(`[[at(my.post.uid, "${slug}")]]`)
  const url = `${PRISMIC_URL}/documents/search?ref=${ref}&q=${query}`
  const response = await fetcher(url)
  const responseData: PrismicSearchResponse = await response.json()

  if (!responseData.results || !responseData.results[0]) {
    throw new Error("Not found")
  }
  const result = responseData.results[0]

  const post = {
    title: result.data.title[0].text,
    slug: result.slugs[0],
    html: result.data.description[0].text,
  }

  return Promise.resolve(post)
}

export { loadIndex, loadPost }
