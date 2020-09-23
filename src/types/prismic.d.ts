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

interface PrismicStrongSpan {
  type: "strong"
  start: number
  end: number
}
interface PrismicEmSpan {
  type: "em"
  start: number
  end: number
}
interface PrismicLinkSpan {
  type: "hyperlink"
  start: number
  end: number
  data: {
    link_type: string
    url: string
  }
}
type PrismicSpan = PrismicStrongSpan | PrismicEmSpan | PrismicLinkSpan

interface PrismicTextNode {
  type:
    | "heading1"
    | "heading2"
    | "heading3"
    | "heading4"
    | "heading5"
    | "heading6"
    | "paragraph"
    | "preformatted"
    | "o-list-item"
    | "list-item"
  text: string
  spans: PrismicSpan[]
}

interface PrismicImageNode {
  type: "image"
  url: string
  alt: string | null
  copyright: string | null
  dimensions: {
    width: number
    height: number
  }
}

interface PrismicEmbedNode {
  type: "embed"
  oembed: {
    type: "video" | "rich"
    embed_url: string
    title: string
    provider_name: string
    thumbnail_url: string | null
    thumbnail_width?: number
    thumbnail_height?: number
    height: number | null
    width: number | null
    version: string
    author_name: string
    author_url: string
    provider_url: string
    cache_age: number | null
    html: string
  }
}

type PrismicNode = PrismicTextNode | PrismicImageNode | PrismicEmbedNode

type PrismicImage = Omit<PrismicImageNode, 'type'>
