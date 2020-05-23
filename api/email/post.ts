import { NowRequest, NowResponse } from '@now/node'
import isEmail from "validator/lib/isEmail"
import { pushValue } from "../_firebase"

export default async (req: NowRequest, res: NowResponse) => {
  res.setHeader('content-type', 'application/json')
  try {
    const path = `/emails`
    const query = req.query.email || ''
    const email = Array.isArray(query) ? query.join() : query

    if (email && isEmail(email)) {
      await pushValue(path, email)
      res.end()
    } else {
      res.writeHead(400)
      res.end(JSON.stringify({ error: "email is missing or is invalid" }))
    }
  } catch (error) {
    console.error(error)
    // we ignore errors because this feature is just a nice to have
    res.end()
  }
}
