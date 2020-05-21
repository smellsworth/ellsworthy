import { graphQlQuery } from "./prismic"
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

async function loadIndex(): Promise<BlogArticleIndexInfo[]> {
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

  return response.data.allArticles.edges.map((edge) => ({
    title: edge.node.title[0].text,
    slug: edge.node._meta.uid,
  }))
}

async function loadArticle(slug: string): Promise<BlogArticle> {
  const query = `
  {
    article(uid: "${slug}", lang: "en-us") {
      title
      content
    }
  }
  `

  const response = await graphQlQuery<ArticleResponse>(query)

  return {
    slug,
    title: response.data.article.title[0].text,
    content: formatPrismicNodes(response.data.article.content),
  }
}

export { loadIndex, loadArticle }
