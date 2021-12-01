import { ethers, upgrades } from 'hardhat'
import { memoAddress } from './util'

const main = async () => {
  const DrawingReader = await ethers.getContractFactory('DrawingReader')
  console.log('Deploying DrawingReader...')
  const dwg_reader = await upgrades.deployProxy(DrawingReader)
  await dwg_reader.deployed()
  console.log('DrawingReader deployed to:', dwg_reader.address)
  return dwg_reader.address
}

main()
  .then((address) => {
    // memoAddress(address)
  })
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
