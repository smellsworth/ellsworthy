interface TextNode {
  type: "text"
  value: string
}

interface StrongNode {
  type: "strong"
  children: InlineNode[]
}

interface EmphasisNode {
  type: "emphasis"
  children: InlineNode[]
}

interface LinkNode {
  type: "link"
  url: string
  children: InlineNode[]
}

type InlineNode = TextNode | StrongNode | EmphasisNode | LinkNode

interface HeadingNode {
  type: "heading"
  depth: number
  children: InlineNode[]
}

interface ListNode {
  type: "list"
  ordered: boolean
  items: InlineNode[][]
}

interface PreformattedNode {
  type: "preformatted"
  value: string
}

interface ParagraphNode {
  type: "paragraph"
  children: InlineNode[]
}

interface ImageNode {
  type: "image"
  url: string
  alt: string
  width: number
  height: number
}

interface EmbedNode {
  type: "embed"
  url: string
  title: string
  provider: string
  html: string | null
  thumbnail_url: string | null
  thumbnail_width?: number
  thumbnail_height?: number
}

type UiNode =
  | TextNode
  | StrongNode
  | EmphasisNode
  | LinkNode
  | HeadingNode
  | ListNode
  | PreformattedNode
  | ParagraphNode
  | ImageNode
  | EmbedNode
