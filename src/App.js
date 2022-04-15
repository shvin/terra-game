import { useEffect, useState } from 'react'
import {
  useWallet,
  useConnectedWallet,
  WalletStatus,
} from '@terra-money/wallet-provider'

import './App.css'
import * as execute from './contract/execute'
import * as query from './contract/query'
import { ConnectWallet } from './components/ConnectWallet'

import twitterLogo from "./assets/twitter-logo.svg";
import goblinGif from "./assets/goblin.gif";

const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

function App() {
  const [count, setCount] = useState(null)
  const [updating, setUpdating] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const { status } = useWallet()

  const connectedWallet = useConnectedWallet()

  const renderContent = () => {
    if (isLoading) {
      return
    }
    if (!connectedWallet || status === WalletStatus.WALLET_NOT_CONNECTED) {
      return (
        <div className="connect-container">
          <img alt="Goblin" className='goblin-gif' src={goblinGif} />
          <ConnectWallet />
        </div>
      );
    // create the home screen if the wallet is connected
    } else if (connectedWallet && status === WalletStatus.WALLET_CONNECTED) {
      return (
        <div className="home-screen">
          <p className="home-option">Play</p>
          <p className="home-option">Leaderboard</p>
          <p className="home-option">How to play</p>
        </div>
      );
    }
  }

  useEffect(() => {
    const prefetch = async () => {
      if (connectedWallet) {
        setCount((await query.getCount(connectedWallet)).count)
      }
      setUpdating(false)
    }
    prefetch()
  }, [connectedWallet])

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">⚔️ Goblin War ⚔️</p>
          <p className="header sub-text">Only you can save us from Goblin town</p>
        </div>
        <div className="content-container">
          {renderContent()}
        </div>
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
