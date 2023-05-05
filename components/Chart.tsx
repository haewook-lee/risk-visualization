"use client"

import React, { useState, useEffect } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

type Mark = {
  "Asset Name": string
  Lat: string
  Long: string
  "Business Category": string
  "Risk Rating": string
  "Risk Factors": Object
  Year: string
}

function riskAverage(dataSet: any, filter: string, category: string) {
  let counter = 0
  let result = (
    dataSet.reduce((accumulator: number, currentValue: any) => {
      if (currentValue[category] === filter) {
        counter++
        return accumulator + parseFloat(currentValue["Risk Rating"])
      }
      return accumulator
    }, 0) / counter
  ).toFixed(2)

  return result
}

function riskLowest(dataSet: any, filter: string, category: string) {
  let lowest
  for (let i = 0; i < dataSet.length; i++) {
    if (dataSet[i][category] === filter) {
      if (parseFloat(dataSet[i]["Risk Rating"]) < lowest || !lowest) {
        lowest = dataSet[i]["Risk Rating"]
      }
    }
  }
  return lowest || 0
}

function riskHighest(dataSet: any, filter: string, category: string) {
  let highest
  for (let i = 0; i < dataSet.length; i++) {
    if (dataSet[i][category] === filter) {
      if (parseFloat(dataSet[i]["Risk Rating"]) > highest || !highest) {
        highest = dataSet[i]["Risk Rating"]
      }
    }
  }
  return highest || 0
}

const categoryNames = [
  "Energy",
  "Manufacturing",
  "Retail",
  "Finance",
  "Technology",
  "Healthcare",
]

const locations = [
  ["46.1351", "-60.1831"],
  ["50.26729", "-119.27337"],
  ["45.44868", "-73.81669"],
  ["42.8334", "-80.38297"],
  ["53.51684", "-113.3187"],
  ["45.40008", "-73.58248"],
  ["45.43341", "-73.86586"],
  ["43.86682", "-79.2663"],
  ["46.23899", "-63.13414"],
  ["45.4473", "-73.75335"],
  ["49.88307", "-119.48568"],
]

const assetNames = [
  "Mcknight, Beasley and Stewart",
  "Acevedo-Kennedy",
  "Ware PLC",
  "Jones Ltd",
  "Willis-Newman",
  "Bender, Warren and Sanchez",
  "Johnson and Sons",
  "Mejia, Roberts and Gay",
  "Flynn-Anderson",
  "Thomas-Chavez",
  "Reid PLC",
  "Hall, Meadows and Anderson",
  "Miller-Norris",
  "Landry, Molina and Green",
  "Banks-Carlson",
  "Taylor, Mitchell and Ward",
  "Martin-Jenkins",
  "Stanton-Joyce",
  "Grant-Coffey",
  "Alvarez Inc",
  "Strickland-Daniels",
  "Watson, Evans and Smith",
  "Rivera Inc",
  "Patel, Norris and Jackson",
  "Zuniga Inc",
  "Robertson-Petersen",
  "Skinner-Rojas",
  "Mcpherson, Simmons and Simpson",
  "Williams Group",
  "Cook-Burns",
  "Guzman Ltd",
  "Vega-Huffman",
  "Davis, Allen and Rivera",
  "Fox, Daniel and Coleman",
  "Good-Lewis",
  "Waller Ltd",
  "Smith-Woods",
  "Washington, Rogers and Morrison",
  "Park and Sons",
  "Hooper, Evans and Merritt",
  "Perez-Robertson",
  "Reid-Sherman",
  "Wiley Ltd",
  "Jimenez-Gallegos",
  "Horne and Sons",
  "Gross PLC",
  "Foster-Flores",
  "Kelley, Barnes and Hutchinson",
  "Wagner, Curry and Pearson",
  "Stewart PLC",
  "Kemp-Anderson",
  "Harrison, Meza and Rios",
  "Pittman PLC",
  "Campos and Sons",
  "Marks, Garrett and Cummings",
  "Norton-Spencer",
  "Wilkerson-Miranda",
  "Higgins, Brown and Vaughn",
  "Duke Ltd",
  "Gray-Evans",
  "Rodriguez, Roberts and Fuller",
  "Roberts, Burke and Williams",
  "Clarke, Lutz and Farrell",
  "Torres-Sanchez",
  "Thompson, Davis and Brown",
  "Walker, Hogan and Mendez",
  "Patel-Brooks",
  "Sullivan-Curtis",
  "Anderson Group",
  "Obrien-Oneill",
]

function LineChart({ marks }: any) {
  const [name, setName] = useState<string>("Energy")
  const [category, setCategory] = useState<string>("Business Category")

  function changeData(value: any) {
    setName(value.split(",")[0])
    setCategory(value.split(",")[1])
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Risk Over Time (${name})`,
        font: { size: "24rem" },
      },
    },
  }

  const labels = ["2030", "2040", "2050", "2060", "2070"]

  //   there are 5 times
  //   each datapoint in the dataset can be mapped to one of the 5 times
  //   have a usestate that filters which asset/location/category to plot
  //   array of datapoints

  let data = {
    labels,
    datasets: [
      {
        label: "Highest Risk",
        data: labels.map((label) => riskHighest(marks[label], name, category)),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Average Risk",
        data: labels.map((label) => riskAverage(marks[label], name, category)),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Lowest Risk",
        data: labels.map((label) => riskLowest(marks[label], name, category)),
        borderColor: "rgb(178, 222, 39)",
        backgroundColor: "rgb(201, 242, 155)",
      },
    ],
  }

  return (
    <>
      <div>
        {/* @ts-ignore */}
        <Line options={options} data={data} style={{ marginBottom: "1rem" }} />
        <select
          className="select w-full max-w-xs"
          style={{ backgroundColor: "#161E27", color: "#afffd6" }}
          onChange={(e) => changeData(e.target.value)}
          defaultValue={[name, category]}
        >
          <option disabled selected>
            Select Business/Location/Asset
          </option>
          {categoryNames.map((category: string, index: number) => {
            return (
              <option key={index} value={[category, "Business Category"]}>
                {category}
              </option>
            )
          })}
          <option disabled>------</option>
          {locations.map((location: string[], index: number) => {
            return (
              <option key={index} value={[location[0], "Lat"]}>
                {location[0]}, {location[1]}
              </option>
            )
          })}
          <option disabled>------</option>
          {assetNames.map((asset: string, index: number) => {
            return (
              <option key={index} value={[asset, "Asset Name"]}>
                {asset}
              </option>
            )
          })}
        </select>
      </div>
    </>
  )
}

export default LineChart
