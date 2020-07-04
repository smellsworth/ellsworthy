let index: { [key in ArticleType]: BlogArticleIndexInfo[] | undefined } = {
  essay: undefined,
  project: undefined
}
let articles: { [key in ArticleType]: {[key: string]: BlogArticle} } = {
  essay: {},
  project: {},
}

function setIndexCache(type: ArticleType, value: BlogArticleIndexInfo[]): void {
  index[type] = value
}

function setArticleCache(type: ArticleType, article: BlogArticle): void {
  articles[type][article.slug] = article
}

function getIndexCache(type: ArticleType): BlogArticleIndexInfo[] | undefined {
  return index[type]
}

function getArticleCache(type: ArticleType, slug: string): BlogArticle | undefined {
  return articles[type][slug]
}

function clearCache() {
  index = {
    essay: undefined,
    project: undefined
  }
  articles = {
    essay: {},
    project: {},
  }
}

export {
  setIndexCache,
  setArticleCache,
  getIndexCache,
  getArticleCache,
  clearCache,
}
