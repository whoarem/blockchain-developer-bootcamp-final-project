import { ethers } from 'hardhat'
import { address } from '../client/src/memo'

const main = async () => {
  const accounts = await ethers.provider.listAccounts()
  console.log(accounts)

  const Drawing = await ethers.getContractFactory('Drawing')
  const dwg = Drawing.attach(address)
  console.log(address)

  // await dwg.mint(accounts[0])
  await dwg.commitDrawing(
    accounts[0],
    'QmXScCiJ1uoaMajPE9KKGcEkeUKri2Piu81ta3GuhweUBL'
  )

  const items = await dwg.balanceOf(accounts[0])
  console.log(items.toString())
  const itemsCount = parseInt(items.toString())
  if (itemsCount !== 0) {
    console.log(await dwg.tokenURI(itemsCount - 1))
    console.log(await dwg.ownerOf(itemsCount - 1))
    console.log(await dwg.name())
    console.log(await dwg.symbol())
    console.log((await dwg.totalSupply()).toString())
    console.log(await dwg.tokenByIndex(itemsCount - 1))
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
