import { useState, useEffect } from "react";

import "./App.css";

import Chart from "./chart/Chart";
import Map from "./map/Map";
import geoData from "../data/boat_ramps.json";

const filterBySize = (data: any) => {
  const [label] = Object.keys(data);
  let range: [number, number] = [0, 0];
  console.log({ label });
  if (label === "0-50") {
    range = [0, 50];
  }
  if (label === "50-200") {
    range = [50, 200];
  }
  if (label === "200-526") {
    range = [200, 526];
  }

  return (feature: any) => {
    console.log({ range });
    const [lowerBound, upperBound] = range;
    return (
      feature.properties.area_ >= lowerBound &&
      feature.properties.area_ < upperBound
    );
  };
};

function App() {
  const [data, setData] = useState(geoData);

  const onFilterMap = (data: any) => {
    const filtered = {
      ...geoData,
      features: geoData.features.filter(filterBySize(data)),
    };

    setData(filtered);
  };

  useEffect(() => {
    console.log(data.features);
  }, [data]);

  return (
    <div className="App">
      <main className="container">
        <Map filterMap={onFilterMap} data={data} />
        <Chart filterMap={onFilterMap} />
      </main>
    </div>
  );
}

export default App;
