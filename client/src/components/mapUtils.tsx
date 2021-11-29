import { Button } from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import SaveIcon from '@material-ui/icons/Save'
import LoadIcon from '@material-ui/icons/Category'

export const getEmptyFC = (): GeoJSON.FeatureCollection => ({
  type: 'FeatureCollection',
  features: [],
})

type ToolButtonProps = {
  isDarkMode: boolean
}

export const DrawLine = ({
  isDarkMode,
  // setDrawingData,
  setDrawLineMode,
}: ToolButtonProps & {
  // setDrawingData: any
  setDrawLineMode: any
}) => {
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

// export const drawLineMode = async (setDrawingData: any) => {}

export const Load = ({
  isDarkMode,
  setDrawingData,
}: ToolButtonProps & { setDrawingData: any }) => {
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
          loadDrawing(
            'QmXScCiJ1uoaMajPE9KKGcEkeUKri2Piu81ta3GuhweUBL',
            setDrawingData
          )
        }}
      >
        <LoadIcon />
      </Button>
    </div>
  )
}

const loadDrawing = async (url: string, setDrawingData: any) => {
  const cid = url.split('/').slice(-1)[0]
  let features
  try {
    features = await readDataFromIpfs(cid)
    // console.log(cid)
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

export const Save = ({
  isDarkMode,
  drawingData,
}: ToolButtonProps & {
  drawingData: GeoJSON.FeatureCollection | undefined
}) => {
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
        onClick={() => {
          if (drawingData && drawingData.features.length)
            saveDrawing(drawingData)
        }}
      >
        <SaveIcon />
      </Button>
    </div>
  )
}

export const saveDrawing = async (dwg: GeoJSON.FeatureCollection) => {
  let cid
  try {
    cid = await putDataToIpfs(dwg.features)
    console.log(cid)
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
