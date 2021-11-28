import React from 'react'
import { ethers } from 'ethers'

import Drawing from './artifacts/contracts/Drawing.sol/Drawing.json'
import { address } from './memo'

import logo from './logo.svg'
import './App.css'

function App() {
  const { ethereum } = window as any
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    // console.log(signer)
    // signer.getAddress().then(console.log)
    // signer.getBalance().then((res) => console.log(res.toString()))
    // signer.getChainId().then(console.log)
    // signer.signMessage('hi').then(console.log)
    ethereum.request({ method: 'eth_chainId' }).then((chainId: any) => {
      console.log('Connected to chain:' + chainId)
      console.log(typeof chainId)
      console.log(
        chainId
          .replace('0x', '')
          .split('')
          .reduce((acc: number, num: string, i: number) => {
            return acc + parseInt(num) * 16 ** (2 - i)
          }, 0)
      )
    })

    // console.log(Drawing)
    const dwg = new ethers.Contract(address, Drawing.abi, signer)
    signer
      .getAddress()
      .then((account) =>
        dwg.mint(account).then(dwg.tokenURI(0).then(console.log))
      )
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
