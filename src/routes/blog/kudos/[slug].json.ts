import { Request, Response } from 'polka'
import { readValue, setValue } from "../../../server-utils/firebase"

export async function get(req: Request, res: Response) {
  try {
    const count = await readValue<number | null>(
      `/kudos_count/${req.params.slug}`
    )
    const value = count || 0
    res.end(value.toString())
  } catch (error) {
    console.error(error)
    // we ignore errors because this feature is just a nice to have
    res.end(0)
  }
}

export async function post(req: Request, res: Response) {
  try {
    const path = `/kudos_count/${req.params.slug}`
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
