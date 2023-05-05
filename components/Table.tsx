"use client"

import React, { useState } from "react"
import { createRoot } from "react-dom/client"
import { AgGridReact } from "ag-grid-react"

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { CellClickedEvent } from "ag-grid-community"

function Map({ marks }: any) {
  let textFilterParams = {
    filterOptions: ["contains", "notContains"],
    textFormatter: (r: any) => {
      if (r == null) return null
      return r
        .toLowerCase()
        .replace(/[àáâãäå]/g, "a")
        .replace(/æ/g, "ae")
        .replace(/ç/g, "c")
        .replace(/[èéêë]/g, "e")
        .replace(/[ìíîï]/g, "i")
        .replace(/ñ/g, "n")
        .replace(/[òóôõö]/g, "o")
        .replace(/œ/g, "oe")
        .replace(/[ùúûü]/g, "u")
        .replace(/[ýÿ]/g, "y")
    },
    debounceMs: 200,
    maxNumConditions: 1,
  }

  const onCellClicked = (params: CellClickedEvent) =>
    // console.log(params.value.replace(/[\/#!$%\^&\*;"{}=\-_`~()]/g, ""))
    console.log(params.data)

  const riskFactorsFormatter = (params: any) => {
    let riskFactors = params.value
    //   .replace(/[\/#!$%\^&\*;"{}=\-_`~()]/g, "")
    //   .replaceAll(":", ": ")
    //   .replaceAll(",", ", ")
    return riskFactors
  }

  const locationGetter = (params: any) => {
    let location = [params.data["Lat"], params.data["Long"]]
    return location
  }

  const [rowData2] = useState(marks)

  const [columnDefs2] = useState([
    {
      field: "Asset Name",
      filter: true,
      filterOptions: {
        textFilterParams,
      },
      sortable: true,
    },
    {
      field: "Business Category",
      filter: true,
      filterOptions: {
        textFilterParams,
      },
      sortable: true,
    },
    {
      field: "Risk Rating",
      filter: "agNumberColumnFilter",
      sortable: true,
    },
    {
      field: "Risk Factors",
      filter: true,
      filterOptions: {
        textFilterParams,
      },
      sortable: true,
      valueFormatter: riskFactorsFormatter,
      autoHeight: true,
      wrapText: true,
    },
    { field: "Year", filter: "agNumberColumnFilter", sortable: true },
    { field: "Location", valueGetter: locationGetter, sortable: true },
  ])

  return (
    <>
      <div
        style={{
          margin: "auto",
          maxWidth: "600px",
          fontSize: "1.5rem",
          color: "grey",
        }}
      >
        <strong>Risk Data Table</strong>
      </div>
      <div className="ag-theme-alpine-dark" style={{ marginTop: "1rem" }}>
        <AgGridReact
          rowData={rowData2}
          columnDefs={columnDefs2}
          onCellClicked={onCellClicked}
          pagination={true}
        ></AgGridReact>
      </div>
    </>
  )
}

export default Map
