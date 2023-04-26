import csv from "csv-parser"
// import fs from "fs"
import path from "path"
import csvToJson from "csvtojson"

// export async function GET(request: Request) {
//   const csvPath = path.join(process.cwd(), "public", "dataset.csv")

//   let results: any = []

//   fs.createReadStream(csvPath)
//     .pipe(csv())
//     .on("data", (data: any) => results.push(data))
//     .on("end", () => {
//       console.log(results)
//     })

//   return new Response("e")
// }

export async function GET(request: Request) {
  const csvPath = path.join(process.cwd(), "public", "dataset.csv")

  const json = await csvToJson().fromFile(csvPath)

  const jsonString = JSON.stringify(json, null, 2)

  return new Response(jsonString)
}
