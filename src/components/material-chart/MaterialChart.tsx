import { Feature, GeoJsonProperties, Geometry } from "geojson";
import { Doughnut } from "react-chartjs-2";
import { useAppDispatch, useAppSelector } from "../../hooks";

const MaterialChart = () => {
  const ramps = useAppSelector((state) => state.ramps);
  const materialLabels = useAppSelector((state) => state.materials || []);
  const dispatch = useAppDispatch();

  const groupedByMaterial =
    ramps?.features.reduce(
      (materials: { label: string; count: number }[], feature) => {
        const matchingMaterial = materials.find(
          (material: { label: string; count: number }) =>
            material.label === feature?.properties?.material
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
    ) || [];

  const onMaterialSegmentClick = (elem: any) => {
    if (!elem.length) {
      return;
    }

    dispatch({
      type: "FILTER_BY_MATERIAL",
      payload: ramps?.features.filter(
        (feature: Feature<Geometry, GeoJsonProperties>) =>
          feature?.properties?.material === elem[0]._view.label
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
            text: "Materials",
            fontSize: 20,
            fontColor: "white",
          },
          legend: {
            labels: {
              fontColor: "white",
              fontSize: 12,
            },
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
