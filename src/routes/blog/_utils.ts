import { formatPrismicNodes } from "../../utils/nodes"

const PRISMIC_URL = "https://mattellsworth-test.prismic.io"
const FIREBASE_URL = "https://blog-test-5b3c1.firebaseio.com"

interface IndexResponse {
  data: {
    allArticles: {
      edges: {
        node: {
          title: PrismicTextNode[]
          _meta: {
            uid: string
          }
        }
      }[]
    }
  }
}

interface ArticleResponse {
  data: {
    article: {
      title: PrismicTextNode[]
      content: PrismicNode[]
    }
  }
}

const graphQlQuery = <T = any>(fetcher: typeof fetch) => async (
  query: string
): Promise<T> => {
  const ref = await getMasterRef(fetcher)

  if (!ref) {
    throw new Error("Master ref not found")
  }

  const urlQuery = encodeURIComponent(query)
  const headers = {
    "Prismic-ref": ref,
  }

  const url = `${PRISMIC_URL}/graphql?query=${urlQuery}`
  const response = await fetcher(url, { headers })

  return response.json()
}

const getMasterRef = async (fetcher: typeof fetch) => {
  const response = await fetcher(`${PRISMIC_URL}/api/v2`)
  const data: PrismicApiInfo = await response.json()
  const masterRef = data.refs
    ? data.refs.find(({ isMasterRef }) => isMasterRef)
    : undefined

  return masterRef ? masterRef.ref : undefined
}

const loadIndex = (fetcher: typeof fetch) => async (): Promise<
  { title: string; slug: string }[]
> => {
  const query = `
  {
    allArticles(sortBy: meta_lastPublicationDate_DESC) {
      edges {
        node {
          title
          _meta {
            uid
          }
        }
      }
    }
  }
  `

  const response = await graphQlQuery<IndexResponse>(fetcher)(query)

  return response.data.allArticles.edges.map((edge) => ({
    title: edge.node.title[0].text,
    slug: edge.node._meta.uid,
  }))
}

const loadArticle = (fetcher: typeof fetch) => async (
  slug: string
): Promise<{ slug: string, title: string; content: UiNode[] }> => {
  const query = `
  {
    article(uid: "${slug}", lang: "en-us") {
      title
      content
    }
  }
  `

  const response = await graphQlQuery<ArticleResponse>(fetcher)(query)

  return {
    slug,
    title: response.data.article.title[0].text,
    content: formatPrismicNodes(response.data.article.content),
  }
}

const getKudos = (fetcher: typeof fetch) => async (
  slug: string
): Promise<number> => {
  const url = `${FIREBASE_URL}/kudos_count/${slug}.json`
  const response = await fetcher(url)
  const value = await response.json()

  if (typeof value !== "number") {
    return 0
  }

  return value
}

const loadKudos = (fetcher: typeof fetch) => async (
  slug: string
): Promise<number> => {
  try {
    return getKudos(fetcher)(slug)
  } catch (e) {
    return 0
  }
}

const sendKudos = (fetcher: typeof fetch) => async (
  slug: string
): Promise<void> => {
  try {
    const nbKudos = await getKudos(fetcher)(slug)
    const newValue = nbKudos + 1

    const url = `${FIREBASE_URL}/kudos_count/${slug}.json`
    fetch(url, { method: 'PUT', body: newValue.toString() })
  } catch (e) {
    console.error(e)
  }
}

export { loadIndex, loadArticle, loadKudos, sendKudos }
