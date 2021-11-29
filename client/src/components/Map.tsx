import { useEffect, useState, useMemo, useCallback } from 'react'
import L, { LeafletMouseEvent } from 'leaflet'
import axios, { AxiosResponse } from 'axios'
import styled from 'styled-components'

import {
  initOption,
  Stadia_AlidadeSmooth,
  Stadia_AlidadeSmoothDark,
} from './mapConfig'
import DarkModeButton from './DarkModeButton'
import { DrawLine } from './mapUtils'

const MapBox = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`

const tileMaps = (isDarkMode: boolean): L.TileLayer =>
  isDarkMode ? Stadia_AlidadeSmoothDark : Stadia_AlidadeSmooth

function Map() {
  const [lmapObj, setLmapObj] = useState<L.Map>()
  const [isDarkmode, setDarkmode] = useState(true)
  const [currentTileMap, setTileMap] = useState<L.TileLayer>()
  const dataStyle = useMemo(
    () => ({
      color: isDarkmode ? '#69acf8' : '#4b4444',
      weight: 1,
    }),
    [isDarkmode]
  )

  useEffect(() => {
    if (lmapObj && currentTileMap) {
      lmapObj.removeLayer(tileMaps(!isDarkmode))
      setTileMap(tileMaps(isDarkmode))
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

  return (
    <>
      <MapBox id="map" />
      <DarkModeButton isDarkMode={isDarkmode} setDarkMode={setDarkmode} />
      <DrawLine isDarkMode={isDarkmode} />
    </>
  )
}

export default Map
