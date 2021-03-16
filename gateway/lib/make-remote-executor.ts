import { fetch } from 'cross-fetch'
import { print } from 'graphql'

function makeRemoteExecutor(url: string) {
  return async ({ document, variables }: any) => {
    const query = typeof document === 'string' ? document : print(document)
    console.log(`# -- OPERATION ${new Date().toISOString()}:\n${url}\n${query}`)
    const fetchResult = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    })

    return fetchResult.json()
  }
}

export default makeRemoteExecutor
