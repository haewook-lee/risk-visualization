"use client"

import React, { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-canvas-marker"
import L from "leaflet"

type Mark = {
  "Asset Name": string
  Lat: string
  Long: string
  "Business Category": string
  "Risk Rating": string
  "Risk Factors": Object
  Year: string
}

function Map({ marks }: any) {
  const [years, setYears] = useState<number>(2030)

  // Year range is 2030 - 2070

  function changeDecades(first: number) {
    setYears(first)
  }

  function LeafletCanvasMarker() {
    const map = useMap()

    useEffect(() => {
      if (!map) return

      console.log(years)

      let ciLayer = L.canvasIconLayer({}).addTo(map) // eslint-disable-line no-use-before-define

      ciLayer.addOnClickListener(function (_e: any, data: any) {
        console.log(data)
      })
      ciLayer.addOnHoverListener(function (
        e: any,
        data: { data: { _leaflet_id: any } }[]
      ) {
        console.log(data[0].data._leaflet_id)
      })

      let icon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconSize: [20, 18],
        iconAnchor: [10, 9],
      })

      let markers = []

      for (let i = 0; i < marks.length; i++) {
        if (
          parseInt(marks[i].Year) >= years &&
          parseInt(marks[i].Year) <= years + 9
        ) {
          let marker = L.marker(
            [parseInt(marks[i].Lat), parseInt(marks[i].Long)],
            {
              icon: icon,
            }
          ).bindPopup(marks[i]["Asset Name"] + marks[i].Year)
          markers.push(marker)
        }
      }

      ciLayer.addLayers(markers)
    }, [map, years])

    return null
  }

  return (
    <>
      <p className="normal-case text-md">Decade Filter:</p>
      <div className="btn-group">
        <button className="normal-case btn" onClick={() => changeDecades(2030)}>
          2030s
        </button>
        <button
          className="normal-case btn btn-active"
          onClick={() => changeDecades(2040)}
        >
          2040s
        </button>
        <button className="normal-case btn" onClick={() => changeDecades(2050)}>
          2050s
        </button>
        <button className="normal-case btn" onClick={() => changeDecades(2060)}>
          2060s
        </button>
        <button className="normal-case btn" onClick={() => changeDecades(2070)}>
          2070s
        </button>
      </div>
      <div id="map">
        <MapContainer
          className="markercluster-map"
          center={[49.8397, 24.0297]}
          zoom={7}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LeafletCanvasMarker />
        </MapContainer>
      </div>
    </>
  )
}

export default Map
