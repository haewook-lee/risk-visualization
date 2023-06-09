"use client"

import React, { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-canvas-marker"
import * as L from "leaflet"

type Mark = {
  "Asset Name": string
  Lat: string
  Long: string
  "Business Category": string
  "Risk Rating": string
  "Risk Factors": Object
  Year: string
}

function LeafletCanvasMarker({
  marks,
  years,
}: {
  marks: Mark[]
  years: number
}) {
  const map = useMap()

  useEffect(() => {
    if (!map) return

    // @ts-ignore: Unreachable code error
    let ciLayer = L.canvasIconLayer({}).addTo(map) // eslint-disable-line no-use-before-define

    // ciLayer.addOnClickListener(function (_e: any, data: any) {
    //   console.log(data)
    // })
    // ciLayer.addOnHoverListener(function (
    //   e: any,
    //   data: { data: { _leaflet_id: any } }[]
    // ) {
    //   console.log(data[0].data._leaflet_id)
    // })

    let gIcon = L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
      iconSize: [20, 18],
      iconAnchor: [10, 9],
    })

    let oIcon = L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
      iconSize: [20, 18],
      iconAnchor: [10, 9],
    })

    let rIcon = L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
      iconSize: [20, 18],
      iconAnchor: [10, 9],
    })

    let markers = []

    for (let i = 0; i < marks.length; i++) {
      if (
        parseInt(marks[i].Year) >= years &&
        parseInt(marks[i].Year) <= years + 9
      ) {
        let icon
        if (parseFloat(marks[i]["Risk Rating"]) <= 0.33) {
          icon = gIcon
        } else if (
          parseFloat(marks[i]["Risk Rating"]) > 0.33 &&
          parseFloat(marks[i]["Risk Rating"]) <= 0.66
        ) {
          icon = oIcon
        } else {
          icon = rIcon
        }

        let marker = L.marker(
          [parseInt(marks[i].Lat), parseInt(marks[i].Long)],
          {
            icon: icon,
          }
        ).bindPopup(
          `${
            "Asset Name: " +
            marks[i]["Asset Name"] +
            "\nCategory: " +
            marks[i]["Business Category"] +
            "\nRisk Rating: " +
            marks[i]["Risk Rating"]
          }`
        )

        markers.push(marker)
      }
    }

    ciLayer.addLayers(markers)
  }, [map, marks, years])

  return null
}

function Map({ marks }: any) {
  const [years, setYears] = useState<number>(2030)

  // Year range is 2030 - 2070
  // Risk range is 0 - 1

  function changeDecades(first: number) {
    setYears(first)
  }

  return (
    <div>
      <div
        style={{
          margin: "auto",
          maxWidth: "875px",
          fontSize: "1.5rem",
          color: "grey",
        }}
      >
        <strong>Risk Indicator Map</strong>
      </div>
      <div id="map">
        <MapContainer
          className="markercluster-map"
          center={[43, -79]}
          zoom={7}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LeafletCanvasMarker marks={marks} years={years} />
        </MapContainer>
      </div>
      <div
        style={{
          display: "table",
          fontSize: "1.5rem",
          margin: "auto",
          color: "black",
        }}
      >
        Year: {years}
      </div>
      <div
        style={{
          display: "block",
          margin: "auto",
          maxWidth: "300px",
        }}
      >
        <div id="map-filter-buttons" className="btn-group w-full max-w-lg">
          <button
            className="normal-case btn"
            style={{ width: "60px" }}
            onClick={(e) => {
              changeDecades(2030)
            }}
          >
            2030s
          </button>
          <button
            className="normal-case btn"
            style={{ width: "60px" }}
            onClick={(e) => {
              changeDecades(2040)
            }}
          >
            2040s
          </button>
          <button
            className="normal-case btn"
            style={{ width: "60px" }}
            onClick={() => changeDecades(2050)}
          >
            2050s
          </button>
          <button
            className="normal-case btn"
            style={{ width: "60px" }}
            onClick={() => changeDecades(2060)}
          >
            2060s
          </button>
          <button
            className="normal-case btn"
            style={{ width: "60px" }}
            onClick={() => changeDecades(2070)}
          >
            2070s
          </button>
        </div>
      </div>
    </div>
  )
}

export default Map
