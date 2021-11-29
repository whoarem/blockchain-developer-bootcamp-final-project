import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// import Drawing from './artifacts/contracts/Drawing.sol/Drawing.json'
// import { address } from './memo'
import Map from './components/Map'

const checkAccount = async (window: any) => {
  const { ethereum } = window
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()

    const chainId = ethereum.request({ method: 'eth_chainId' })
    console.log(chainId)

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    console.log(accounts)

    try {
      // const dwg = new ethers.Contract(address, Drawing.abi, signer)
      // console.log(signer)
      const account = await signer.getAddress()
      // dwg.mint(account).then(dwg.tokenURI(0).then(console.log))

      return account ? true : false
    } catch (error) {
      console.log(error)
      alert('you need to connect your account with metamask')
      return false
    }
  } else {
    alert('need metamask to be installed')
    return false
  }
}

function App() {
  const [accountLoggedIn, setAccountLoggedIn] = useState<boolean>(false)
  useEffect(() => {
    checkAccount(window)
  }, [])

  return (
    <div className="App">
      <Map />
    </div>
  )
}

export default App
