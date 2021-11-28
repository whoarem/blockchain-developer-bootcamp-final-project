import fs from 'fs'

export const memoAddress = async (address: string) => {
  console.log(__dirname)
  const data = new Uint8Array(Buffer.from(`export const address='${address}'`))
  fs.writeFile('scripts/memo.ts', data, (err) => {
    if (err) throw err
    console.log('The contract address has been saved -> scripts/memo.ts')
  })
}
