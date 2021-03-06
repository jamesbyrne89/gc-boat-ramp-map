import { useState } from "react";
import ReactMapGL, { Layer, LayerProps, Source } from "react-map-gl";
import { useAppSelector } from "../../hooks";
import { MapStyles } from "./MapStyles";
import "./MapStyles.tsx";

const dataLayer: LayerProps = {
  id: "data",
  type: "fill",
  paint: {
    "fill-color": "#CD45A2",
    "fill-opacity": 1,
  },
};

const Map = () => {
  const ramps = useAppSelector((state) => state.ramps);
  const [viewport, setViewport] = useState({
    latitude: -28.0167,
    longitude: 153.4,
    zoom: 11,
    width: "100%",
    height: "100%",
  });

  return (
    <MapStyles>
      <ReactMapGL
        mapStyle="mapbox://styles/jamesbyrne89/ckmltmwsu4jj417ofa7b7avsx"
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(vp: any) => {
          setViewport(vp);
        }}
      >
        <Source type="geojson" data={ramps}>
          <Layer {...dataLayer} />
        </Source>
      </ReactMapGL>
    </MapStyles>
  );
};

export default Map;
