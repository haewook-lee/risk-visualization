import Image from "next/image"
import { Inter } from "next/font/google"
import dynamic from "next/dynamic"
import path from "path"
import csvToJson from "csvtojson"

const Map = dynamic(() => import("../../components/LeafMap"), { ssr: false })
const Table = dynamic(() => import("../../components/Table"))
const Chart = dynamic(() => import("../../components/Chart"))

const inter = Inter({ subsets: ["latin"] })

type Mark = {
  "Asset Name": string
  Lat: string
  Long: string
  "Business Category": string
  "Risk Rating": string
  "Risk Factors": Object
  Year: string
}

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
        //@ts-ignore
        cleanFactors[key] = value.toFixed(2)
      }
    }

    cleanFactors = JSON.stringify(cleanFactors)
      .replace(/[\/#!$%\^&\*;"{}=\-_`~()]/g, "")
      .replaceAll(":", ": ")
      .replaceAll(",", ", ")

    value["Risk Factors"] = cleanFactors
  })

  let dictData: any = {}

  json.forEach((value: any) => {
    if (!dictData[value.Year]) {
      dictData[value.Year] = [value]
    } else {
      dictData[value.Year].push(value)
    }
  })

  // const jsonString = JSON.stringify(json, null, 2)

  return {
    data: json,
    sortedData: dictData,
  }
}

export default async function Home() {
  const data = await getData()

  return (
    <>
      <div
        className="mx-auto my-12 p-6 max-w-3xl rounded-2xl text-5xl text-focus"
        style={{}}
      >
        <strong>Risk Visualization</strong>
      </div>
      <div className="bg-white mx-auto my-24 p-6 max-w-3xl rounded-2xl">
        <Chart marks={data.sortedData} />
      </div>

      <div className="bg-white mx-auto my-24 p-6 max-w-3xl rounded-2xl">
        <Table marks={data.data} />
      </div>

      <div className="bg-white mx-auto my-24 p-6 max-w-3xl rounded-2xl">
        <Map marks={data.data} />
      </div>
    </>
  )
}
