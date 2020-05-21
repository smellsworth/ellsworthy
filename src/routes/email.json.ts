import { Request, Response } from "polka"
import isEmail from "validator/lib/isEmail"
import { pushValue } from "../server-utils/firebase"

export async function post(req: Request, res: Response) {
  try {
    const path = `/emails`
    const email: string | undefined = req.query?.email

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
