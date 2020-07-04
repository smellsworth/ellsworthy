import { Request, Response } from "polka"
import { loadProjectIndex } from "../../server-utils/blog"

export async function get(req: Request, res: Response) {
  try {
    const index = await loadProjectIndex()
    res.end(JSON.stringify(index))
  } catch (error) {
    console.error(error)
    res.writeHead(500)
    res.end()
  }
}
