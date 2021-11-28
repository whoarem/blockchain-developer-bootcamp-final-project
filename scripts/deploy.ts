import { ethers, upgrades } from 'hardhat'
import { memoAddress } from './util'

const main = async () => {
  const Drawing = await ethers.getContractFactory('Drawing')
  console.log('Deploying Drawing...')
  const dwg = await upgrades.deployProxy(Drawing, ['Drawing', 'DWG', 'dwg_uri'])
  await dwg.deployed()
  console.log('Drawing deployed to:', dwg.address)
  return dwg.address
}

main()
  .then((address) => {
    memoAddress(address)
  })
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
