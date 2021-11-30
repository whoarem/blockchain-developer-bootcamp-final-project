import { Button } from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import SaveIcon from '@material-ui/icons/Save'
import LoadIcon from '@material-ui/icons/Category'
import { useDrawingC, useEtherium } from './contracts'

export const getEmptyFC = (): GeoJSON.FeatureCollection => ({
  type: 'FeatureCollection',
  features: [],
})

type ToolButtonCommonProps = {
  isDarkmode: boolean
  accountLoggedIn: boolean
}

type DrawLineProps = {
  setDrawLineMode: any
}

export const DrawLine = ({
  isDarkmode,
  accountLoggedIn,
  setDrawLineMode,
}: ToolButtonCommonProps & DrawLineProps) => {
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
        disabled={!accountLoggedIn}
        color={isDarkmode ? 'inherit' : 'primary'}
        onClick={(e) => {
          // drawLineMode(setDrawingData)
          setDrawLineMode(true)
        }}
      >
        <CreateIcon />
      </Button>
    </div>
  )
}

type LoadProps = { setDrawingData: any }

export const Load = ({
  isDarkmode,
  accountLoggedIn,
  setDrawingData,
}: ToolButtonCommonProps & LoadProps) => {
  const { getMyDrawings } = useDrawingC()

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
        disabled={!accountLoggedIn}
        color={isDarkmode ? 'inherit' : 'primary'}
        onClick={async () => {
          const cids = await getMyDrawings()
          if (cids.length) {
            loadDrawing(cids[0], setDrawingData)
          }
        }}
      >
        <LoadIcon />
      </Button>
    </div>
  )
}

const loadDrawing = async (cid: string, setDrawingData: any) => {
  let features
  try {
    features = await readDataFromIpfs(cid)
    console.log(features)
    setDrawingData({
      ...getEmptyFC(),
      features,
    })
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
  return JSON.parse(data)
}

type SaveProps = {
  drawingData: GeoJSON.FeatureCollection | undefined
}
export const Save = ({
  isDarkmode,
  accountLoggedIn,
  drawingData,
}: ToolButtonCommonProps & SaveProps) => {
  const { account, chainId } = useEtherium()
  const { createDrawingToken } = useDrawingC()

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
        disabled={!accountLoggedIn}
        color={isDarkmode ? 'inherit' : 'primary'}
        onClick={() => {
          if (
            process.env.NODE_ENV === 'production' &&
            chainId !== parseInt(process.env.REACT_APP_NETWORK_ID as string)
          ) {
            alert('Connect your account with metamask on Ropsten network.')
          } else if (
            process.env.NODE_ENV === 'development' &&
            chainId !== 1337
          ) {
            alert('Connect your account with metamask on local network.')
          } else if (drawingData && drawingData.features.length) {
            saveDrawing(drawingData, account, createDrawingToken)
          }
        }}
      >
        <SaveIcon />
      </Button>
    </div>
  )
}

const saveDrawing = async (
  dwg: GeoJSON.FeatureCollection,
  account: any,
  createDrawingToken: any
) => {
  let cid
  try {
    cid = await putDataToIpfs(dwg.features)
    console.log(cid)
    if (account) {
      createDrawingToken(account[0], cid)
    }
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

export default function Tools({
  isDarkmode,
  setDrawLineMode,
  drawingData,
  setDrawingData,
  accountLoggedIn,
}: ToolButtonCommonProps & DrawLineProps & LoadProps & SaveProps) {
  return (
    <>
      <DrawLine
        isDarkmode={isDarkmode}
        accountLoggedIn={accountLoggedIn}
        setDrawLineMode={setDrawLineMode}
      />
      <Save
        isDarkmode={isDarkmode}
        accountLoggedIn={accountLoggedIn}
        drawingData={drawingData}
      />
      <Load
        isDarkmode={isDarkmode}
        accountLoggedIn={accountLoggedIn}
        setDrawingData={setDrawingData}
      />
    </>
  )
}
