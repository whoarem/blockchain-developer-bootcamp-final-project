import { ethers, upgrades } from 'hardhat'
import { address } from '../client/src/memo'

const main = async () => {
  const Drawing = await ethers.getContractFactory('Drawing')

  console.log('Upgrading Drawing...')
  await upgrades.upgradeProxy(address, Drawing)
  console.log('Drawing upgraded')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
