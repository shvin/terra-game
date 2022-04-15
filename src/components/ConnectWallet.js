import { useWallet, WalletStatus } from '@terra-dev/use-wallet'
import App from '../App'
import '../App.css'

export const ConnectWallet = () => {
  const {
    status,
    availableConnectTypes,
    availableInstallTypes,
    connect,
    install,
    disconnect,
  } = useWallet()

  return (
    <div>
      {status === WalletStatus.WALLET_NOT_CONNECTED && (
        <>
          {availableInstallTypes.map((connectType) => (
            <button
              key={`install-CHROME_EXTENSION`}
              onClick={() => install("connectType")}
              type="button"
            >
              Install {connectType}
            </button>
          ))}
          {availableConnectTypes.map((connectType) => (
            <button
              key={`connect-CHROME_EXTENSION`}
              onClick={() => connect('CHROME_EXTENSION')}
              type="button"
            >
              Connect {connectType}
            </button>
          ))}
        </>
      )}
      {status === WalletStatus.WALLET_CONNECTED && (
        <button onClick={() => disconnect()} type="button">
          Disconnect
        </button>
      )}
    </div>
  )
}
