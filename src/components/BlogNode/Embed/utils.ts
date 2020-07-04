const loadedScripts: string[] = []

function getTheme(): "light" | "dark" {
  const darkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  return darkMode ? "dark" : "light"
}

/**
 * for twitter: update meta element in head define in "template.html"
 */
function setTheme() {
  const theme = getTheme()
  const twitterTag = document.getElementById('twitter-theme')

  twitterTag?.setAttribute('content', theme)
}

/**
 * For an unknown reason, script in embed html is executed too early
 * To resolve this we remove script from embed html and get script src
 * to append the script in body after component is mounted
 * @param html embed html string
 */
function extractScript(html: string): { html: string; scriptSrc: string } {
  const scriptIndex = html.indexOf("<script")
  const htmlWithoutScript = html.substr(0, scriptIndex)
  const script = html.substr(scriptIndex)
  const parts = script.split(" ")
  const srcPart = parts.find((part) => part.indexOf("src") === 0)

  if (srcPart) {
    const scriptSrc = srcPart.substr(5, srcPart.length - 6)

    return {
      html: htmlWithoutScript,
      scriptSrc,
    }
  }

  return {
    html: html,
    scriptSrc: "",
  }
}

function insertScript(src: string): void {
  if (loadedScripts.indexOf(src) < 0) {
    const script = document.createElement('script')
    script.src = src
    document.body.appendChild(script)
    loadedScripts.push(src)
  }
}

export { setTheme, extractScript, insertScript }
