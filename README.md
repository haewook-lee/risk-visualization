# Data Visualization

This is a data visualization app built with Next.js 13's App Router (Beta). The app allows users to view and analyze data in various formations, including charts, tables, and maps.

## Getting Started

To get started with the app, clone the repository and install the dependencies:

```bash
git clone https://github.com/haewook-lee/risk-visualization.git
cd risk-visualization
npm install
```

Next, start the development server:

```bash
npm run dev
```

The app should now be running on [http://localhost:3000](http://localhost:3000).

## Features

The app includes the following features:

- Line Graph that displays Highest, Lowest, and Average Risk over a period of time (2030-2070); has ability to filter by Asset Name, Business Category, and Location
- Table that displays all data points of the risk dataset; has ability to sort and filter
- Map that displays location of data points of the risk dataset; can filter by year and displays Asset Name, Business Category, and Risk Rating

## Technologies/Libraries Used

- Next.js
- React
- Leaflet
- Chart.js
- AG Grid
- Tailwind
- DaisyUI
