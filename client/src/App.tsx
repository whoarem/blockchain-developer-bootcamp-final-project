import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import Map from './components/Map'

const checkEtherium = async (window: any, setAccount: any, setChainId: any) => {
  const { ethereum } = window
  if (ethereum) {
    ethereum.on('accountsChanged', (accounts: any) => {
      // Handle the new accounts, or lack thereof.
      // "accounts" will always be an array, but it can be empty.
      // console.log(accounts)
      setAccount(accounts)
    })

    ethereum.on('chainChanged', (chainId: any) => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      // console.log(parseInt(chainId))
      window.location.reload()
    })

    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()

    const chainId = await ethereum.request({ method: 'eth_chainId' })
    // console.log(chainId)
    // console.log(parseInt(chainId))
    setChainId(parseInt(chainId))

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    // console.log(accounts)
    setAccount(accounts)

    try {
      // const dwg = new ethers.Contract(address, Drawing.abi, signer)
      // console.log(signer)
      const account = await signer.getAddress()
      // dwg.mint(account).then(dwg.tokenURI(0).then(console.log))

      return account ? true : false
    } catch (error) {
      console.log(error)
      alert('Connect your account with metamask')
      return false
    }
  } else {
    alert('Need metamask to be installed')
    return false
  }
}

function App() {
  const [accountLoggedIn, setAccountLoggedIn] = useState<boolean>(false)
  const [account, setAccount] = useState<string[]>()
  const [chainId, setChainId] = useState<number>()

  useEffect(() => {
    checkEtherium(window, setAccount, setChainId)
      .then(setAccountLoggedIn)
      .catch(console.log)
  }, [])

  useEffect(() => {
    console.log(accountLoggedIn, account, chainId)
    if (
      accountLoggedIn &&
      account &&
      account.length &&
      chainId &&
      [3, 1337].indexOf(chainId) === -1
    )
      alert('Connect your account with metamask on Ropsten network.')
  }, [accountLoggedIn, account, chainId])

  return (
    <div className="App">
      <Map accountLoggedIn={accountLoggedIn} />
    </div>
  )
}

export default App
