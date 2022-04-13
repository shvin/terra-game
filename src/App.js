import './App.css'

import { useEffect, useState } from 'react'
import {
  useWallet,
  useConnectedWallet,
  WalletStatus,
} from '@terra-money/wallet-provider'

import * as execute from './contract/execute'
import * as query from './contract/query'
import { ConnectWallet } from './components/ConnectWallet'
import twitterLogo from "./assets/twitter-logo.svg";

const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

function App() {
  const [count, setCount] = useState(null)
  const [updating, setUpdating] = useState(true)
  const [resetValue, setResetValue] = useState(0)

  const { status } = useWallet()

  const connectedWallet = useConnectedWallet()

  useEffect(() => {
    const prefetch = async () => {
      if (connectedWallet) {
        setCount((await query.getCount(connectedWallet)).count)
      }
      setUpdating(false)
    }
    prefetch()
  }, [connectedWallet])

  const onClickIncrement = async () => {
    setUpdating(true)
    await execute.increment(connectedWallet)
    setCount((await query.getCount(connectedWallet)).count)
    setUpdating(false)
  }

  const onClickReset = async () => {
    setUpdating(true)
    console.log(resetValue)
    await execute.reset(connectedWallet, resetValue)
    setCount((await query.getCount(connectedWallet)).count)
    setUpdating(false)
  }

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">⚔️ Goblin War ⚔️</p>
          <p className="header sub-text">Only you can save us from Goblin town</p>
          <div className="connect-buttons">
            {status === WalletStatus.WALLET_CONNECTED && (
              <div style={{ display: 'inline' }}>
                <input
                  type="number"
                  onChange={(e) => setResetValue(+e.target.value)}
                  value={resetValue}
                />
                <button onClick={onClickReset} type="button">
                  {' '}
                  reset{' '}
                </button>
              </div>
            )}
          </div>
        </div>
        <ConnectWallet />
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built with @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App
