import { Feature, GeoJsonProperties, Geometry } from "geojson";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import data from "../../data/boat_ramps.json";
import { deduplicateArray } from "../../utils/helpers";

interface MaterialChartProps {
  onFilterMap: (
    callback: (feature: Feature<Geometry, GeoJsonProperties>) => boolean
  ) => void;
}

const MaterialChart = ({ onFilterMap }: MaterialChartProps) => {
  const materials = data.features.map((feature) => feature.properties.material);

  const materialLabels = deduplicateArray(materials);

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
    materialLabels.map((m) => ({
      label: m,
      count: 0,
    }))
  );

  const onMaterialSegmentClick = (elem: any) => {
    if (!elem.length) {
      return;
    }

    onFilterMap(
      (feature: Feature<Geometry, GeoJsonProperties>) =>
        feature?.properties?.material === elem[0]._view.label
    );
  };

  return (
    <div>
      <Doughnut
        options={{
          title: {
            display: true,
            text: "Materials",
            fontSize: 20,
            fontColor: "white",
          },

          onClick: (e, elem) => onMaterialSegmentClick(elem),
        }}
        data={{
          labels: groupedByMaterial.map((group) => group.label),
          datasets: [
            {
              data: groupedByMaterial.map((group) => group.count),
              borderWidth: 0,
              backgroundColor: [
                "#CD45A2",
                "#2F45C5",
                "#13CD3C",
                "#FE9D10",
                "#03E4D8",
              ],
            },
          ],
        }}
      />
    </div>
  );
};

export default MaterialChart;
