import { get } from "httpie"
import dotenv from "dotenv"
dotenv.config({ path: '.env' })

const PRISMIC_URL = process.env.PRISMIC_URL

async function getMasterRef(): Promise<string | undefined> {
  const response = await get<PrismicApiInfo>(`${PRISMIC_URL}/api/v2`)
  const masterRef = response.data.refs
    ? response.data.refs.find(({ isMasterRef }) => isMasterRef)
    : undefined

  return masterRef ? masterRef.ref : undefined
}

async function graphQlQuery<T = any>(query: string): Promise<T> {
  const ref = await getMasterRef()

  if (!ref) {
    throw new Error("Master ref not found")
  }

  const urlQuery = encodeURIComponent(query)
  const headers = {
    "Prismic-ref": ref,
  }

  const url = `${PRISMIC_URL}/graphql?query=${urlQuery}`
  const response = await get<string>(url, { headers })

  if (!response.statusCode || response.statusCode >= 400) {
    console.error(response)
    throw new Error("Can't get data from Prismic")
  }

  const data = JSON.parse(response.data)

  return data
}

export { graphQlQuery }
