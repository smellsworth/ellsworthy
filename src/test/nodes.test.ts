import { decomposePrismicTextNode } from "../server-utils/nodes"

describe("decomposePrismicTextNode", () => {
  test("returns an empty array", () => {
    const input: PrismicTextNode = {
      type: "paragraph",
      text: "",
      spans: [],
    }
    const expected: InlineNode[] = []
    const output = decomposePrismicTextNode(input)

    expect(output).toEqual(expected)
  })

  test("returns 1 text node", () => {
    const input: PrismicTextNode = {
      type: "paragraph",
      text: "This is some text",
      spans: [],
    }
    const expected: InlineNode[] = [
      { type: "text", value: "This is some text" },
    ]
    const output = decomposePrismicTextNode(input)

    expect(output).toEqual(expected)
  })

  test("returns 1 strong node", () => {
    const input: PrismicTextNode = {
      type: "paragraph",
      text: "This is some text",
      spans: [
        {
          start: 0,
          end: 17,
          type: "strong",
        },
      ],
    }
    const expected: InlineNode[] = [
      {
        type: "strong",
        children: [{ type: "text", value: "This is some text" }],
      },
    ]
    const output = decomposePrismicTextNode(input)

    expect(output).toEqual(expected)
  })

  test("returns text node, emphasis node, 1 text node", () => {
    const input: PrismicTextNode = {
      type: "paragraph",
      text: "This is some text",
      spans: [
        {
          start: 8,
          end: 12,
          type: "em",
        },
      ],
    }
    const expected: InlineNode[] = [
      {
        type: "text",
        value: "This is ",
      },
      {
        type: "emphasis",
        children: [{ type: "text", value: "some" }],
      },
      {
        type: "text",
        value: " text",
      },
    ]
    const output = decomposePrismicTextNode(input)

    expect(output).toEqual(expected)
  })

  test("returns text node, strong node, text node, emphasis node, text node", () => {
    const input: PrismicTextNode = {
      type: "paragraph",
      text: "This is some bold and italic text",
      spans: [
        {
          start: 13,
          end: 17,
          type: "strong",
        },
        {
          start: 22,
          end: 28,
          type: "em",
        },
      ],
    }
    const expected: InlineNode[] = [
      {
        type: "text",
        value: "This is some ",
      },
      {
        type: "strong",
        children: [{ type: "text", value: "bold" }],
      },
      {
        type: "text",
        value: " and ",
      },
      {
        type: "emphasis",
        children: [{ type: "text", value: "italic" }],
      },
      {
        type: "text",
        value: " text",
      },
    ]
    const output = decomposePrismicTextNode(input)

    expect(output).toEqual(expected)
  })

  test("returns 1 strong node with 1 emphasis node in", () => {
    const input: PrismicTextNode = {
      type: "paragraph",
      text: "This is some text",
      spans: [
        {
          start: 8,
          end: 12,
          type: "strong",
        },
        {
          start: 8,
          end: 12,
          type: "em",
        },
      ],
    }
    const expected: InlineNode[] = [
      {
        type: "text",
        value: "This is ",
      },
      {
        type: "strong",
        children: [
          {
            type: "emphasis",
            children: [{ type: "text", value: "some" }],
          },
        ],
      },
      {
        type: "text",
        value: " text",
      },
    ]
    const output = decomposePrismicTextNode(input)

    expect(output).toEqual(expected)
  })

  test("returns 1 link with 1 strong node in with 1 emphasis node in", () => {
    const input: PrismicTextNode = {
      type: "paragraph",
      text: "This is some text",
      spans: [
        {
          start: 8,
          end: 12,
          type: "hyperlink",
          data: { link_type: "Web", url: "https://test.co" },
        },
        {
          start: 8,
          end: 12,
          type: "strong",
        },
        {
          start: 8,
          end: 12,
          type: "em",
        },
      ],
    }
    const expected: InlineNode[] = [
      {
        type: "text",
        value: "This is ",
      },
      {
        type: "link",
        url: "https://test.co",
        children: [
          {
            type: "strong",
            children: [
              {
                type: "emphasis",
                children: [{ type: "text", value: "some" }],
              },
            ],
          },
        ],
      },
      {
        type: "text",
        value: " text",
      },
    ]
    const output = decomposePrismicTextNode(input)

    expect(output).toEqual(expected)
  })

  test("returns crossed nodes (strong and emphasis)", () => {
    const input: PrismicTextNode = {
      type: "paragraph",
      text: "This is some text",
      spans: [
        {
          start: 8,
          end: 11,
          type: "strong",
        },
        {
          start: 9,
          end: 12,
          type: "em",
        },
      ],
    }
    const expected: InlineNode[] = [
      {
        type: "text",
        value: "This is ",
      },
      {
        type: "strong",
        children: [
          { type: "text", value: "s" },
          {
            type: "emphasis",
            children: [{ type: "text", value: "om" }],
          },
        ],
      },
      {
        type: "emphasis",
        children: [{ type: "text", value: "e" }],
      },
      {
        type: "text",
        value: " text",
      },
    ]
    const output = decomposePrismicTextNode(input)

    expect(output).toEqual(expected)
  })

  // For the moment, we accept to render 2 links in this case
  // Keep this test here in case we find a solution to pass this test
  test.skip("returns link node with strong node in (when link start after strong)", () => {
    const input: PrismicTextNode = {
      type: "paragraph",
      text: "This is some text",
      spans: [
        {
          start: 8,
          end: 11,
          type: "strong",
        },
        {
          start: 9,
          end: 12,
          type: "hyperlink",
          data: { link_type: "Web", url: "https://test.co" },
        },
      ],
    }
    const expected: InlineNode[] = [
      {
        type: "text",
        value: "This is ",
      },
      {
        type: "strong",
        children: [{ type: "text", value: "s" }],
      },
      {
        type: "link",
        url: "https://test.co",
        children: [
          {
            type: "strong",
            children: [{ type: "text", value: "om" }],
          },
          { type: "text", value: "e" },
        ],
      },
      {
        type: "text",
        value: " text",
      },
    ]
    const output = decomposePrismicTextNode(input)

    expect(output).toEqual(expected)
  })

  test("returns link node with strong node in (when link start before strong)", () => {
    const input: PrismicTextNode = {
      type: "paragraph",
      text: "This is some text",
      spans: [
        {
          start: 8,
          end: 11,
          type: "hyperlink",
          data: { link_type: "Web", url: "https://test.co" },
        },
        {
          start: 9,
          end: 12,
          type: "strong",
        },
      ],
    }
    const expected: InlineNode[] = [
      {
        type: "text",
        value: "This is ",
      },
      {
        type: "link",
        url: "https://test.co",
        children: [
          { type: "text", value: "s" },
          {
            type: "strong",
            children: [{ type: "text", value: "om" }],
          },
        ],
      },
      {
        type: "strong",
        children: [{ type: "text", value: "e" }],
      },
      {
        type: "text",
        value: " text",
      },
    ]
    const output = decomposePrismicTextNode(input)

    expect(output).toEqual(expected)
  })
})
