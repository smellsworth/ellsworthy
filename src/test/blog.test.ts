import { getArticleDescription } from "../server-utils/blog"

describe("getArticleDescription", () => {
  test("return empty string if there isn't any node", () => {
    const input: PrismicNode[] = []
    const expected: string = ''
    const output = getArticleDescription(input)

    expect(output).toBe(expected)
  })

  test("return content of first node", () => {
    const text1 = 'This is paragraph content'
    const text2 = 'This is second paragraph content'
    const input: PrismicNode[] = [
      { type: 'paragraph', spans: [], text: text1 },
      { type: 'paragraph', spans: [], text: text2 }
    ]
    const expected: string = text1
    const output = getArticleDescription(input)

    expect(output).toBe(expected)
  })

  test("return content of first paragraph", () => {
    const text1 = 'This is paragraph content'
    const text2 = 'This is second paragraph content'
    const input: PrismicNode[] = [
      { type: 'heading1', spans: [], text: 'Article title' },
      { type: 'paragraph', spans: [], text: text1 },
      { type: 'paragraph', spans: [], text: text2 }
    ]
    const expected: string = text1
    const output = getArticleDescription(input)

    expect(output).toBe(expected)
  })

  test("return empty string if there isn't any paragraph", () => {
    const input: PrismicNode[] = [
      { type: 'heading1', spans: [], text: 'Article title' },
      { type: 'heading2', spans: [], text: 'Part title' },
      { type: 'heading2', spans: [], text: 'Second part title' },
    ]
    const expected: string = ''
    const output = getArticleDescription(input)

    expect(output).toBe(expected)
  })
})
