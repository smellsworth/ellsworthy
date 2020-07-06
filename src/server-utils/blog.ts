import { graphQlQuery } from "./prismic"
import {
  setIndexCache,
  setArticleCache,
  getIndexCache,
  getArticleCache,
} from "./cache"
import { formatPrismicNodes } from "./nodes"

interface IndexResponse {
  data: {
    allArticles: {
      pageInfo: {
        hasNextPage: boolean
        endCursor: string
      }
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

async function loadIndexPages(
  type: ArticleType,
  acc: BlogArticleIndexInfo[] = [],
  startCursor?: string
): Promise<BlogArticleIndexInfo[]> {
  let params = "sortBy: meta_firstPublicationDate_DESC"
  if (startCursor) {
    params += `,after: "${startCursor}"`
  }

  const query = `
  {
    allArticles(${params}) {
      pageInfo {
        hasNextPage
        endCursor
      }
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

  const response = await graphQlQuery<IndexResponse>(query)
  const page = response.data.allArticles.edges.map((edge) => ({
    title: edge.node.title[0].text,
    slug: edge.node._meta.uid,
  }))
  const index = [...acc, ...page]

  if (response.data.allArticles.pageInfo.hasNextPage) {
    return loadIndexPages(
      type,
      index,
      response.data.allArticles.pageInfo.endCursor
    )
  }

  return index
}

async function loadIndex(type: ArticleType): Promise<BlogArticleIndexInfo[]> {
  const cache = getIndexCache(type)
  if (cache) return cache

  const index = await loadIndexPages(type)

  setIndexCache(type, index)
  return index
}

async function loadArticle(
  type: ArticleType,
  slug: string
): Promise<BlogArticle> {
  const cache = getArticleCache(type, slug)
  if (cache) return cache

  const query = `
  {
    article(uid: "${slug}", lang: "en-us") {
      title
      content
    }
  }
  `

  const response = await graphQlQuery<ArticleResponse>(query)
  const article = {
    slug,
    title: response.data.article.title[0].text,
    content: await formatPrismicNodes(response.data.article.content),
  }

  setArticleCache(type, article)
  return article
}

async function loadEssayIndex(): Promise<BlogArticleIndexInfo[]> {
  return loadIndex("essay")
}

async function loadProjectIndex(): Promise<BlogArticleIndexInfo[]> {
  return loadIndex("project")
}

async function loadEssay(slug: string): Promise<BlogArticle> {
  return loadArticle("essay", slug)
}

async function loadProject(slug: string): Promise<BlogArticle> {
  return loadArticle("project", slug)
}

export { loadEssayIndex, loadProjectIndex, loadEssay, loadProject }
