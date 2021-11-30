import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import Drawing from '../artifacts/contracts/Drawing.sol/Drawing.json'
import { address } from '../memo'

// console.log(process.env)

export const checkEtherium = async (
  window: any,
  setAccount: any,
  setChainId: any,
  setSigner: any
) => {
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
    setSigner(signer)

    const chainId = await ethereum.request({ method: 'eth_chainId' })
    // console.log(chainId)
    // console.log(parseInt(chainId))
    setChainId(parseInt(chainId))

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    // console.log(accounts)
    setAccount(accounts)

    try {
      // console.log(signer)
      const account = await signer.getAddress()

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

export const useEtherium = () => {
  const [accountLoggedIn, setAccountLoggedIn] = useState<boolean>(false)
  const [account, setAccount] = useState<string[]>()
  const [chainId, setChainId] = useState<number>()
  const [signer, setSigner] = useState<any>()

  useEffect(() => {
    checkEtherium(window, setAccount, setChainId, setSigner)
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
      if (process.env.NODE_ENV === 'production')
        alert('Connect your account with metamask on Ropsten network.')
      else alert('Connect your account with metamask on local network.')
  }, [accountLoggedIn, account, chainId, signer])

  return { accountLoggedIn, account, chainId, signer }
}

export const useDrawingC = () => {
  const { account, signer } = useEtherium()
  const dwg = new ethers.Contract(address, Drawing.abi, signer)
  // console.log(Drawing)
  // console.log(signer)
  // console.log(dwg)

  const createDrawingToken = async (toAccount: string, cid: string) => {
    const tr = await dwg.commitDrawing(toAccount, cid)
    console.log(tr)
  }

  const getMyDrawings = async () => {
    try {
      const res = await dwg.getMyDrawings()
      console.log(res)
      return res
    } catch (error) {
      console.log(error)
      alert(
        `Can't find the contract. Maybe you should change your eth network to Ropsten or localhost`
      )
      return []
    }
  }

  return { createDrawingToken, getMyDrawings }
}
