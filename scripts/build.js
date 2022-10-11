const fs = require('fs')
const head = require('../src/head')
const pages = require('../src/meta')
const { stripIndents } = require('common-tags')

const getPageContents = (file) => {
    const page = require(`../src/pages/${file}`)
    return page.default
}

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
                    ${getPageContents(page.file)}
                </body>
            </html>
            `
        )
    }
}