type ArticleType = 'essay' | 'project'

interface BlogArticleIndexInfo {
  title: string
  slug: string
}

interface BlogArticle {
  slug: string
  title: string
  description: string
  content: UiNode[]
}
