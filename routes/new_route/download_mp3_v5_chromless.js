const {Chromeless} = require('chromeless')

const twitterUsername = "xxx"
const twitterPassword = "xxx"

async function run() {
    const chromeless = new Chromeless({  headless:false,})

    const links = await chromeless
        .goto('https://youtubemp3api.com/@api/button/mp3/' + '0hG_I8USKIc')
        .wait('.download-mp3-url')
        .evaluate(() => {
            // this will be executed in headless chrome
            const links = [].map.call(
                document.querySelectorAll('.download-mp3-url'), a => ({title: a.innerText, href: a.href})
            )
            return JSON.stringify(links)
        })

    console.log(links)

    await chromeless.end()
}

run().catch(console.error.bind(console))