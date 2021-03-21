import { Doughnut } from "react-chartjs-2";
import { Feature, GeoJsonProperties, Geometry } from "geojson";
import { useEffect } from "react";
import data from "../../data/boat_ramps.json";
import { ChartElementsOptions } from "chart.js";

interface PieChartProps {
  filterMap: (data: Record<string, number>) => void;
}

const PieChart = ({ filterMap }: PieChartProps) => {
  const sizeGroups: Record<string, number>[] = [
    { "0-50": 0 },
    { "50-200": 0 },
    { "200-526": 0 },
  ];

  const groupedBySize = data.features.reduce(
    (groups: Record<string, number>[], feature: any) => {
      if (feature.properties.area_ < 50) {
        groups[0]["0-50"] += 1;
      }
      if (feature.properties.area_ >= 50 && feature?.properties?.area_ < 200) {
        groups[1]["50-200"] += 1;
      }
      if (feature.properties.area_ >= 200 && feature?.properties?.area_ < 526) {
        groups[2]["200-526"] += 1;
      }

      return groups;
    },
    sizeGroups
  );

  const onSegmentClick = (elem: any) => {
    console.log({ elem });
    const filteredData = groupedBySize[elem[0]._index];
    console.log({ filteredData });
    filterMap(filteredData);
  };

  console.log({ groupedBySize });
  return (
    <div>
      C
      <Doughnut
        options={{
          onClick: (e, elem) => onSegmentClick(elem),
        }}
        data={{
          labels: sizeGroups.map((group) => Object.keys(group)[0]),
          datasets: [
            {
              data: groupedBySize.map((group) => Object.values(group)[0]),
              backgroundColor: ["red", "blue", "green"],
            },
          ],
        }}
      />
    </div>
  );
};

export default PieChart;
