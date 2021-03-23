import { Feature, GeoJsonProperties, Geometry } from "geojson";
import { Doughnut } from "react-chartjs-2";
import data from "../../data/boat_ramps.json";

interface PieChartProps {
  onFilterMap: (
    callback: (feature: Feature<Geometry, GeoJsonProperties>) => boolean
  ) => void;
}

const sizeGroups: {
  label: string;
  count: number;
  range: [number, number];
}[] = [
  { label: "0-50", count: 0, range: [0, 50] },
  { label: "50-200", count: 0, range: [50, 200] },
  { label: "200-526", count: 0, range: [200, 526] },
];

const SizeChart = ({ onFilterMap }: PieChartProps) => {
  const groupedBySize = data.features.reduce(
    (
      groups: {
        label: string;
        count: number;
        range: [number, number];
      }[],
      feature: any
    ) => {
      if (feature.properties.area_ < 50) {
        groups[0].count += 1;
      }
      if (feature.properties.area_ >= 50 && feature?.properties?.area_ < 200) {
        groups[1].count += 1;
      }
      if (feature.properties.area_ >= 200 && feature?.properties?.area_ < 526) {
        groups[2].count += 1;
      }

      return groups;
    },
    sizeGroups
  );

  // const filterBySize = (data: any) => {
  //   const [label] = Object.keys(data);
  //   let range: [number, number] = [0, 0];
  //   console.log({ label });
  //   if (label === "0-50") {
  //     range = [0, 50];
  //   }
  //   if (label === "50-200") {
  //     range = [50, 200];
  //   }
  //   if (label === "200-526") {
  //     range = [200, 526];
  //   }

  //   return (feature: any) => {
  //     console.log({ range });
  //     const [lowerBound, upperBound] = range;
  //     return (
  //       feature.properties.area_ >= lowerBound &&
  //       feature.properties.area_ < upperBound
  //     );
  //   };
  // };

  const onSizeSegmentClick = (elem: any) => {
    if (!elem.length) {
      return;
    }

    const { _index: index } = elem[0];
    const [lowerBound, upperBound] = groupedBySize[index].range;
    console.log({ lowerBound, upperBound });
    onFilterMap(
      (feature) =>
        feature?.properties?.area_ >= lowerBound &&
        feature?.properties?.area_ < upperBound
    );
  };

  console.log({ groupedBySize });
  return (
    <div>
      <Doughnut
        options={{
          title: {
            display: true,
            text: "Sizes",
            fontSize: 20,
            fontColor: "white",
          },
          onClick: (e, elem) => onSizeSegmentClick(elem),
        }}
        data={{
          labels: sizeGroups.map((group) => group.label),
          datasets: [
            {
              data: groupedBySize.map((group) => group.count),
              borderWidth: 0,
              backgroundColor: ["#CD45A2", "#2F45C5", "#13CD3C", "#FE9D10"],
            },
          ],
        }}
      />
    </div>
  );
};

export default SizeChart;
