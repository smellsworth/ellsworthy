import { Request, Response } from "polka"
import { loadEssay } from "../../server-utils/blog"

export async function get(req: Request, res: Response) {
  try {
    const article = await loadEssay(req.params.slug)
    res.end(JSON.stringify(article))
  } catch (error) {
    console.error(error)
    res.writeHead(500)
    res.end()
  }
}
