import { ethers } from 'hardhat'
import { address, readerAddress } from '../client/src/memo'

const main = async () => {
  const accounts = await ethers.provider.listAccounts()
  console.log(accounts)

  const DrawingReader = await ethers.getContractFactory('DrawingReader')
  const dwg_reader = DrawingReader.attach(readerAddress)

  console.log(await dwg_reader.owner())
  console.log(await dwg_reader.setDrawingContractAddress(address))
  console.log(await dwg_reader.getMyDrawingsFrom())
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
