import { Request, Response } from "polka"
import { clearCache } from "../server-utils/cache"

export async function get(req: Request, res: Response) {
  clearCache()
  res.end()
}
