const express = require('express')
const pages = require('../src/meta')

const app = express()

for (const page of pages) {
    const { default: pageContent } =
        require(`../src/pages/${page.file}.ts`)

    app.get(page.path, (_, res) => res.send(pageContent))
}

app.listen(3000)
console.log('💬: dev preview listening on http://localhost:3000')