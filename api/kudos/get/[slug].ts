import { NowRequest, NowResponse } from "@now/node"
import { readValue } from "../../_firebase"

export default async (req: NowRequest, res: NowResponse) => {
  res.setHeader('content-type', 'application/json')
  try {
    const count = await readValue<number | null>(
      `/kudos_count/${req.query.slug}`
    )
    const value = count || 0
    res.end(value.toString())
  } catch (error) {
    console.error(error)
    // we ignore errors because this feature is just a nice to have
    res.end("0")
  }
}
