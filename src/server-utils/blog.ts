import { graphQlQuery } from "./prismic"
import {
  setIndexCache,
  setArticleCache,
  getIndexCache,
  getArticleCache,
} from "./cache"
import { formatPrismicNodes } from "./nodes"

interface IndexPageInfo {
  hasNextPage: boolean
  endCursor: string
}

interface IndexEdge {
  node: {
    title: PrismicTextNode[]
    _meta: {
      uid: string
    }
  }
}

interface IndexDataResponse {
  pageInfo: IndexPageInfo
  edges: IndexEdge[]
}

interface ItemDataResponse {
  title: PrismicTextNode[]
  content: PrismicNode[]
}

interface IndexArticleResponse {
  data: {
    allArticles: IndexDataResponse
  }
}

interface IndexProjectResponse {
  data: {
    allProjects: IndexDataResponse
  }
}

type IndexResponse = IndexArticleResponse | IndexProjectResponse

interface ArticleResponse {
  data: {
    article: ItemDataResponse | null
  }
}

interface ProjectResponse {
  data: {
    project: ItemDataResponse | null
  }
}

type ItemResponse = ArticleResponse | ProjectResponse

function isParagraphNode(node: PrismicNode): node is PrismicTextNode {
  return node.type === "paragraph"
}

function getArticleDescription(nodes: PrismicNode[]): string {
  const firstParagraph = nodes.find(isParagraphNode)

  return firstParagraph?.text ?? ""
}

const indexGraphQlKeys: {[key in ArticleType]: string} = {
  essay: 'allArticles',
  project: 'allProjects',
}

const itemGraphQlKeys: {[key in ArticleType]: string} = {
  essay: 'article',
  project: 'project',
}

function isArticleIndexResponse(response: IndexResponse): response is IndexArticleResponse {
  return !!(response.data as any).allArticles
}

function isProjectIndexResponse(response: IndexResponse): response is IndexProjectResponse {
  return !!(response.data as any).allProjects
}

function isArticleResponse(response: ItemResponse): response is ArticleResponse {
  return !!(response.data as any).article
}

function isProjectResponse(response: ItemResponse): response is ProjectResponse {
  return !!(response.data as any).project
}

function getIndexData(response: IndexResponse): IndexDataResponse {
  if (isArticleIndexResponse(response)) {
    return response.data.allArticles
  }
  if (isProjectIndexResponse(response)) {
    return response.data.allProjects
  }

  return {
    edges: [],
    pageInfo: {
      endCursor: '',
      hasNextPage: false
    }
  }
}

function getItemData(response: ItemResponse): ItemDataResponse | null {
  if (isArticleResponse(response)) {
    return response.data.article
  }
  if (isProjectResponse(response)) {
    return response.data.project
  }

  return null
}

async function loadIndexPages(
  type: ArticleType,
  acc: BlogArticleIndexInfo[] = [],
  startCursor?: string
): Promise<BlogArticleIndexInfo[]> {
  const graphQlKey = indexGraphQlKeys[type]
  let params = "sortBy: meta_firstPublicationDate_DESC"
  if (startCursor) {
    params += `,after: "${startCursor}"`
  }

  const query = `
  {
    ${graphQlKey}(${params}) {
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
  const indexData = getIndexData(response)
  const page = indexData.edges.map((edge) => ({
    title: edge.node.title[0].text,
    slug: edge.node._meta.uid,
  }))
  const index = [...acc, ...page]

  if (indexData.pageInfo.hasNextPage) {
    return loadIndexPages(
      type,
      index,
      indexData.pageInfo.endCursor
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
): Promise<BlogArticle | undefined> {
  const cache = getArticleCache(type, slug)
  if (cache) return cache

  const graphQlKey = itemGraphQlKeys[type]

  const query = `
  {
    ${graphQlKey}(uid: "${slug}", lang: "en-us") {
      title
      content
    }
  }
  `

  const response = await graphQlQuery<ItemResponse>(query)
  const data = getItemData(response)
  if (!data) {
    return undefined
  }

  const article = {
    slug,
    title: data.title[0].text,
    description: getArticleDescription(data.content),
    content: await formatPrismicNodes(data.content),
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

async function loadEssay(slug: string): Promise<BlogArticle | undefined> {
  return loadArticle("essay", slug)
}

async function loadProject(slug: string): Promise<BlogArticle | undefined> {
  return loadArticle("project", slug)
}

export {
  getArticleDescription,
  loadEssayIndex,
  loadProjectIndex,
  loadEssay,
  loadProject,
}
