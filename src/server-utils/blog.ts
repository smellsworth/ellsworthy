import { graphQlQuery } from "./prismic"
import {
  setIndexCache,
  setArticleCache,
  getIndexCache,
  getArticleCache,
} from "./cache"
import { formatPrismicNodes } from "../utils/nodes"

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

async function loadIndex(
  type: "essay" | "project"
): Promise<BlogArticleIndexInfo[]> {
  const cache = getIndexCache(type)
  if (cache) return cache

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

  const response = await graphQlQuery<IndexResponse>(query)
  const index = response.data.allArticles.edges.map((edge) => ({
    title: edge.node.title[0].text,
    slug: edge.node._meta.uid,
  }))

  setIndexCache(type, index)
  return index
}

async function loadArticle(
  type: "essay" | "project",
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
    content: formatPrismicNodes(response.data.article.content),
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
