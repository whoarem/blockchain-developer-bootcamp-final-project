import { ethers } from 'hardhat'
import { address } from './memo'

const main = async () => {
  const accounts = await ethers.provider.listAccounts()
  console.log(accounts)

  const Drawing = await ethers.getContractFactory('Drawing')
  const dwg = Drawing.attach(address)

  await dwg.mint(accounts[0])
  const items = await dwg.balanceOf(accounts[0])
  console.log(items.toString())
  console.log(await dwg.tokenURI(parseInt(items.toString()) - 1))
  console.log(await dwg.ownerOf(parseInt(items.toString()) - 1))
  console.log(await dwg.name())
  console.log(await dwg.symbol())
  console.log((await dwg.totalSupply()).toString())
  console.log(await dwg.tokenByIndex(parseInt(items.toString()) - 1))
  console.log(await dwg.test())
  console.log(await dwg.test2())
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
