let index: BlogArticleIndexInfo[] | undefined = undefined
let articles: { [key: string]: BlogArticle } = {}

function setIndexCache(value: BlogArticleIndexInfo[]): void {
  index = value
}

function setArticleCache(article: BlogArticle): void {
  articles[article.slug] = article
}

function getIndexCache(): BlogArticleIndexInfo[] | undefined {
  return index
}

function getArticleCache(slug: string): BlogArticle | undefined {
  return articles[slug]
}

function clearCache() {
  index = undefined
  articles = {}
}

export {
  setIndexCache,
  setArticleCache,
  getIndexCache,
  getArticleCache,
  clearCache,
}
