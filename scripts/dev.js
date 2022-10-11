import express from 'express'
import pages from '../src/meta'

(async () => {
    const app = express()

    for (const page of pages) {
        const { default: pageContent } =
            await import(`../src/pages/${page.file}`)

        app.get(page.path, (_, res) => res.send(pageContent))
    }

    app.listen(3000)
    console.log('Dev preview currently listening on http://localhost:3000')
})()