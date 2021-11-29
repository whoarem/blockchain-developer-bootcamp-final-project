import { Button } from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import SaveIcon from '@material-ui/icons/Save'
import LoadIcon from '@material-ui/icons/Category'

type ToolButtonProps = {
  isDarkMode: boolean
}

export const DrawLine = ({ isDarkMode }: ToolButtonProps) => {
  return (
    <div
      style={{
        fontSize: 50,
        zIndex: 8000,
        position: 'absolute',
        bottom: 30,
        left: 50,
      }}
    >
      <Button
        variant="contained"
        color={isDarkMode ? 'inherit' : 'primary'}
        onClick={useDrawLine}
      >
        <CreateIcon />
      </Button>
    </div>
  )
}

export const useDrawLine = async () => {}

export const Load = ({ isDarkMode }: ToolButtonProps) => {
  return (
    <div
      style={{
        fontSize: 50,
        zIndex: 8000,
        position: 'absolute',
        bottom: 30,
        left: 210,
      }}
    >
      <Button
        variant="contained"
        color={isDarkMode ? 'inherit' : 'primary'}
        onClick={(e) => {
          loadDrawing('QmbQaSg1vgDf59f22jkgfPxVRM6Zsz3NScPuhgdnFQEz6a')
        }}
      >
        <LoadIcon />
      </Button>
    </div>
  )
}

const loadDrawing = async (url: string) => {
  const cid = url.split('/').slice(-1)[0]
  let dwg
  try {
    dwg = await readDataFromIpfs(cid)
    // console.log(cid)
  } catch (error) {
    console.log(error)
    alert('Something wrong with path of drawing.')
  }
}

const readDataFromIpfs = async (cid: string) => {
  const { Ipfs } = window as any
  const node = await Ipfs.create()

  const stream = node.cat(cid)
  let data = ''

  for await (const chunk of stream) {
    // chunks of data are returned as a Buffer, convert it back to a string
    data += chunk.toString()
  }

  // console.log(data)
  return data
}

export const Save = ({ isDarkMode }: ToolButtonProps) => {
  return (
    <div
      style={{
        fontSize: 50,
        zIndex: 8000,
        position: 'absolute',
        bottom: 30,
        left: 130,
      }}
    >
      <Button
        variant="contained"
        color={isDarkMode ? 'inherit' : 'primary'}
        onClick={saveDrawing}
      >
        <SaveIcon />
      </Button>
    </div>
  )
}

export const saveDrawing = async (dwg: object) => {
  let cid
  try {
    cid = await putDataToIpfs(dwg)
    // console.log(cid)
  } catch (error) {
    console.log(error)
    alert('Your drawing has not changed.')
  }
}

const putDataToIpfs = async (data: object) => {
  const { Ipfs } = window as any

  const node = await Ipfs.create()

  // add your data to to IPFS - this can be a string, a Buffer,
  // a stream of Buffers, etc
  const results = await node.add(JSON.stringify(data))

  // console.log(results)
  return results.path
}
