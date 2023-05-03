import Image from "next/image"
import { Inter } from "next/font/google"
import dynamic from "next/dynamic"
import path from "path"
import csvToJson from "csvtojson"

const Map = dynamic(() => import("../../components/LeafMap"), { ssr: false })
const Table = dynamic(() => import("../../components/Table"))

const inter = Inter({ subsets: ["latin"] })

async function getData() {
  const csvPath = path.join(process.cwd(), "public", "dataset.csv")

  const json = await csvToJson().fromFile(csvPath)

  json.map((value: any) => {
    let cleanFactors: any = {}
    let riskObject = JSON.parse(value["Risk Factors"])

    for (const [key, value] of Object.entries(riskObject)) {
      if (value === 0) {
        continue
      } else {
        cleanFactors[key] = value.toFixed(2) // eslint-disable-line no-use-before-define
      }
    }

    cleanFactors = JSON.stringify(cleanFactors)
      .replace(/[\/#!$%\^&\*;"{}=\-_`~()]/g, "")
      .replaceAll(":", ": ")
      .replaceAll(",", ", ")

    value["Risk Factors"] = cleanFactors
  })

  // const jsonString = JSON.stringify(json, null, 2)

  return json
}

export default async function Home() {
  const data = await getData()
  // console.log(data.map((value: any) => value["Risk Factors"]))

  return (
    <>
      <h1>Hello</h1>
      <Map marks={data} />
      <Table marks={data} />
      {/* {data.map((value: any) => {
        return <div key={value}>{value}</div>
      })} */}
    </>
  )
}
