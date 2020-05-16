const PRISMIC_URL = "https://mattellsworth-test.prismic.io"

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
): Promise<{ title: string; content: PrismicNode[] }> => {
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
    title: response.data.article.title[0].text,
    content: response.data.article.content,
  }
}

export { loadIndex, loadArticle }
