'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

function ConnectWallet() {
  const account = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <>
      <div className="flex justify-center">
        {account.status === 'disconnected' && (
          <button
            onClick={() => connect({ connector: injected() })}
            type="button"
            className="bg-thulian_pink-600 hover:bg-old_rose text-white font-semibold py-1 px-4 border border-transparent rounded-full shadow-lg transition ease-in-out duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            Connect Wallet
          </button>
        )}
        {account.status === 'connected' && (
          <button
            type="button"
            onClick={() => disconnect()}
            className="bg-blue-300 hover:bg-thulian_pink-600 text-white font-semibold py-1 px-4 border border-transparent rounded-full shadow-lg transition ease-in-out duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            Disconnect Wallet
          </button>
        )}
      </div>
    </>
  )
}

export default ConnectWallet