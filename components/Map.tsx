// "use client"

// import React, { useState } from "react"
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

// type Mark = {
//   "Asset Name": string
//   Lat: string
//   Long: string
//   "Business Category": string
//   "Risk Rating": string
//   "Risk Factors": Object
//   Year: string
// }

// function RiskMap({ marks }: any) {
//   const [years, setYears] = useState<[number, number]>([2030, 2039])

//   function changeDecades(first: number, last: number) {
//     setYears([first, last])
//   }

//   const containerStyle = {
//     width: "400px",
//     height: "400px",
//   }

//   const center = {
//     lat: 40.745,
//     lng: -78.523,
//   }

//   console.log(marks)

//   return (
//     <>
//       <p className="normal-case text-md">Decade Filter:</p>
//       <div className="btn-group">
//         <button
//           className="normal-case btn"
//           onClick={() => changeDecades(2030, 2039)}
//         >
//           2030s
//         </button>
//         <button
//           className="normal-case btn btn-active"
//           onClick={() => changeDecades(2040, 2049)}
//         >
//           2040s
//         </button>
//         <button
//           className="normal-case btn"
//           onClick={() => changeDecades(2050, 2059)}
//         >
//           2050s
//         </button>
//         <button
//           className="normal-case btn"
//           onClick={() => changeDecades(2060, 2069)}
//         >
//           2060s
//         </button>
//         <button
//           className="normal-case btn"
//           onClick={() => changeDecades(2070, 2079)}
//         >
//           2070s
//         </button>
//       </div>
//       <LoadScript googleMapsApiKey="AIzaSyCh2dof1FkNQw1dYfY5t_OP8BjD0pV1vU4">
//         <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
//           {/* Child components, such as markers, info windows, etc. */}
//           <Marker position={{ lat: 40.745, lng: -78.523 }} />
//           {marks.map((mark: Mark, index: number) => {
//             const lat = parseInt(mark.Lat)
//             const long = parseInt(mark.Long)
//             const year = parseInt(mark.Year)

//             return <Marker key={index} position={{ lat: lat, lng: long }} />
//           })}
//         </GoogleMap>
//       </LoadScript>
//     </>
//   )
// }

// export default RiskMap
