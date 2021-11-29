import { useEffect, useState, useMemo, useCallback } from 'react'
import L, { LeafletMouseEvent } from 'leaflet'
import styled from 'styled-components'

import {
  initOption,
  Stadia_AlidadeSmooth,
  Stadia_AlidadeSmoothDark,
} from './mapConfig'

import Tools, { DrawLine, getEmptyFC, Load, Save } from './mapUtils'
import DarkmodeButton from './DarkmodeButton'

const MapBox = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`

const tileMaps = (isDarkMode: boolean): L.TileLayer =>
  isDarkMode ? Stadia_AlidadeSmoothDark : Stadia_AlidadeSmooth

function Map({ accountLoggedIn }: { accountLoggedIn: boolean }) {
  const [lmapObj, setLmapObj] = useState<L.Map>()
  const [isDarkmode, setDarkmode] = useState(true)
  const [currentTileMap, setTileMap] = useState<L.TileLayer>()

  const [drawingData, setDrawingData] = useState<GeoJSON.FeatureCollection>()
  const [drawLineMode, setDrawLineMode] = useState<boolean>()

  const dataStyle = useMemo(
    () => ({
      color: isDarkmode ? '#69acf8' : '#4b4444',
      weight: 1.5,
    }),
    [isDarkmode]
  )

  useEffect(() => {
    if (lmapObj && currentTileMap) {
      lmapObj.removeLayer(tileMaps(!isDarkmode))
      setTileMap(tileMaps(isDarkmode))

      if (drawingData && lmapObj) {
        lmapObj.eachLayer((layer: any) => {
          // console.log(layer.feature ? true : false)
          if (layer.feature) {
            lmapObj.removeLayer(layer)
          }
        })
        // console.log(drawingData)
        const dataLayer = L.geoJSON(drawingData, { style: dataStyle })
        dataLayer.addTo(lmapObj)
      }
    }
  }, [isDarkmode, lmapObj])

  useEffect(() => {
    if (lmapObj && currentTileMap) {
      currentTileMap.addTo(lmapObj)
    }
  }, [currentTileMap, lmapObj])

  // initialize leaflet map object
  useEffect(() => {
    const lmap = L.map('map', initOption)
    setLmapObj(lmap)

    setTileMap(tileMaps(isDarkmode))
  }, [])

  useEffect(() => {
    if (drawLineMode && lmapObj) {
      lmapObj.once('click', (e: LeafletMouseEvent) => {
        // console.log(e.latlng)
        const { lat: lat_1, lng: lng_1 } = e.latlng
        const m = L.marker(e.latlng)
        m.addTo(lmapObj)
        lmapObj.once('click', (e: LeafletMouseEvent) => {
          const { lat: lat_2, lng: lng_2 } = e.latlng
          const fc = drawingData ? { ...drawingData } : getEmptyFC()
          fc.features.push({
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [
                [lng_1, lat_1],
                [lng_2, lat_2],
              ],
            },
            properties: {},
          })
          setDrawingData(fc)
          lmapObj.removeLayer(m)
          setDrawLineMode(false)
        })
      })
    }
  }, [drawLineMode])

  useEffect(() => {
    if (drawingData && lmapObj) {
      lmapObj.eachLayer((layer: any) => {
        // console.log(layer.feature ? true : false)
        if (layer.feature) {
          lmapObj.removeLayer(layer)
        }
      })
      console.log(drawingData)
      const dataLayer = L.geoJSON(drawingData, { style: dataStyle })
      dataLayer.addTo(lmapObj)
    }
  }, [drawingData])

  return (
    <>
      <MapBox
        id="map"
        style={{ cursor: drawLineMode ? 'crosshair' : 'default' }}
      />
      <DarkmodeButton isDarkmode={isDarkmode} setDarkmode={setDarkmode} />
      {/* <DrawLine isDarkmode={isDarkmode} setDrawLineMode={setDrawLineMode} />
      <Save isDarkmode={isDarkmode} drawingData={drawingData} />
      <Load isDarkmode={isDarkmode} setDrawingData={setDrawingData} /> */}
      <Tools
        isDarkmode={isDarkmode}
        accountLoggedIn={accountLoggedIn}
        setDrawLineMode={setDrawLineMode}
        drawingData={drawingData}
        setDrawingData={setDrawingData}
      />
    </>
  )
}

export default Map
