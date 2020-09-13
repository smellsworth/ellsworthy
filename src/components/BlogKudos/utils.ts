interface PersistedKudos {
  essay: string[]
  project: string[]
}

const KUDOS_LOCALSTORAGE_KEY = "kudos"

function getUserKudos(): PersistedKudos {
  if (typeof window !== 'undefined') {
    const kudos = localStorage.getItem(KUDOS_LOCALSTORAGE_KEY)
    if (kudos) {
      try {
        const parsed = JSON.parse(kudos)
        if (parsed.essay && parsed.project) {
          return parsed
        }
      } catch (e) {
        return {
          essay: [],
          project: [],
        }
      }
    }
  }

  return {
    essay: [],
    project: [],
  }
}

function didSendKudos(type: ArticleType, slug: string): boolean {
  const kudos = getUserKudos()
  return kudos[type].includes(slug)
}

function addKudos(type: ArticleType, slug: string): void {
  const kudos = getUserKudos()
  const newKudos = {
    ...kudos,
    [type]: [...kudos[type], slug],
  }

  localStorage.setItem(KUDOS_LOCALSTORAGE_KEY, JSON.stringify(newKudos))
}

const loadKudos = (fetcher: typeof fetch) => async (
  type: ArticleType,
  slug: string
): Promise<number> => {
  try {
    const url = `/api/kudos/get?type=${type}&slug=${slug}`
    const response = await fetcher(url)
    return await response.json()
  } catch (e) {
    console.error(e)
    return 0
  }
}

const sendKudos = (fetcher: typeof fetch) => async (
  type: ArticleType,
  slug: string
): Promise<void> => {
  addKudos(type, slug)
  try {
    const url = `/api/kudos/post?type=${type}&slug=${slug}`
    await fetcher(url)
  } catch (e) {
    console.error(e)
  }
}

export { loadKudos, sendKudos, didSendKudos }
