import { getDefaultClient } from 'connectkit'
import { createClient } from 'wagmi'

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

export const client = createClient(
  getDefaultClient({
    autoConnect: true,
    appName: 'ChainView',
    alchemyId,
  })
)
