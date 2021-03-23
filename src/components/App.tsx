import { useState, useEffect } from "react";

import "./App.css";

import Map from "./map/Map";
import geoData from "../data/boat_ramps.json";
import SizeChart from "./size-chart/SizeChart";
import MaterialChart from "./material-chart/MaterialChart";
import SidePanel from "./side-panel/SidePanel";

function App() {
  const [data, setData] = useState(geoData);

  const filterMapData = (callback: (f: any) => boolean) => {
    const ramps = data.features;
    console.log(callback);
    const filtered = {
      ...data,
      features: ramps.filter(callback),
    };
    console.log(ramps.filter(callback));
    setData(filtered);
  };

  useEffect(() => {
    console.log(data.features);
  }, [data]);

  return (
    <div className="App">
      <main className="container">
        <Map data={data} />
        <SidePanel>
          <div className="chart-container">
            <SizeChart onFilterMap={filterMapData} />
          </div>
          <div className="chart-container">
            <MaterialChart onFilterMap={filterMapData} />
          </div>
        </SidePanel>
      </main>
    </div>
  );
}

export default App;
