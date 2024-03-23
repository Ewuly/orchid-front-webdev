import { http, createConfig } from 'wagmi'
import { etherlinkTestnet } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

// import { type Chain } from 'viem'
 
// export const etherLink = {
//   id: 128123,
//   name: 'Etherlink Testnet',
//   nativeCurrency: { name: 'Tezos', symbol: 'XTZ', decimals: 18 },
//   rpcUrls: {
//     default: { http: ['https://node.ghostnet.etherlink.com'] },
//   },
//   blockExplorers: {
//     default: { name: 'Etherlink', url: 'https://testnet-explorer.etherlink.com/' },
//   },
// } as const satisfies Chain

export const config = createConfig({
  chains: [etherlinkTestnet],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'Create Wagmi' }),
  ],
  ssr: true,
  transports: {
    [etherlinkTestnet.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}