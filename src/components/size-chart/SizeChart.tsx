import { Feature, GeoJsonProperties, Geometry } from "geojson";
import { Doughnut } from "react-chartjs-2";
import { useAppDispatch, useAppSelector } from "../../hooks";

const SizeChart = () => {
  const dispatch = useAppDispatch();
  const ramps = useAppSelector((state) => state.ramps);

  const groupedBySize =
    ramps?.features.reduce(
      (
        groups: {
          label: string;
          count: number;
          range: [number, number];
        }[],
        feature: Feature<Geometry, GeoJsonProperties>
      ) => {
        const correctGroup = groups.find((g) => {
          const [lowerBound, upperBound] = g.range;
          return (
            feature?.properties?.area_ >= lowerBound &&
            feature?.properties?.area_ < upperBound
          );
        });
        if (correctGroup) {
          correctGroup.count += 1;
        }
        return groups;
      },
      [
        { label: "0-50", count: 0, range: [0, 50] },
        { label: "50-200", count: 0, range: [50, 200] },
        { label: "200-526", count: 0, range: [200, 526] },
      ]
    ) || [];

  const onSizeSegmentClick = (elem: any) => {
    if (!elem.length) {
      return;
    }

    const { _index: index } = elem[0];
    const [lowerBound, upperBound] = groupedBySize[index].range;

    dispatch({
      type: "FILTER_BY_SIZE",
      payload: ramps?.features.filter(
        (feature) =>
          feature?.properties?.area_ >= lowerBound &&
          feature?.properties?.area_ < upperBound
      ),
    });
  };

  return (
    <div>
      <Doughnut
        width={200}
        height={200}
        options={{
          responsive: false,
          title: {
            display: true,
            text: "Sizes",
            fontSize: 20,
            fontColor: "white",
          },
          legend: {
            labels: {
              fontColor: "white",
              fontSize: 12,
            },
          },
          onClick: (e, elem) => onSizeSegmentClick(elem),
        }}
        data={{
          labels: groupedBySize.map((group) => group.label),
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
