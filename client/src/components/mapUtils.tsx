import { Button } from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import SaveIcon from '@material-ui/icons/Save'
import LoadIcon from '@material-ui/icons/Category'
import { useDrawingC, useEtherium } from './contracts'
import { useEffect, useState } from 'react'

// const getRandomIpfsRepo = async () => {
//   const { Ipfs } = window as any
//   const node = await Ipfs.create({ repo: 'nanangqq' + Math.random() })
//   return node
// }

export const getEmptyFC = (): GeoJSON.FeatureCollection => ({
  type: 'FeatureCollection',
  features: [],
})

type ToolButtonCommonProps = {
  ipfsNode: any
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
  ipfsNode,
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
            loadDrawing(cids[cids.length - 1], setDrawingData, ipfsNode)
          }
        }}
      >
        <LoadIcon />
      </Button>
    </div>
  )
}

const loadDrawing = async (cid: string, setDrawingData: any, ipfsNode: any) => {
  console.log(cid)
  let features
  try {
    features = await readDataFromIpfs(cid, ipfsNode)
    console.log(features)
    setDrawingData({
      ...getEmptyFC(),
      features,
    })
  } catch (error) {
    console.log(error)
    alert('Something wrong while loading drawing.')
  }
}

const readDataFromIpfs = async (cid: string, node: any) => {
  // const { Ipfs } = window as any
  // const node = await Ipfs.create()
  // const node = await getRandomIpfsRepo()

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
  ipfsNode,
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
            saveDrawing(drawingData, account, createDrawingToken, ipfsNode)
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
  createDrawingToken: any,
  ipfsNode: any
) => {
  let cid
  try {
    cid = await putDataToIpfs(dwg.features, ipfsNode)
    console.log(cid)
    if (account) {
      createDrawingToken(account[0], cid)
    }
  } catch (error) {
    console.log(error)
    alert('Something wrong while saving drawing.')
  }
}

const putDataToIpfs = async (data: object, node: any) => {
  // const { Ipfs } = window as any
  // const node = await Ipfs.create()
  // const node = await getRandomIpfsRepo()

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
  const [ipfsNode, setIpfsNode] = useState<any>()

  useEffect(() => {
    try {
      const { Ipfs } = window as any
      Ipfs.create().then(setIpfsNode)
    } catch (error) {
      console.log(error)
      alert('Something wrong with ipfs. Refreshing page')
    }
  }, [])

  return (
    <>
      <DrawLine
        ipfsNode={ipfsNode}
        isDarkmode={isDarkmode}
        accountLoggedIn={accountLoggedIn}
        setDrawLineMode={setDrawLineMode}
      />
      <Save
        ipfsNode={ipfsNode}
        isDarkmode={isDarkmode}
        accountLoggedIn={accountLoggedIn}
        drawingData={drawingData}
      />
      <Load
        ipfsNode={ipfsNode}
        isDarkmode={isDarkmode}
        accountLoggedIn={accountLoggedIn}
        setDrawingData={setDrawingData}
      />
    </>
  )
}
