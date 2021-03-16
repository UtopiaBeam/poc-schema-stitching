import * as waitOn from 'wait-on'
import createReviewService from './review'
import createBookService from './book'
import createGateway from './gateway'

async function bootstrap() {
  await Promise.all([
    createBookService().then(server => {
      server
        .listen(3001)
        .then(({ url }) => console.log(`✨ Book service started at ${url}`))
    }),
    createReviewService().then(server => {
      server
        .listen(3002)
        .then(({ url }) => console.log(`✨ Review service started at ${url}`))
    }),
  ])

  waitOn({ resources: [3001, 3002].map(p => `tcp:${p}`) }, async () => {
    const gateway = await createGateway()
    gateway
      .listen(3000)
      .then(({ url }) => console.log(`🚀 Gateway listening at ${url}`))
  })
}

bootstrap()
