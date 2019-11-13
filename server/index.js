const express = require("express")
const request = require("request")
const path = require("path")
const fs = require("fs")
const React = require("react")
const { renderToNodeStream } = require("react-dom/server")

const Albums = require("./../dist-ssr/Albums").default
const app = express()


app.get("/", (req, res) => {
  const html = fs.readFileSync(path.resolve(__dirname, `./../dist/ssr.html`), "utf-8")
  const [head, tail] = html.split("{content}")
  res.write(head)
  const url = "https://jsonplaceholder.typicode.com/photos?_page=1&&_limit=10"
  request({
    method: "GET",
    url
  }, (err, httpsRes, body) => {
    const newTail = tail.split("{script}")
      .join(`
      <script id="ssr__script">
        window.__ALBUMS__ = ${JSON.stringify(body)}
      </script>
      `)

      const reactElement = React.createElement(Albums, { albums: JSON.parse(body) })
      const stream = renderToNodeStream(reactElement)
      stream.pipe(res, { end: false })
      stream.on("end", () => {
        res.write(newTail)
        res.end()
      })
  })
})

app.get("/client", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./../dist/index.html"))
})

app.use(express.static(path.join(__dirname, "./../dist")))

app.listen(8080, () => {
  console.log("Server is listening on port 8080")
})