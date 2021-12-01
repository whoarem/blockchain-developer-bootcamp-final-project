import { expect } from 'chai'
import { ethers, upgrades } from 'hardhat'

describe('Drawing', function () {
  it('MyDrawings count should be same with accounts balance.', async () => {
    const Drawing = await ethers.getContractFactory('Drawing')

    const accounts = await ethers.provider.listAccounts()
    const instance = await upgrades.deployProxy(Drawing, [
      'Drawing',
      'DWG',
      'dwg_',
    ])

    for (let i = 0; i < accounts.length; i++) {
      const account = accounts[i]
      await instance.commitDrawing(
        account,
        'QmXScCiJ1uoaMajPE9KKGcEkeUKri2Piu81ta3GuhweUBL'
      )
    }

    const myDrawings = await instance.getMyDrawings()

    expect(myDrawings.length).to.equal(1)
  })

  it('Total count of token should be same with createdDrawings count.', async () => {
    const Drawing = await ethers.getContractFactory('Drawing')

    const accounts = await ethers.provider.listAccounts()
    const instance = await upgrades.deployProxy(Drawing, [
      'Drawing',
      'DWG',
      'dwg_',
    ])

    for (let i = 0; i < accounts.length; i++) {
      const account = accounts[i]
      await instance.commitDrawing(
        account,
        'QmXScCiJ1uoaMajPE9KKGcEkeUKri2Piu81ta3GuhweUBL'
      )
    }

    const totalTokenCount = await instance.totalSupply()
    expect(totalTokenCount.toString()).to.equal(`${accounts.length}`)
  })

  it('After paused, tokens should not be created.(Should fail when creating a DWG token after paused.', async () => {
    const Drawing = await ethers.getContractFactory('Drawing')

    const accounts = await ethers.provider.listAccounts()
    const instance = await upgrades.deployProxy(Drawing, [
      'Drawing',
      'DWG',
      'dwg_',
    ])

    await instance.commitDrawing(
      accounts[0],
      'QmXScCiJ1uoaMajPE9KKGcEkeUKri2Piu81ta3GuhweUBL'
    )

    await instance.pause()

    try {
      await instance.commitDrawing(
        accounts[0],
        'QmXScCiJ1uoaMajPE9KKGcEkeUKri2Piu81ta3GuhweUBL'
      )
    } catch (e) {
      console.log(e)
    }

    const paused = await instance.paused()
    expect(paused).to.equal(true)

    const totalTokenCount = await instance.totalSupply()
    expect(totalTokenCount.toString()).to.equal(`1`)
  })

  it('Upgraded contract should work on new functions', async () => {
    const Drawing = await ethers.getContractFactory('Drawing')
    const DrawingUpgradeTest = await ethers.getContractFactory(
      'DrawingUpgradeTest'
    )

    const instance = await upgrades.deployProxy(Drawing, [
      'Drawing',
      'DWG',
      'dwg_',
    ])
    const upgraded = await upgrades.upgradeProxy(
      instance.address,
      DrawingUpgradeTest
    )

    const value = await upgraded.test()
    expect(value.toString()).to.equal('42')
  })

  it(`Upgraded contract should have previous contract's state.`, async () => {
    const Drawing = await ethers.getContractFactory('Drawing')
    const DrawingUpgradeTest = await ethers.getContractFactory(
      'DrawingUpgradeTest'
    )
    const accounts = await ethers.provider.listAccounts()
    const instance = await upgrades.deployProxy(Drawing, [
      'Drawing',
      'DWG',
      'dwg_',
    ])
    await instance.commitDrawing(
      accounts[0],
      'QmXScCiJ1uoaMajPE9KKGcEkeUKri2Piu81ta3GuhweUBL'
    )

    const upgraded = await upgrades.upgradeProxy(
      instance.address,
      DrawingUpgradeTest
    )

    const value = await upgraded.getMyDrawings()
    expect(value.length).to.equal(1)
  })
})
