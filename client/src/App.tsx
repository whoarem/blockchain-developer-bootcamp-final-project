// import React, { useEffect, useState } from 'react'
// import { ethers } from 'ethers'
import { useEtherium } from './components/contracts'

import Map from './components/Map'

function App() {
  const { accountLoggedIn } = useEtherium()

  return (
    <div className="App">
      <Map accountLoggedIn={accountLoggedIn} />
    </div>
  )
}

export default App
