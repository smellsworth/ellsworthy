function assertNever(value: never) {
  console.error(`${value} is invalid`)
}

function getPrismicTextNodes(
  text: string,
  textSpans: PrismicSpan[]
): InlineNode[] {
  if (text === "") {
    return []
  }
  if (textSpans.length === 0) {
    return [{ type: "text", value: text }]
  }

  const inlineNodes: InlineNode[] = []
  const spans = [...textSpans]
  const firstSpanStart = spans[0].start

  if (firstSpanStart > 0) {
    inlineNodes.push({
      type: "text",
      value: text.substr(0, firstSpanStart),
    })
  }

  while (spans.length) {
    const span = spans.shift() as PrismicSpan

    const spanText = text.substr(span.start, span.end - span.start)
    const spansIn: PrismicSpan[] = []
    const spansSplitted: PrismicSpan[] = []
    // get all spans in the current span
    while (true) {
      const nextSpan = spans[0]
      // if next span start after the end of current span, we got all spans inside current span
      if (!nextSpan || nextSpan.start > span.end) break
      // if next span ends before current span, it is completely include in the current span
      if (nextSpan.end <= span.end) {
        const spanIn = spans.shift() as PrismicSpan
        spanIn.start -= span.start
        spanIn.end -= span.start
        spansIn.push(spanIn)
        // if next span ends after current span, we split it in 2 parts, the first one is include in current span, the second is unshift in spans list
      } else if (nextSpan.end > span.end) {
        const spanIn = spans.shift() as PrismicSpan
        const nextSpanPart: PrismicSpan = { ...spanIn }
        spanIn.start -= span.start
        spanIn.end = span.end - span.start
        nextSpanPart.start = span.end
        spansIn.push(spanIn)
        spansSplitted.push(nextSpanPart)
      } else {
        break
      }
    }
    // push back splitted spans in main spans list
    while (spansSplitted.length) {
      spans.unshift(spansSplitted.shift() as PrismicSpan)
    }


    const children = getPrismicTextNodes(spanText, spansIn)

    switch (span.type) {
      case "strong": {
        inlineNodes.push({
          type: "strong",
          children,
        })
        break
      }
      case "em": {
        inlineNodes.push({
          type: "emphasis",
          children,
        })
        break
      }
      case "hyperlink": {
        inlineNodes.push({
          type: "link",
          url: span.data.url,
          children,
        })
        break
      }
    }

    const nextSpan = spans[0]
    const nextTextNodeEnd = nextSpan ? nextSpan.start : text.length
    const nextTextNodeLength = nextTextNodeEnd - span.end
    if (nextTextNodeLength > 0) {
      inlineNodes.push({
        type: "text",
        value: text.substr(span.end, nextTextNodeLength),
      })
    }
  }

  return inlineNodes
}

function decomposePrismicTextNode(node: PrismicTextNode): InlineNode[] {
  const spans = [...node.spans].sort((span1, span2) => {
    return span1.start - span2.start
  })
  return getPrismicTextNodes(node.text, spans)
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
          children: decomposePrismicTextNode(node),
        })
        break
      case "heading2":
        uiNodes.push({
          type: "heading",
          depth: 2,
          children: decomposePrismicTextNode(node),
        })
        break
      case "heading3":
        uiNodes.push({
          type: "heading",
          depth: 3,
          children: decomposePrismicTextNode(node),
        })
        break
      case "heading4":
        uiNodes.push({
          type: "heading",
          depth: 4,
          children: decomposePrismicTextNode(node),
        })
        break
      case "heading5":
        uiNodes.push({
          type: "heading",
          depth: 5,
          children: decomposePrismicTextNode(node),
        })
        break
      case "heading6":
        uiNodes.push({
          type: "heading",
          depth: 6,
          children: decomposePrismicTextNode(node),
        })
        break
      case "paragraph":
        uiNodes.push({
          type: "paragraph",
          children: decomposePrismicTextNode(node),
        })
        break
      case "preformatted":
        uiNodes.push({ type: "preformatted", value: node.text })
        break
      case "o-list-item": {
        const items: InlineNode[][] = []
        items.push([{ type: "text", value: node.text }])
        let nextNode = nodes[0]
        while (nextNode && nextNode.type === "o-list-item") {
          nodes.shift()
          items.push(decomposePrismicTextNode(node))
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
        const items: InlineNode[][] = []
        items.push([{ type: "text", value: node.text }])
        let nextNode = nodes[0]
        while (nextNode && nextNode.type === "list-item") {
          nodes.shift()
          items.push(decomposePrismicTextNode(node))
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

export { decomposePrismicTextNode, formatPrismicNodes }
