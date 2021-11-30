// import React, { useEffect, useState } from 'react'
// import { ethers } from 'ethers'
import { useEtherium } from './components/contracts'
import LoginMessage from './components/LoginMessage'
import { app } from './fbConfig'

import Map from './components/Map'

function App() {
  const { accountLoggedIn } = useEtherium()

  return (
    <div className="App">
      {accountLoggedIn ? (
        <Map accountLoggedIn={accountLoggedIn} />
      ) : (
        <LoginMessage />
      )}
    </div>
  )
}

export default App
