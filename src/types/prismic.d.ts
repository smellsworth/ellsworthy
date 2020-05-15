interface PrismicApiInfo {
  refs: {
    id: string
    ref: string
    label: string
    isMasterRef: boolean
  }[]
  integrationFieldsRef: null
  bookmarks: {}
  types: { [key: string]: string }
  languages: {
    id: string
    name: string
  }[]
  tags: string[]
  forms: {
    everything: {
      method: "GET"
      enctype: "application/x-www-form-urlencoded"
      action: string
      fields: {
        ref: {
          type: "String"
          multiple: false
        }
        q: {
          type: "String"
          multiple: true
        }
        lang: {
          type: "String"
          multiple: false
        }
        page: {
          type: "Integer"
          multiple: false
          default: "1"
        }
        pageSize: {
          type: "Integer"
          multiple: false
          default: "20"
        }
        after: {
          type: "String"
          multiple: false
        }
        fetch: {
          type: "String"
          multiple: false
        }
        fetchLinks: {
          type: "String"
          multiple: false
        }
        graphQuery: {
          type: "String"
          multiple: false
        }
        orderings: {
          type: "String"
          multiple: false
        }
        referer: {
          type: "String"
          multiple: false
        }
      }
    }
  }
  oauth_initiate: string
  oauth_token: string
  version: string
  license: string
  experiments: {
    draft: string[]
    running: string[]
  }
}

interface PrismicSearchResponse<T = any> {
  page: number
  results_per_page: number
  results_size: number
  total_results_size: number
  total_pages: number
  next_page: number | null
  prev_page: number | null
  results: {
    id: string
    uid: string
    type: string
    href: string
    tags: string[]
    first_publication_date: string
    last_publication_date: string
    slugs: string[]
    linked_documents: string[]
    lang: string
    alternate_languages: string[]
    data: T
  }[]
  version: string
  license: string
}
