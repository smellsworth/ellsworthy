import { NowRequest, NowResponse } from '@now/node'
import { readValue, setValue } from "../../_firebase"

export default async (req: NowRequest, res: NowResponse) => {
  res.setHeader('content-type', 'application/json')
  try {
    const path = `/kudos_count/${req.query.slug}`
    const count = await readValue<number | null>(path)
    const value = count || 0
    const nextValue = value + 1

    setValue(path, nextValue)

    res.end()
  } catch (error) {
    console.error(error)
    // we ignore errors because this feature is just a nice to have
    res.end()
  }
}
