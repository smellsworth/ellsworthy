import { Request, Response } from "polka"
import { loadEssayIndex, loadProjectIndex } from "../server-utils/blog"

export async function get(req: Request, res: Response) {
  try {
    const essays = await loadEssayIndex()
    const projects = await loadProjectIndex()
    res.end(JSON.stringify({ essays, projects }))
  } catch (error) {
    console.error(error)
    res.writeHead(500)
    res.end()
  }
}
