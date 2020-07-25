import type { Request, Response } from "polka"
import { loadEssay } from "../../server-utils/blog"

export async function get(req: Request, res: Response) {
  try {
    const article = await loadEssay(req.params.slug)

    if (!article) {
      res.writeHead(404)
      res.end()
    }

    res.end(JSON.stringify(article))
  } catch (error) {
    console.error(error)
    res.writeHead(500)
    res.end()
  }
}
