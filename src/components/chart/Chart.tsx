import { Doughnut } from "react-chartjs-2";
import { Feature, GeoJsonProperties, Geometry } from "geojson";
import { useEffect } from "react";
import data from "../../data/boat_ramps.json";
import { ChartElementsOptions } from "chart.js";

interface PieChartProps {
  filterMapBySize: (data: Record<string, number>) => void;
  filterMapByMaterial: (material: string) => void;
}

const PieChart = ({ filterMapBySize, filterMapByMaterial }: PieChartProps) => {
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

  const materialTypes = data.features.map(
    (feature) => feature.properties.material
  );

  const materialsSet = Array.from(new Set(materialTypes));

  const groupedByMaterial = data.features.reduce(
    (materials: { label: string; count: number }[], feature) => {
      const matchingMaterial = materials.find(
        (material: { label: string; count: number }) =>
          material.label === feature.properties.material
      );
      if (matchingMaterial) {
        matchingMaterial.count += 1;
      }

      return materials;
    },
    materialsSet.map((m) => ({
      label: m,
      count: 0,
    }))
  );
  console.log({ groupedByMaterial });
  const onSizeSegmentClick = (elem: any) => {
    if (!elem.length) {
      return;
    }
    console.log({ elem });
    const filteredData = groupedBySize[elem[0]._index];
    console.log({ filteredData });
    filterMapBySize(filteredData);
  };

  const onMaterialSegmentClick = (elem: any) => {
    if (!elem.length) {
      return;
    }
    const filteredData = groupedByMaterial[elem[0]._index];
    console.log({ elem });
    console.log({ filteredData });
    filterMapByMaterial(filteredData.label);
  };

  console.log({ groupedBySize });
  return (
    <div>
      <legend>Sizes</legend>
      <Doughnut
        options={{
          onClick: (e, elem) => onSizeSegmentClick(elem),
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
      <legend>Materials</legend>
      <Doughnut
        options={{
          onClick: (e, elem) => onMaterialSegmentClick(elem),
        }}
        data={{
          labels: materialsSet,
          datasets: [
            {
              data: groupedByMaterial.map((group) => group.count),
              backgroundColor: ["red", "blue", "green", "purple", "yellow"],
            },
          ],
        }}
      />
    </div>
  );
};

export default PieChart;
