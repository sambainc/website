import fs from 'fs'
import head from '../src/head'
import pages from '../src/meta'
import { stripIndents } from 'common-tags'

const getPageContents = async (file) => {
    const page = await import(`../src/pages/${file}`)
    return page.default
}

(async () => {
    const buildFolder = 'build'
    if (!fs.existsSync(buildFolder)) {
        fs.mkdirSync(buildFolder)
    }

    const staticCopy = {
        source: 'static',
        target: 'build/static'
    }

    fs.cpSync(
        staticCopy.source, 
        staticCopy.target, 
        { recursive: true }
    )

    for (const page of pages) {
        if (page.publish) {
            fs.writeFileSync(
                `build/${page.file}`,
                stripIndents`
                    ${head()}
                    <body>
                        ${await getPageContents(page.file)}
                    </body>
                </html>
                `
            )
        }
    }
})()