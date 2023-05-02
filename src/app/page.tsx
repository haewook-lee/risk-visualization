import Image from "next/image"
import { Inter } from "next/font/google"
import dynamic from "next/dynamic"
import path from "path"
import csvToJson from "csvtojson"

// import RiskMap from "../../components/Map"
// import "mapbox-gl/dist/mapbox-gl.css"
const Map = dynamic(() => import("../../components/LeafMap"), { ssr: false })

const inter = Inter({ subsets: ["latin"] })

// async function getData() {
//   const res = await fetch(`http://localhost:3000/api/dt`, {
//     method: "GET",
//   })

//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data")
//   }

//   return res.json()
// }

async function getData() {
  const csvPath = path.join(process.cwd(), "public", "dataset.csv")

  const json = await csvToJson().fromFile(csvPath)

  // const jsonString = JSON.stringify(json, null, 2)

  return json
}

export default async function Home() {
  const data = await getData()
  console.log(data)

  return (
    <>
      <h1>Hello</h1>
      <Map marks={data} />
      {/* {data.map((value: any) => {
        return <div key={value}>{value}</div>
      })} */}
    </>
  )
}
