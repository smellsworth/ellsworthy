const SCRIPT_ID = "twitter-wjs"
const SCRIPT_URL = "https://platform.twitter.com/widgets.js"

let initialized = false

function initTwitter(): void {
  if ((process as any).browser && !initialized) {
    const js = document.createElement("script")
    js.id = SCRIPT_ID
    js.src = SCRIPT_URL
    document.body.appendChild(js)

    const t: any = {}
    t._e = []
    t.ready = function (f: any) {
      t._e.push(f)
    }

    ;(window as any).twttr = t
    initialized = true
  }
}

function getTweetId(url: string): string {
  const split = url.split('/')
  return split[split.length - 1]
}

function displayTweet(element: HTMLDivElement, node: EmbedNode): number {
  const widgets: any = (window as any).twttr.widgets
  if (!widgets) {
    return window.setTimeout(() => {
      displayTweet(element, node)
    }, 200)
  }

  const id = getTweetId(node.url);
  const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = darkMode ? 'dark' : 'light';

  widgets.createTweet(id, element, { theme, align: 'center' })

  return 0
}

export { initTwitter, displayTweet }
