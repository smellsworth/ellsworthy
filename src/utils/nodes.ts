function assertNever(value: never) {
  console.error(`${value} is invalid`)
}

function formatPrismicNodes(_nodes: PrismicNode[]): UiNode[] {
  const nodes = [..._nodes]
  const uiNodes: UiNode[] = []

  while (nodes.length) {
    const node = nodes.shift() as PrismicNode

    switch (node.type) {
      case "heading1":
        uiNodes.push({
          type: "heading",
          depth: 1,
          children: [{ type: "text", value: node.text }],
        })
        break
      case "heading2":
        uiNodes.push({
          type: "heading",
          depth: 2,
          children: [{ type: "text", value: node.text }],
        })
        break
      case "heading3":
        uiNodes.push({
          type: "heading",
          depth: 3,
          children: [{ type: "text", value: node.text }],
        })
        break
      case "heading4":
        uiNodes.push({
          type: "heading",
          depth: 4,
          children: [{ type: "text", value: node.text }],
        })
        break
      case "heading5":
        uiNodes.push({
          type: "heading",
          depth: 5,
          children: [{ type: "text", value: node.text }],
        })
        break
      case "heading6":
        uiNodes.push({
          type: "heading",
          depth: 6,
          children: [{ type: "text", value: node.text }],
        })
        break
      case "paragraph":
        uiNodes.push({
          type: "paragraph",
          children: [{ type: "text", value: node.text }],
        })
        break
      case "preformatted":
        uiNodes.push({ type: "preformatted", value: node.text })
        break
      case "o-list-item": {
        const items: InlineNode[] = []
        items.push({ type: "text", value: node.text })
        let nextNode = nodes[0]
        while (nextNode && nextNode.type === "o-list-item") {
          nodes.shift()
          items.push({ type: "text", value: nextNode.text })
          nextNode = nodes[0]
        }

        uiNodes.push({
          type: "list",
          ordered: true,
          items,
        })
        break
      }
      case "list-item":
        const items: InlineNode[] = []
        items.push({ type: "text", value: node.text })
        let nextNode = nodes[0]
        while (nextNode && nextNode.type === "list-item") {
          nodes.shift()
          items.push({ type: "text", value: nextNode.text })
          nextNode = nodes[0]
        }

        uiNodes.push({
          type: "list",
          ordered: false,
          items,
        })
        break
      case "image":
        uiNodes.push({
          type: "image",
          url: node.url,
          alt: node.alt,
          width: node.dimensions.width,
          height: node.dimensions.height,
        })
        break
      case "embed":
        uiNodes.push({
          type: "embed",
          provider: node.oembed.provider_name,
          title: node.oembed.title,
          url: node.oembed.embed_url,
          thumbnail_url: node.oembed.thumbnail_url,
          thumbnail_width: node.oembed.thumbnail_width,
          thumbnail_height: node.oembed.thumbnail_height,
        })
        break
      default:
        assertNever(node)
    }
  }

  return uiNodes
}

export { formatPrismicNodes }
